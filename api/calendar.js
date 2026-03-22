async function getAccessToken(clientId) {
  // 1. Lee refresh_token de Upstash Redis
  const kvRes = await fetch(
    `${process.env.UPSTASH_REDIS_KV_REST_API_URL}/get/tokens:${clientId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_KV_REST_API_TOKEN}`,
      },
    },
  );

  const kvData = await kvRes.json();
  if (!kvData.result)
    throw new Error(
      "Cliente no conectado. Ve a /api/auth?clientId=" + clientId,
    );

  const { refresh_token } = JSON.parse(kvData.result);

  // 2. Renueva el access_token
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      grant_type: "refresh_token",
    }),
  });

  const tokens = await tokenRes.json();
  if (!tokens.access_token) throw new Error("No se pudo renovar el token");
  return tokens.access_token;
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { clientId, evento } = await req.json();

  try {
    const accessToken = await getAccessToken(clientId);

    const inicio = new Date(`${evento.fecha}T${evento.hora}:00`);
    const fin = new Date(inicio.getTime() + (evento.duracion || 60) * 60000);

    const gcalEvento = {
      summary: `${evento.titulo} — ${evento.nombre_cliente}`,
      description: `Cliente: ${evento.nombre_cliente}\nWhatsApp: ${evento.whatsapp_cliente}\nNotas: ${evento.notas || "Sin notas"}\n\n📲 Agendado por Velta Chatbot`,
      start: {
        dateTime: inicio.toISOString(),
        timeZone: "America/Mexico_City",
      },
      end: { dateTime: fin.toISOString(), timeZone: "America/Mexico_City" },
    };

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

    const calData = await calRes.json();

    if (calData.id) {
      return new Response(
        JSON.stringify({
          ok: true,
          eventoId: calData.id,
          link: calData.htmlLink,
          mensaje: `✅ Cita confirmada para ${evento.nombre_cliente} el ${evento.fecha} a las ${evento.hora}`,
        }),
        { headers: { "Content-Type": "application/json" } },
      );
    } else {
      throw new Error(calData.error?.message || "Error creando evento");
    }
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
