import { useState } from "react";

// Lista base de preguntas frecuentes renderizada por el acordeón.
const faqItems = [
  {
    question: "¿Cuánto cuesta una página con chatbot IA?",
    answer:
      "El desarrollo inicial (setup) va desde $8,000 MXN dependiendo del giro y complejidad. La mensualidad que incluye hosting, mantenimiento y el agente de IA cuesta desde $1,000 MXN al mes. Sin contratos de permanencia.",
  },
  {
    question: "¿En cuánto tiempo está lista mi página?",
    answer:
      "El tiempo promedio de entrega es de 5 a 7 días hábiles desde que apruebas la propuesta y nos envías la información de tu negocio. Proyectos más complejos pueden tomar hasta 2 semanas.",
  },
  {
    question: "¿El chatbot realmente entiende preguntas?",
    answer:
      "Sí. Usamos modelos de inteligencia artificial avanzados (Claude o equivalente) que entienden lenguaje natural. Lo entrenamos con la información de tu negocio: servicios, precios, horarios, ubicación y más.",
  },
  {
    question: "¿Qué pasa si quiero cancelar?",
    answer:
      "Sin problema. No hay contratos de permanencia. Si decides cancelar la mensualidad, tu página permanece activa 30 días más. Puedes llevarte el código de tu página sin costo adicional.",
  },
  {
    question: "¿Necesito saber de tecnología para administrar mi página?",
    answer:
      "Para nada. Nosotros nos encargamos de todo. Si necesitas actualizar algo (precios, horarios, fotos), nos escribes por WhatsApp y lo hacemos ese mismo día. El soporte está incluido en tu mensualidad.",
  },
  {
    question: "¿El chatbot puede agendar citas en mi Google Calendar?",
    answer:
      "Sí, esa integración está disponible en el plan Estándar en adelante. El asistente verifica disponibilidad en tiempo real, agenda la cita y envía confirmación automática al cliente.",
  },
];

// Acordeón de FAQ controlado con estado local de React.
function Faq() {
  const [openIndex, setOpenIndex] = useState(null);

  // Abre un item y cierra el anterior; si se vuelve a pulsar, lo cierra.
  const toggleItem = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section className="section" id="faq">
      <div className="faq-layout">
        <div>
          <span className="sec-tag">FAQ</span>
          <h2 className="sec-title">
            Preguntas
            <br />
            frecuentes
          </h2>
          <p className="sec-sub" style={{ marginBottom: "2rem" }}>
            Si tienes otra duda, escríbenos por WhatsApp y te respondemos al
            instante.
          </p>
          <button
            className="btn-grad"
            style={{ fontSize: ".82rem", padding: ".75rem 1.8rem" }}
            onClick={() =>
              window.open(
                "https://wa.me/524490000000",
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            Preguntar por WhatsApp
          </button>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={item.question}
                className={`faq-item${isOpen ? " open" : ""}`}
              >
                <button
                  className="faq-q"
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => toggleItem(index)}
                >
                  {item.question}
                  <span className="faq-icon">+</span>
                </button>
                <div className="faq-a">{item.answer}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Faq;
