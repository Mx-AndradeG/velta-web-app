export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const clientId = searchParams.get("state") || "default";

  if (!code) {
    return new Response("Missing code", { status: 400 });
  }

  // 1. Intercambia code por tokens
  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.VERCEL_URL}/api/auth/callback`,
      grant_type: "authorization_code",
    }),
  });

  const tokens = await tokenRes.json();

  if (!tokens.refresh_token) {
    return new Response(
      "No refresh_token. Revoca el acceso en Google y reintenta.",
      { status: 400 },
    );
  }

  // 2. Guarda en Upstash Redis
  await fetch(
    `${process.env.UPSTASH_REDIS_KV_REST_API_URL}/set/tokens:${clientId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.UPSTASH_REDIS_KV_REST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        JSON.stringify({
          refresh_token: tokens.refresh_token,
          scope: tokens.scope,
          connected_at: new Date().toISOString(),
        }),
      ),
    },
  );

  return new Response(
    `<!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><title>Conectado</title></head>
    <body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;background:#080812;color:#fff">
      <div style="text-align:center">
        <div style="font-size:48px;margin-bottom:16px">✅</div>
        <h2 style="color:#5B7FFF;margin:0 0 8px">¡Calendario conectado!</h2>
        <p style="color:#8888aa">El chatbot de Velta ya puede agendar citas en tu Google Calendar.</p>
        <p style="color:#444460;font-size:13px">Puedes cerrar esta ventana.</p>
      </div>
    </body>
    </html>`,
    { headers: { "Content-Type": "text/html" } },
  );
}
