import { useState, useRef, useEffect } from "react";

// ─── CONFIG POR CLIENTE ──────────────────────────────────────────────────────
const NEGOCIO = {
  clientId: "velta-demo",
  nombre: "logikstudio",
  giro: "agencia de presencia digital con IA",
  servicios: `
    - Landing Page Profesional: desde $8,000 MXN (diseño único para tu giro, optimizada para móvil)
    - Landing Page + Agente de IA Integrado: desde $1,000 MXN/mes (responde preguntas, captura leads, agenda citas)
    - Landing Page + Agente de IA Integrado + Agendado Automático con Google Calendar : desde $1,299 MXN/mes (responde preguntas, captura leads, agenda citas)
    - Sistema POS: cotización personalizada (ventas, inventario y reportes)
  `,
  proceso: `
    1. Platicamos 30 min (sin costo ni compromiso)
    2. Propuesta y boceto en 24 horas
    3. Construimos y configuramos en menos de 7 días
    4. Publicamos con dominio, hosting y chatbot funcionando
  `,
  garantias:
    "Sin contratos de permanencia · Entrega en 7 días · Soporte por WhatsApp incluido",
  ubicacion: "Aguascalientes, México",
  whatsapp: "524492344656",
  tiempo_entrega: "5 a 7 días hábiles",
  primera_consulta: "gratis",
};

const SERVICE_CATALOG = [
  {
    id: "1",
    emoji: "🌐",
    name: "Landing Page Profesional",
    keywords: ["landing", "pagina", "web", "landing page"],
    shortcuts: ["1"],
  },
  {
    id: "2",
    emoji: "🤖",
    name: "Landing Page + Agente de IA",
    keywords: ["ia", "chatbot", "bot", "agente"],
    shortcuts: ["2"],
  },
  {
    id: "3",
    emoji: "📅",
    name: "Landing Page + Agente de IA Integrado + Agendado Automático con Google Calendar",
    keywords: ["ia", "chatbot", "bot", "agente", "calendario"],
    shortcuts: ["3"],
  },
  {
    id: "4",
    emoji: "🧾",
    name: "Sistema POS",
    keywords: ["pos", "inventario", "ventas", "sistema"],
    shortcuts: ["4"],
  },
];

const SERVICE_LIST = SERVICE_CATALOG.map(
  (service) => `${service.id}. ${service.emoji} ${service.name}`,
).join("\n");

const SERVICE_SHORTCUTS = SERVICE_CATALOG.map(
  (service) =>
    `${service.id} = ${service.shortcuts.join(", ")}; palabras clave: ${service.keywords.join(", ")}`,
).join("\n");

const SYSTEM_PROMPT = `Eres el asistente virtual de logikstudio, una agencia de Aguascalientes que crea páginas web con IA para negocios locales.

Tu personalidad: amable, directo y en español mexicano natural. Máximo 2-3 oraciones por respuesta. Nunca digas "claro que sí" ni "por supuesto".

LO QUE OFRECEMOS:
- Landing Page Profesional desde $8,000 MXN — diseño único para tu giro, optimizada para móvil
- Agente de IA Integrado desde $1,000 MXN/mes — responde preguntas, captura clientes y agenda citas 24/7
- Sistema POS — cotización personalizada para control de ventas e inventario
- Integración con WhatsApp Business — add-on disponible
- Agendado automático con Google Calendar — incluido en plan Estándar
- Mantenimiento y soporte por WhatsApp — incluido en mensualidad

SERVICIOS PARA ELEGIR:
${SERVICE_LIST}

PROCESO:
1. Plática de 30 min sin costo
2. Propuesta y boceto en 24 horas
3. Desarrollo y configuración
4. Tu página en vivo en menos de 7 días

GARANTÍAS:
- Sin contratos de permanencia
- Si cancelas, tu página sigue activa 30 días más
- Puedes llevarte el código sin costo adicional
- Primera consulta completamente gratis

PREGUNTAS FRECUENTES:
- ¿Cuánto cuesta? Setup desde $8,000 MXN + $1,000 MXN/mes
- ¿Cuándo está lista? 5 a 7 días hábiles
- ¿Necesito saber de tecnología? No, nosotros nos encargamos de todo
- ¿El chatbot entiende preguntas? Sí, usa IA avanzada entrenada con la info de tu negocio

FLUJOS IMPORTANTES:
- Si piden una cita, llamada o agendar en fecha y hora especifica: ve reuniendo los datos poco a poco, un dato faltante por mensaje
- Si ya tienes servicio, fecha, hora, nombre y WhatsApp, debes intentar agendar en Google Calendar
- Si el sistema confirma la cita, responde como cita confirmada
- Si el sistema no la confirma, no digas que quedo agendada
- Solo usa el flujo de "te contactaremos en menos de 24 horas" cuando el cliente pida informes o consulta general sin fecha y hora especificas
- Cuando necesites que elijan servicio, muéstralo en lista numerada
- El cliente puede elegir servicio diciendo solo el número o una palabra clave corta
- Atajos válidos por servicio:
${SERVICE_SHORTCUTS}
- Orden recomendado para pedir datos de cita: servicio, fecha, hora, nombre, WhatsApp y al final email opcional
- Nunca pidas todos los datos en bloque si todavía faltan; pregunta solo por el siguiente dato faltante y continua con la platica del agente para cotinuar recabando la informacion no le muestres o digas que no agendaste sigue con la platica
- Cuando ya tengas todos los datos requeridos, entonces intenta agendar
- Si piden una consulta o más información: pide su nombre y WhatsApp, confirma que los contactarán en menos de 24 horas
- Si preguntan por precio: da el precio exacto sin rodeos y ofrece la consulta gratis
- Si no sabes algo: di "Te comunico con el equipo" y pide su WhatsApp
- Si quieren hablar con alguien: da el WhatsApp ${NEGOCIO.whatsapp}

RESTRICCIONES:
- Nunca inventes precios o servicios que no están en la lista
- Nunca confirmes una cita si el sistema no la confirma
- No hables de temas fuera de logikstudio y sus servicios`;

