export const config = { runtime: "edge" };

const CALENDAR_TOOL = {
  functionDeclarations: [
    {
      name: "agendar_cita",
      description:
        "Agenda una cita en Google Calendar cuando el usuario quiere reservar. Solo llama esta funcion cuando ya reuniste TODOS los datos requeridos durante la conversacion: nombre, whatsapp, fecha, hora y servicio.",
      parameters: {
        type: "OBJECT",
        properties: {
          nombre_cliente: {
            type: "STRING",
            description: "Nombre completo del cliente",
          },
          whatsapp_cliente: {
            type: "STRING",
            description: "Numero de WhatsApp del cliente",
          },
          email_cliente: {
            type: "STRING",
            description:
              "Correo electronico del cliente para enviar invitacion de calendario si lo comparte",
          },
          fecha: { type: "STRING", description: "Fecha en formato YYYY-MM-DD" },
          hora: { type: "STRING", description: "Hora en formato HH:MM (24h)" },
          servicio: {
            type: "STRING",
            description: "Servicio que quiere el cliente",
          },
          notas: {
            type: "STRING",
            description: "Notas adicionales opcionales",
          },
        },
        required: [
          "nombre_cliente",
          "whatsapp_cliente",
          "fecha",
          "hora",
          "servicio",
        ],
      },
    },
  ],
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function getMexicoCityNow() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const parts = Object.fromEntries(
    formatter.formatToParts(now).map((part) => [part.type, part.value]),
  );

  return {
    isoDate: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`,
  };
}

function getMexicoCityDateParts() {
  const now = getMexicoCityNow();
  const [year, month, day] = now.isoDate.split("-").map(Number);
  return { year, month, day };
}

function buildSystemPrompt(basePrompt) {
  const now = getMexicoCityNow();

  return `${basePrompt}

CONTEXTO DE FECHA Y HORA:
- Fecha actual en America/Mexico_City: ${now.isoDate}
- Hora actual en America/Mexico_City: ${now.time}
- Si el usuario dice "hoy", "mañana", "pasado mañana" o fechas relativas, resuélvelas usando esa fecha actual.
- Nunca conviertas fechas relativas a años pasados.
- Antes de llamar agendar_cita, asegúrate de que la fecha final sea igual o posterior a ${now.isoDate}.`;
}

function getErrorStatus(error) {
  const message = error.message || "";

  if (
    message.includes("API key expired") ||
    message.includes("API_KEY_INVALID") ||
    message.includes("invalid API key") ||
    message.includes("PERMISSION_DENIED") ||
    message.includes("API key not valid")
  ) {
    return 401;
  }

  return 500;
}

async function parseJsonResponse(response, fallbackMessage) {
  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : { raw: await response.text() };

  if (!response.ok) {
    const message =
      data.error?.message ||
      data.error ||
      data.raw ||
      fallbackMessage ||
      "La solicitud fallo";
    throw new Error(message);
  }

  return data;
}

async function parseAnyJsonResponse(response) {
  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return { raw: await response.text() };
}

async function callGemini(payload) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("Falta configurar GEMINI_API_KEY");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  return parseJsonResponse(response, "Gemini no devolvio una respuesta valida");
}

function buildContents(messages = []) {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

function normalizeText(text = "") {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function resolveServiceSelection(value, serviceCatalog = []) {
  const normalizedValue = normalizeText(value);

  if (!normalizedValue || serviceCatalog.length === 0) {
    return value;
  }

  const matchedService = serviceCatalog.find((service) => {
    const aliases = [
      service.id,
      service.name,
      ...(service.keywords || []),
      ...(service.shortcuts || []),
    ].map(normalizeText);

    return aliases.some(
      (alias) =>
        alias === normalizedValue ||
        normalizedValue.includes(alias) ||
        alias.includes(normalizedValue),
    );
  });

  return matchedService?.name || value;
}

function resolveServiceFromConversation(messages = [], serviceCatalog = []) {
  const recentUserMessages = messages
    .filter((message) => message.role === "user")
    .slice(-8)
    .map((message) => message.content);

  for (const message of recentUserMessages.reverse()) {
    const resolved = resolveServiceSelection(message, serviceCatalog);
    if (resolved !== message) {
      return resolved;
    }
  }

  return null;
}

function findReplyToAssistantPrompt(messages = [], promptRegex) {
  for (let index = messages.length - 2; index >= 0; index -= 1) {
    const assistantMessage = messages[index];
    const userReply = messages[index + 1];

    if (
      assistantMessage?.role === "assistant" &&
      userReply?.role === "user" &&
      promptRegex.test(assistantMessage.content)
    ) {
      return userReply.content.trim();
    }
  }

  return null;
}

function extractEmail(messages = []) {
  const reply = findReplyToAssistantPrompt(messages, /correo|email/i);
  const source =
    reply ||
    [...messages]
      .reverse()
      .find(
        (message) =>
          message.role === "user" &&
          /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(message.content),
      )?.content;

  return source?.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || null;
}

function extractWhatsapp(messages = []) {
  const reply = findReplyToAssistantPrompt(messages, /whatsapp|telefono/i);
  const source =
    reply ||
    [...messages]
      .reverse()
      .find(
        (message) =>
          message.role === "user" &&
          /(?:\+?52)?\s*\d[\d\s-]{7,}/.test(message.content),
      )?.content;

  const digits = source?.replace(/\D/g, "") || "";
  return digits.length >= 10 ? digits : null;
}

function extractName(messages = []) {
  const reply = findReplyToAssistantPrompt(messages, /nombre/i);

  if (!reply) {
    return null;
  }

  const cleaned = reply.replace(/[^\p{L}\s]/gu, " ").replace(/\s+/g, " ").trim();
  return cleaned.split(" ").length >= 2 ? cleaned : null;
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function toIsoDate(parts) {
  return `${parts.year}-${pad2(parts.month)}-${pad2(parts.day)}`;
}

function addDays(parts, daysToAdd) {
  const date = new Date(
    Date.UTC(parts.year, parts.month - 1, parts.day + daysToAdd, 12, 0, 0),
  );

  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
  };
}

function parseTime(text = "") {
  const normalized = normalizeText(text);
  const match =
    normalized.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)/i) ||
    normalized.match(/\b(\d{1,2}):(\d{2})\b/) ||
    normalized.match(/\ba las (\d{1,2})\b/);

  if (!match) {
    return null;
  }

  let hours = Number(match[1]);
  const minutes = Number(match[2] || "00");
  const meridiem = match[3]?.toLowerCase();

  if (meridiem === "pm" && hours < 12) {
    hours += 12;
  }

  if (meridiem === "am" && hours === 12) {
    hours = 0;
  }

  if (hours > 23 || minutes > 59) {
    return null;
  }

  return `${pad2(hours)}:${pad2(minutes)}`;
}

function parseRelativeOrIsoDate(text = "") {
  const normalized = normalizeText(text);
  const today = getMexicoCityDateParts();

  if (/pasado manana/.test(normalized)) {
    return toIsoDate(addDays(today, 2));
  }

  if (/manana/.test(normalized)) {
    return toIsoDate(addDays(today, 1));
  }

  if (/hoy/.test(normalized)) {
    return toIsoDate(today);
  }

  const isoMatch = normalized.match(/\b(20\d{2}-\d{2}-\d{2})\b/);
  if (isoMatch) {
    return isoMatch[1];
  }

  const slashMatch = normalized.match(/\b(\d{1,2})[/-](\d{1,2})[/-](20\d{2})\b/);
  if (slashMatch) {
    return `${slashMatch[3]}-${pad2(slashMatch[2])}-${pad2(slashMatch[1])}`;
  }

  return null;
}

function extractDateTime(messages = []) {
  const reply = findReplyToAssistantPrompt(messages, /fecha|hora|dia/i);
  const source =
    reply ||
    [...messages]
      .reverse()
      .find(
        (message) =>
          message.role === "user" &&
          (/hoy|manana|pasado manana|\d{4}-\d{2}-\d{2}|\d{1,2}[/-]\d{1,2}[/-]20\d{2}/i.test(
            normalizeText(message.content),
          ) ||
            /am|pm|:\d{2}|a las \d{1,2}/i.test(normalizeText(message.content))),
      )?.content;

  if (!source) {
    return { fecha: null, hora: null };
  }

  return {
    fecha: parseRelativeOrIsoDate(source),
    hora: parseTime(source),
  };
}

function extractSchedulingArgs(messages = [], serviceCatalog = []) {
  const servicio = resolveServiceFromConversation(messages, serviceCatalog);
  const nombre_cliente = extractName(messages);
  const whatsapp_cliente = extractWhatsapp(messages);
  const email_cliente = extractEmail(messages);
  const { fecha, hora } = extractDateTime(messages);

  return {
    servicio,
    nombre_cliente,
    whatsapp_cliente,
    email_cliente,
    fecha,
    hora,
  };
}

function hasRequiredSchedulingArgs(args) {
  return Boolean(
    args?.servicio &&
      args?.nombre_cliente &&
      args?.whatsapp_cliente &&
      args?.fecha &&
      args?.hora,
  );
}

function getFirstModelPart(data) {
  return data.candidates?.[0]?.content?.parts?.[0];
}

function getFunctionCallPart(data) {
  return data.candidates?.[0]?.content?.parts?.find(
    (part) => part.functionCall,
  );
}

function buildConfirmedScheduleMessage(calData) {
  const parts = [calData.mensaje];

  if (calData.invitacionEnviada) {
    parts.push("Te envie la invitacion por correo.");
  }

  return parts.join(" ");
}

function buildUnavailableScheduleMessage(calData) {
  return (
    calData.error ||
    "Ese horario ya no esta disponible. Comparte otra fecha u hora para agendar."
  );
}

async function scheduleAppointment(req, clientId, args, systemPrompt, contents) {
  const calendarUrl = new URL("/api/calendar", req.url).toString();
  const calRes = await fetch(calendarUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      clientId,
      evento: {
        ...args,
        titulo: args.servicio,
        duracion: 30,
      },
    }),
  });

  const calData = await parseAnyJsonResponse(calRes);

  if (calRes.status === 409) {
    return json({
      text: buildUnavailableScheduleMessage(calData),
      citaAgendada: false,
      calendar: calData,
    });
  }

  if (!calRes.ok) {
    throw new Error(calData.error || calData.raw || "No fue posible agendar la cita");
  }

  const finalData = await callGemini({
    system_instruction: { parts: [{ text: systemPrompt }] },
    contents: [
      ...contents,
      {
        role: "model",
        parts: [
          {
            functionCall: {
              name: "agendar_cita",
              args,
            },
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            functionResponse: {
              name: "agendar_cita",
              response: calData.ok
                ? { resultado: calData.mensaje }
                : { error: calData.error || "Error al agendar la cita" },
            },
          },
        ],
      },
    ],
    generationConfig: { temperature: 0.7, maxOutputTokens: 200 },
  });

  const modelText = getFirstModelPart(finalData)?.text ?? "";
  const text = calData.ok
    ? buildConfirmedScheduleMessage(calData)
    : modelText || "No fue posible agendar la cita.";

  return json({ text, citaAgendada: calData.ok, calendar: calData });
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await req.json();
    const {
      messages,
      systemPrompt,
      clientId = "default",
      serviceCatalog = [],
    } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return json({ error: "messages es requerido" }, 400);
    }

    if (!systemPrompt) {
      return json({ error: "systemPrompt es requerido" }, 400);
    }

    const contents = buildContents(messages);
    const fullSystemPrompt = buildSystemPrompt(systemPrompt);

    const geminiData = await callGemini({
      system_instruction: { parts: [{ text: fullSystemPrompt }] },
      contents,
      tools: [CALENDAR_TOOL],
      generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
    });

    const functionPart = getFunctionCallPart(geminiData);

    if (functionPart?.functionCall?.name === "agendar_cita") {
      const args = functionPart.functionCall.args || {};
      const resolvedService =
        resolveServiceSelection(args.servicio, serviceCatalog) ||
        resolveServiceFromConversation(messages, serviceCatalog) ||
        args.servicio;

      return scheduleAppointment(
        req,
        clientId,
        { ...args, servicio: resolvedService },
        fullSystemPrompt,
        contents,
      );
    }

    const extractedArgs = extractSchedulingArgs(messages, serviceCatalog);

    if (hasRequiredSchedulingArgs(extractedArgs)) {
      return scheduleAppointment(
        req,
        clientId,
        extractedArgs,
        fullSystemPrompt,
        contents,
      );
    }

    const text =
      getFirstModelPart(geminiData)?.text ?? "Lo siento, intenta de nuevo.";

    return json({ text });
  } catch (error) {
    return json(
      {
        error: error.message || "Error interno del chat",
        text:
          getErrorStatus(error) === 401
            ? "La configuracion de Gemini no es valida o ya expiro. Renueva GEMINI_API_KEY."
            : "Hubo un problema al responder. Intenta de nuevo en un momento.",
      },
      getErrorStatus(error),
    );
  }
}
