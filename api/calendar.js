export const config = { runtime: "edge" };

const BUSINESS_HOURS = {
  0: { start: "09:00", end: "18:00" },
  1: { start: "08:00", end: "22:00" },
  2: { start: "08:00", end: "22:00" },
  3: { start: "08:00", end: "22:00" },
  4: { start: "08:00", end: "22:00" },
  5: { start: "08:00", end: "22:00" },
  6: { start: "08:00", end: "22:00" },
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function parseJsonResponse(response, fallbackMessage) {
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : { raw: await response.text() };

  if (!response.ok) {
    throw new Error(
      data.error?.message || data.error || data.raw || fallbackMessage,
    );
  }

  return data;
}

async function parseOptionalJsonResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return { raw: await response.text() };
}

function parseStoredToken(rawValue) {
  if (!rawValue) {
    return null;
  }

  let parsed = rawValue;

  for (let i = 0; i < 2; i += 1) {
    if (typeof parsed !== "string") {
      break;
    }

    parsed = JSON.parse(parsed);
  }

  if (!parsed || typeof parsed !== "object") {
    throw new Error("El token guardado en Redis tiene un formato invalido");
  }

  return parsed;
}

async function getAccessToken(clientId) {
  const kvRes = await fetch(
    `${process.env.UPSTASH_REDIS_KV_REST_API_URL}/get/tokens:${clientId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_KV_REST_API_TOKEN}`,
      },
    },
  );

  const kvData = await parseJsonResponse(
    kvRes,
    "No fue posible consultar los tokens del cliente",
  );

  if (!kvData.result) {
    throw new Error(
      `Cliente no conectado. Ve a /api/auth?clientId=${encodeURIComponent(clientId)}`,
    );
  }

  const storedToken = parseStoredToken(kvData.result);
  const refreshToken = storedToken.refresh_token;

  if (!refreshToken) {
    throw new Error(
      "El cliente esta conectado, pero no hay refresh_token valido guardado",
    );
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: refreshToken,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: "refresh_token",
    }),
  });

  const tokens = await parseJsonResponse(
    tokenRes,
    "No se pudo renovar el token de Google",
  );

  if (!tokens.access_token) {
    throw new Error("Google no devolvio access_token");
  }

  return tokens.access_token;
}

function buildEventDate(date, time) {
  const dateTime = new Date(`${date}T${time}:00-06:00`);

  if (Number.isNaN(dateTime.getTime())) {
    throw new Error("La fecha u hora de la cita no es valida");
  }

  return dateTime;
}

function getMexicoCityNowDate() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  });

  const parts = Object.fromEntries(
    formatter.formatToParts(now).map((part) => [part.type, part.value]),
  );

  return new Date(
    `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}:${parts.second}-06:00`,
  );
}

function parseTimeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function getDaySchedule(date) {
  return BUSINESS_HOURS[date.getUTCDay()] || null;
}

function validateBusinessHours(startDate, endDate) {
  const schedule = getDaySchedule(startDate);

  if (!schedule) {
    return {
      ok: false,
      error: "No hay horario laboral configurado para ese dia.",
    };
  }

  const startMinutes = startDate.getUTCHours() * 60 + startDate.getUTCMinutes() - 360;
  const endMinutes = endDate.getUTCHours() * 60 + endDate.getUTCMinutes() - 360;
  const openMinutes = parseTimeToMinutes(schedule.start);
  const closeMinutes = parseTimeToMinutes(schedule.end);

  if (startMinutes < openMinutes || endMinutes > closeMinutes) {
    return {
      ok: false,
      error: `La cita debe estar dentro del horario laboral: ${schedule.start} a ${schedule.end}.`,
    };
  }

  return { ok: true };
}

function validateNotInPast(startDate) {
  const now = getMexicoCityNowDate();

  if (startDate < now) {
    return {
      ok: false,
      error:
        "La fecha y hora de la cita no puede estar en el pasado. Comparte una fecha futura dentro del horario laboral.",
    };
  }

  return { ok: true };
}

async function checkAvailability(accessToken, startDate, endDate) {
  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/freeBusy",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        timeZone: "America/Mexico_City",
        items: [{ id: "primary" }],
      }),
    },
  );

  const data = await parseJsonResponse(
    response,
    "No fue posible consultar la disponibilidad del calendario",
  );

  const busySlots = data.calendars?.primary?.busy || [];
  return busySlots.length === 0;
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const { clientId = "default", evento } = await req.json();

    if (!evento?.fecha || !evento?.hora || !evento?.nombre_cliente) {
      return json({ ok: false, error: "Faltan datos para crear el evento" }, 400);
    }

    const accessToken = await getAccessToken(clientId);
    const inicio = buildEventDate(evento.fecha, evento.hora);
    const duracion = 30;
    const fin = new Date(inicio.getTime() + duracion * 60000);
    const pastValidation = validateNotInPast(inicio);

    if (!pastValidation.ok) {
      return json(
        {
          ok: false,
          disponible: false,
          error: pastValidation.error,
        },
        400,
      );
    }

    const businessHoursValidation = validateBusinessHours(inicio, fin);

    if (!businessHoursValidation.ok) {
      return json(
        {
          ok: false,
          disponible: false,
          error: businessHoursValidation.error,
        },
        400,
      );
    }

    const disponible = await checkAvailability(accessToken, inicio, fin);

    if (!disponible) {
      return json(
        {
          ok: false,
          disponible: false,
          error:
            "Ese horario ya no esta disponible. Elige otra fecha u hora para la cita.",
        },
        409,
      );
    }

    const gcalEvento = {
      summary: `${evento.titulo} - ${evento.nombre_cliente}`,
      description: `Cliente: ${evento.nombre_cliente}\nWhatsApp: ${evento.whatsapp_cliente}\nNotas: ${evento.notas || "Sin notas"}\n\nAgendado por Velta Chatbot`,
      start: {
        dateTime: inicio.toISOString(),
        timeZone: "America/Mexico_City",
      },
      end: {
        dateTime: fin.toISOString(),
        timeZone: "America/Mexico_City",
      },
    };

    if (evento.email_cliente) {
      gcalEvento.attendees = [{ email: evento.email_cliente }];
    }

    const calRes = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gcalEvento),
      },
    );

    const calData = calRes.ok
      ? await parseJsonResponse(calRes, "Google Calendar no pudo crear el evento")
      : await parseOptionalJsonResponse(calRes);

    if (!calRes.ok) {
      throw new Error(
        calData.error?.message ||
          calData.error ||
          "Google Calendar no pudo crear el evento",
      );
    }

    return json({
      ok: true,
      disponible: true,
      eventoId: calData.id,
      link: calData.htmlLink,
      invitacionEnviada: Boolean(evento.email_cliente),
      mensaje: `Cita confirmada para ${evento.nombre_cliente} el ${evento.fecha} a las ${evento.hora} por 30 minutos`,
    });
  } catch (error) {
    return json(
      { ok: false, error: error.message || "Error creando evento" },
      500,
    );
  }
}
