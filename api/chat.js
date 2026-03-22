const CALENDAR_TOOL = {
  functionDeclarations: [
    {
      name: "agendar_cita",
      description:
        "Agenda una cita en Google Calendar cuando el usuario quiere reservar. Solo llama esta función cuando tengas TODOS los datos: nombre, whatsapp, fecha, hora y servicio.",
      parameters: {
        type: "OBJECT",
        properties: {
          nombre_cliente: {
            type: "STRING",
            description: "Nombre completo del cliente",
          },
          whatsapp_cliente: {
            type: "STRING",
            description: "Número de WhatsApp del cliente",
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

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const { messages, systemPrompt, clientId } = await req.json();

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  // 1. Primera llamada a Gemini
  const geminiRes = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        tools: [CALENDAR_TOOL],
        generationConfig: { temperature: 0.7, maxOutputTokens: 400 },
      }),
    },
  );

  const geminiData = await geminiRes.json();
  const part = geminiData.candidates?.[0]?.content?.parts?.[0];

  // 2. Gemini quiere agendar — tiene todos los datos
  if (part?.functionCall?.name === "agendar_cita") {
    const args = part.functionCall.args;

    const calRes = await fetch(`${process.env.VERCEL_URL}/api/calendar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId,
        evento: { ...args, titulo: args.servicio, duracion: 60 },
      }),
    });

    const calData = await calRes.json();

    // 3. Segunda llamada — Gemini formula la respuesta final
    const finalRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents: [
            ...contents,
            { role: "model", parts: [{ functionCall: part.functionCall }] },
            {
              role: "user",
              parts: [
                {
                  functionResponse: {
                    name: "agendar_cita",
                    response: calData.ok
                      ? { resultado: calData.mensaje }
                      : {
                          error:
                            "Error al agendar, pide al cliente que llame directamente",
                        },
                  },
                },
              ],
            },
          ],
          generationConfig: { temperature: 0.7, maxOutputTokens: 200 },
        }),
      },
    );

    const finalData = await finalRes.json();
    const text =
      finalData.candidates?.[0]?.content?.parts?.[0]?.text ?? calData.mensaje;

    return new Response(JSON.stringify({ text, citaAgendada: calData.ok }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  // 4. Respuesta de texto normal
  const text = part?.text ?? "Lo siento, intenta de nuevo.";
  return new Response(JSON.stringify({ text }), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
