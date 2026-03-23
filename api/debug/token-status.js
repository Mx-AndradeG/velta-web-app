export const config = { runtime: "edge" };

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

  return parsed && typeof parsed === "object" ? parsed : null;
}

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const clientId = searchParams.get("clientId") || "default";

  try {
    const response = await fetch(
      `${process.env.UPSTASH_REDIS_KV_REST_API_URL}/get/tokens:${clientId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_KV_REST_API_TOKEN}`,
        },
      },
    );

    const data = await parseJsonResponse(
      response,
      "No fue posible consultar Redis para este clientId",
    );

    const parsed = parseStoredToken(data.result);

    return json({
      clientId,
      hasToken: Boolean(data.result),
      connectedAt: parsed?.connected_at || null,
      scope: parsed?.scope || null,
      tokenShape: parsed
        ? {
            hasRefreshToken: Boolean(parsed.refresh_token),
            keys: Object.keys(parsed),
          }
        : null,
    });
  } catch (error) {
    return json(
      {
        clientId,
        hasToken: false,
        error: error.message || "Error consultando Redis",
      },
      500,
    );
  }
}
