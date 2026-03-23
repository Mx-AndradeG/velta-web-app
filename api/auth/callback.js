export const config = { runtime: "edge" };

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

function buildStoredToken(tokens) {
  return JSON.stringify({
    refresh_token: tokens.refresh_token,
    scope: tokens.scope,
    connected_at: new Date().toISOString(),
  });
}

async function getStoredToken(clientId) {
  const response = await fetch(
    `${process.env.UPSTASH_REDIS_KV_REST_API_URL}/get/tokens:${clientId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_KV_REST_API_TOKEN}`,
      },
    },
  );

  return parseJsonResponse(
    response,
    "No fue posible verificar el token guardado en Redis",
  );
}

export default async function handler(req) {
  const { searchParams, origin } = new URL(req.url);
  const code = searchParams.get("code");
  const clientId = searchParams.get("state") || "default";

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${origin}/api/auth/callback`,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await parseJsonResponse(
      tokenRes,
      "No fue posible completar la autenticacion con Google",
    );

    if (!tokens.refresh_token) {
      return new Response(
        "No refresh_token. Revoca el acceso en Google y reintenta.",
        { status: 400 },
      );
    }

    const saveRes = await fetch(
      `${process.env.UPSTASH_REDIS_KV_REST_API_URL}/set/tokens:${clientId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_KV_REST_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: buildStoredToken(tokens),
      },
    );

    await parseJsonResponse(saveRes, "No fue posible guardar el token del cliente");
    const storedToken = await getStoredToken(clientId);

    if (!storedToken.result) {
      throw new Error(
        "El callback termino, pero Redis no devolvio el token guardado para este clientId",
      );
    }

    return new Response(
      `<!DOCTYPE html>
      <html>
      <head><meta charset="utf-8"><title>Conectado</title></head>
      <body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#080812;color:#fff">
        <div style="text-align:center">
          <div style="font-size:48px;margin-bottom:16px">OK</div>
          <h2 style="color:#5B7FFF;margin:0 0 8px">Calendario conectado</h2>
          <p style="color:#8888aa">El chatbot de Velta ya puede agendar citas en tu Google Calendar.</p>
          <p style="color:#444460;font-size:13px">Puedes cerrar esta ventana.</p>
        </div>
      </body>
      </html>`,
      { headers: { "Content-Type": "text/html" } },
    );
  } catch (error) {
    return new Response(
      `Error conectando el calendario: ${error.message || "Error desconocido"}`,
      { status: 500 },
    );
  }
}
