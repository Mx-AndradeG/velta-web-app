import { useState, useRef, useEffect } from "react";

// ─── CONFIG POR CLIENTE ──────────────────────────────────────────────────────
// Solo cambia este objeto para cada cliente nuevo
const NEGOCIO = {
  nombre: "Restaurante El Patio",
  giro: "restaurante",
  servicios: "Comida mexicana tradicional, desayunos, comidas corridas y cenas",
  horario: "Lunes a sábado 8am–10pm, domingos 9am–6pm",
  telefono: "+52 449 123 4567",
  whatsapp: "524491234567",
  direccion: "Centro histórico, Aguascalientes",
  precio_promedio: "$120–180 MXN por persona",
  cita_url: "", // URL de Calendly si aplica
};

const SYSTEM_PROMPT = `Eres el asistente virtual de ${NEGOCIO.nombre}, un negocio de ${NEGOCIO.giro} en Aguascalientes, México.

Tu trabajo es atender a los clientes de forma amable, natural y en español mexicano. Eres breve y directo — máximo 2-3 oraciones por respuesta.

Información del negocio:
- Servicios: ${NEGOCIO.servicios}
- Horario: ${NEGOCIO.horario}
- Teléfono: ${NEGOCIO.telefono}
- Dirección: ${NEGOCIO.direccion}
- Precio promedio: ${NEGOCIO.precio_promedio}

Reglas importantes:
1. Si preguntan por reservación o cita, pide su nombre y número de WhatsApp
2. Si no sabes algo, di "Te comunico con el equipo" y pide su WhatsApp
3. Nunca inventes precios ni información que no tienes
4. Siempre termina ofreciendo ayuda adicional
5. Si el cliente quiere hablar con una persona, da el número de WhatsApp: ${NEGOCIO.whatsapp}`;

// ─── ESTILOS ─────────────────────────────────────────────────────────────────
const styles = {
  // Botón flotante
  fab: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "#3A5FE8",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
    boxShadow: "0 4px 20px rgba(58,95,232,0.4)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  // Ventana del chat
  window: {
    position: "fixed",
    bottom: "92px",
    right: "24px",
    width: "360px",
    height: "500px",
    background: "#080812",
    borderRadius: "20px",
    border: "1px solid rgba(91,127,255,0.2)",
    display: "flex",
    flexDirection: "column",
    zIndex: 9998,
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
  header: {
    background: "#13132A",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    borderBottom: "1px solid rgba(91,127,255,0.15)",
  },
  avatar: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: "#3A5FE8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  inputRow: {
    padding: "12px 16px",
    borderTop: "1px solid rgba(91,127,255,0.15)",
    background: "#13132A",
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
          messages: newMessages,
          systemPrompt: SYSTEM_PROMPT,
        }),
      });

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
      {/* Ventana de chat */}
      {open && (
        <div style={styles.window}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.avatar}>
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
              <div style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>
                {NEGOCIO.nombre}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#22c55e",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "#22c55e",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
                En línea ahora
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#8888aa",
                cursor: "pointer",
                fontSize: "18px",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>

          {/* Mensajes */}
          <div style={styles.messages}>
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
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius:
                      m.role === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    background: m.role === "user" ? "#3A5FE8" : "#1E1E40",
                    color: m.role === "user" ? "#fff" : "#d4d4e8",
                    fontSize: "13px",
                    lineHeight: "1.5",
                    border:
                      m.role === "assistant"
                        ? "1px solid rgba(91,127,255,0.2)"
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
                    background: "#1E1E40",
                    border: "1px solid rgba(91,127,255,0.2)",
                    display: "flex",
                    gap: "4px",
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
                        background: "#5B7FFF",
                        display: "inline-block",
                        animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={styles.inputRow}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Escribe tu pregunta..."
              style={{
                flex: 1,
                background: "#080812",
                border: "1px solid rgba(91,127,255,0.2)",
                borderRadius: "10px",
                padding: "10px 14px",
                color: "#fff",
                fontSize: "13px",
                outline: "none",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              style={{
                width: "38px",
                height: "38px",
                borderRadius: "10px",
                background: input.trim() ? "#3A5FE8" : "#1E1E40",
                border: "none",
                cursor: input.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.2s",
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
              padding: "6px 16px",
              background: "#080812",
              textAlign: "center",
              fontSize: "10px",
              color: "#444460",
            }}
          >
            Powered by <span style={{ color: "#5B7FFF" }}>Velta</span> · IA para
            negocios locales
          </div>
        </div>
      )}

      {/* FAB button */}
      <button
        onClick={() => setOpen((o) => !o)}
        style={styles.fab}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)";
          e.currentTarget.style.boxShadow = "0 6px 28px rgba(58,95,232,0.55)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(58,95,232,0.4)";
        }}
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
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
        * { box-sizing: border-box; }
      `}</style>
    </>
  );
}