// ─── ESTILOS ─────────────────────────────────────────────────────────────────
const S = {
  fab: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "56px",
    height: "56px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    boxShadow: "0 6px 24px rgba(139,92,246,0.5), 0 2px 8px rgba(0,0,0,0.3)",
    transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s",
  },
  window: {
    position: "fixed",
    bottom: "92px",
    right: "24px",
    width: "360px",
    height: "520px",
    background: "#08061a",
    borderRadius: "20px",
    border: "1px solid rgba(139,92,246,0.2)",
    display: "flex",
    flexDirection: "column",
    zIndex: 9998,
    overflow: "hidden",
    boxShadow: "0 24px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(139,92,246,0.1)",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  header: {
    background: "linear-gradient(135deg, #12103a, #0f0c28)",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderBottom: "1px solid rgba(139,92,246,0.15)",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #8b5cf6, #22d3ee)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 4px 12px rgba(139,92,246,0.4)",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    background: "#08061a",
  },
  inputRow: {
    padding: "12px 16px",
    borderTop: "1px solid rgba(139,92,246,0.12)",
    background: "#0f0c28",
    display: "flex",
    gap: "8px",
    alignItems: "center",
  },
};

// ─── COMPONENTE ───────────────────────────────────────────────────────────────
export default function VeltaChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `¡Hola! 👋 Soy el asistente de ${NEGOCIO.nombre}. ¿En qué te puedo ayudar hoy?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: NEGOCIO.clientId,
          messages: newMessages,
          systemPrompt: SYSTEM_PROMPT,
          serviceCatalog: SERVICE_CATALOG,
        }),
      });

      if (!res.ok) {
        throw new Error("La API del chat devolvio un error");
      }

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.text },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Hubo un error. Escríbenos directamente al WhatsApp 🙏",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <>
      {open && (
        <div style={S.window}>
          {/* Header */}
          <div style={S.header}>
            <div style={S.avatar}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M9 2L15 13H3L9 2Z"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="2" r="1.5" fill="white" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
                {NEGOCIO.nombre}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#22d3ee",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  marginTop: "1px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "#22d3ee",
                    borderRadius: "50%",
                    display: "inline-block",
                    boxShadow: "0 0 6px rgba(34,211,238,0.7)",
                  }}
                />
                En línea ahora
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.2)",
                borderRadius: "8px",
                color: "#9d9ab8",
                cursor: "pointer",
                fontSize: "16px",
                lineHeight: 1,
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              ×
            </button>
          </div>

          {/* Mensajes */}
          <div style={S.messages}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: m.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "80%",
                    padding: "10px 14px",
                    borderRadius:
                      m.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    background:
                      m.role === "user"
                        ? "linear-gradient(135deg, #8b5cf6, #6d28d9)"
                        : "rgba(30,20,64,0.9)",
                    color: m.role === "user" ? "#fff" : "#ccc8e8",
                    fontSize: "13px",
                    lineHeight: "1.55",
                    whiteSpace: "pre-wrap",
                    border:
                      m.role === "assistant"
                        ? "1px solid rgba(139,92,246,0.18)"
                        : "none",
                    boxShadow:
                      m.role === "user"
                        ? "0 4px 14px rgba(139,92,246,0.35)"
                        : "none",
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "10px 16px",
                    borderRadius: "16px 16px 16px 4px",
                    background: "rgba(30,20,64,0.9)",
                    border: "1px solid rgba(139,92,246,0.18)",
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#8b5cf6",
                        display: "inline-block",
                        animation: `chatPulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={S.inputRow}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe tu pregunta..."
              style={{
                flex: 1,
                background: "rgba(139,92,246,0.06)",
                border: "1px solid rgba(139,92,246,0.18)",
                borderRadius: "12px",
                padding: "10px 14px",
                color: "#ede9fe",
                fontSize: "13px",
                outline: "none",
                fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "12px",
                background: input.trim()
                  ? "linear-gradient(135deg, #8b5cf6, #22d3ee)"
                  : "rgba(30,20,64,0.8)",
                border: "1px solid rgba(139,92,246,0.2)",
                cursor: input.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s, transform 0.15s",
                boxShadow: input.trim()
                  ? "0 4px 14px rgba(139,92,246,0.4)"
                  : "none",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M2 8L14 2L8 14L7 9L2 8Z"
                  fill="white"
                  stroke="white"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Footer branding */}
          <div
            style={{
              padding: "6px 16px 8px",
              background: "#08061a",
              textAlign: "center",
              fontSize: "10px",
              color: "#3d3860",
              borderTop: "1px solid rgba(139,92,246,0.08)",
            }}
          >
            Powered by{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #8b5cf6, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 600,
              }}
            >
              logikstudio
            </span>{" "}
            · IA para negocios locales
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={S.fab}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1) translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 10px 32px rgba(139,92,246,0.65), 0 4px 12px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 6px 24px rgba(139,92,246,0.5), 0 2px 8px rgba(0,0,0,0.3)";
        }}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path
              d="M4 4h14a2 2 0 012 2v8a2 2 0 01-2 2H8l-4 4V6a2 2 0 012-2z"
              fill="white"
            />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes chatPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.75); }
          50% { opacity: 1; transform: scale(1.1); }
        }
      `}</style>
    </>
  );
}
