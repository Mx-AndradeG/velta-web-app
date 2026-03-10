import "./css/App.css";
import Nav from "./components/nav";
import Principal from "./components/principal";

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function openWhatsApp(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function App() {
  return (
    <>
      <Nav />
      <Principal />

      <section className="section" id="servicios">
        <span className="sec-tag">Lo que hacemos</span>
        <h2 className="sec-title">
          Todo lo que necesita
          <br />
          tu negocio online
        </h2>
        <p className="sec-sub">
          Sin tecnicismos. Sin contratos eternos. Tú te enfocas en tu negocio,
          nosotros en traerte clientes.
        </p>
        <div className="services-grid">
          <div className="svc-card">
            <div className="svc-icon">🌐</div>
            <h3>Landing Page Profesional</h3>
            <p>
              Diseño único para tu giro. Optimizada para móvil, rápida, con
              secciones de servicios, testimonios y llamada a la acción.
            </p>
            <span className="svc-price">Desde $8,000 MXN</span>
          </div>
          <div className="svc-card">
            <div className="svc-icon">🤖</div>
            <h3>Agente de IA Integrado</h3>
            <p>
              Un asistente que responde preguntas frecuentes, captura el nombre
              y teléfono del cliente y agenda citas automáticamente.
            </p>
            <span className="svc-price">Desde $1,000 MXN/mes</span>
          </div>
          <div className="svc-card">
            <div className="svc-icon">📊</div>
            <h3>Sistema POS para tu Negocio</h3>
            <p>
              Control de ventas, inventario y reportes. Compatible con cualquier
              giro. Fácil de usar desde el primer día.
            </p>
            <span className="svc-price">Cotización personalizada</span>
          </div>
          <div className="svc-card">
            <div className="svc-icon">📱</div>
            <h3>Integración con WhatsApp</h3>
            <p>
              El agente de IA también puede responder en tu WhatsApp Business.
              Nunca más pierdas un cliente por no contestar.
            </p>
            <span className="svc-price">Add-on disponible</span>
          </div>
          <div className="svc-card">
            <div className="svc-icon">📆</div>
            <h3>Agendado Automático</h3>
            <p>
              El chatbot conecta con Google Calendar y agenda citas sin que tú
              tengas que hacer nada. Confirmaciones automáticas.
            </p>
            <span className="svc-price">Incluido en plan Estándar</span>
          </div>
          <div className="svc-card">
            <div className="svc-icon">⚡</div>
            <h3>Mantenimiento y Soporte</h3>
            <p>
              Actualización de contenido, hosting incluido, soporte por
              WhatsApp. Tu página siempre funcionando sin que te preocupes.
            </p>
            <span className="svc-price">Incluido en mensualidad</span>
          </div>
        </div>
      </section>

      <section className="section how-section" id="proceso">
        <span className="sec-tag">El proceso</span>
        <h2 className="sec-title">
          De cero a tu página
          <br />
          en menos de 7 días
        </h2>
        <p className="sec-sub">
          Sin reuniones interminables. Sin formularios complicados. Así de
          directo.
        </p>
        <div className="how-grid">
          <div className="how-step">
            <div className="step-num">01</div>
            <h4>Platicamos 30 min</h4>
            <p>
              Nos cuentas sobre tu negocio, tus clientes y qué necesitas. Sin
              costo, sin compromiso.
            </p>
          </div>
          <div className="how-step">
            <div className="step-num">02</div>
            <h4>Diseñamos tu propuesta</h4>
            <p>
              En 24 horas te enviamos boceto del diseño y propuesta de contenido
              personalizada para tu giro.
            </p>
          </div>
          <div className="how-step">
            <div className="step-num">03</div>
            <h4>Construimos y configuramos</h4>
            <p>
              Desarrollamos tu página, entrenamos al agente de IA con la info de
              tu negocio y hacemos pruebas.
            </p>
          </div>
          <div className="how-step">
            <div className="step-num">04</div>
            <h4>Publicamos y listo</h4>
            <p>
              Tu página sale en vivo con dominio, hosting y chatbot funcionando.
              Tú solo das el visto bueno.
            </p>
          </div>
        </div>
      </section>

      <section
        className="section"
        style={{ paddingTop: "5rem", paddingBottom: "5rem" }}
      >
        <div className="proof-grid">
          <div className="proof-card">
            <div className="proof-num">+40</div>
            <div className="proof-label">Negocios con página activa</div>
          </div>
          <div className="proof-card">
            <div className="proof-num">24/7</div>
            <div className="proof-label">
              El agente de IA siempre disponible
            </div>
          </div>
          <div className="proof-card">
            <div className="proof-num">7 días</div>
            <div className="proof-label">Tiempo promedio de entrega</div>
          </div>
        </div>
      </section>

      <section
        className="section"
        id="testimonios"
        style={{ paddingTop: "2rem", borderTop: "1px solid var(--border)" }}
      >
        <span className="sec-tag">Testimonios</span>
        <h2 className="sec-title">
          Negocios que ya
          <br />
          están creciendo
        </h2>
        <div className="test-grid">
          <div className="test-card">
            <div className="stars">★★★★★</div>
            <p>
              "Antes perdía pacientes porque no contestaba el WhatsApp rápido.
              Ahora el chatbot les responde al instante y ya llegan con cita
              confirmada."
            </p>
            <div className="t-author">
              <div className="t-av">M</div>
              <div>
                <div className="t-name">Dra. Martínez</div>
                <div className="t-role">
                  Consultorio dental · Aguascalientes
                </div>
              </div>
            </div>
          </div>
          <div className="test-card">
            <div className="stars">★★★★★</div>
            <p>
              "Mi barbería se llenó en el primer mes. La página se ve muy
              profesional y el sistema de citas nos ahorra como 2 horas al día
              de WhatsApp."
            </p>
            <div className="t-author">
              <div className="t-av">R</div>
              <div>
                <div className="t-name">Ricardo Flores</div>
                <div className="t-role">Barbería RFB · Aguascalientes</div>
              </div>
            </div>
          </div>
          <div className="test-card">
            <div className="stars">★★★★★</div>
            <p>
              "Pensé que era caro pero la mensualidad vale lo que cuesta. Ya
              recuperé la inversión en el segundo mes con los clientes nuevos
              que llegaron por la página."
            </p>
            <div className="t-author">
              <div className="t-av">L</div>
              <div>
                <div className="t-name">Laura Vega</div>
                <div className="t-role">Spa & Estética · Aguascalientes</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section form-section" id="contacto">
        <div className="form-layout">
          <div className="form-left">
            <span className="sec-tag">Empieza hoy</span>
            <h2 className="sec-title">
              Tu primera consulta
              <br />
              es gratis.
            </h2>
            <p>
              Cuéntanos sobre tu negocio y en menos de 24 horas te enviamos una
              propuesta personalizada sin compromiso.
            </p>
            <div className="form-perks">
              <div className="perk">
                <div className="perk-icon">✓</div> Sin contratos de permanencia
              </div>
              <div className="perk">
                <div className="perk-icon">✓</div> Diseño 100% personalizado
                para tu giro
              </div>
              <div className="perk">
                <div className="perk-icon">✓</div> Entrega en menos de 7 días
              </div>
              <div className="perk">
                <div className="perk-icon">✓</div> Soporte por WhatsApp incluido
              </div>
              <div className="perk">
                <div className="perk-icon">✓</div> Agente de IA entrenado con tu
                negocio
              </div>
            </div>
          </div>

          <div>
            <div className="lead-form" id="leadForm">
              <div className="form-title">Solicita tu propuesta</div>
              <div className="form-subtitle">
                Te respondemos en menos de 24 horas por WhatsApp
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="f-nombre">Nombre *</label>
                  <input type="text" id="f-nombre" placeholder="Tu nombre" />
                </div>
                <div className="form-group">
                  <label htmlFor="f-tel">WhatsApp *</label>
                  <input type="tel" id="f-tel" placeholder="449 000 0000" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="f-negocio">Nombre de tu negocio *</label>
                <input
                  type="text"
                  id="f-negocio"
                  placeholder="Ej. Consultorio Dra. García"
                />
              </div>
              <div className="form-group">
                <label htmlFor="f-giro">¿A qué se dedica tu negocio?</label>
                <select id="f-giro" defaultValue="">
                  <option value="" disabled>
                    Selecciona tu giro
                  </option>
                  <option>Consultorio / Clínica</option>
                  <option>Salón de belleza / Barbería</option>
                  <option>Restaurante / Cafetería</option>
                  <option>Tienda / Retail</option>
                  <option>Despacho / Consultoría</option>
                  <option>Escuela / Academia</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="f-necesidad">
                  ¿Qué necesitas principalmente?
                </label>
                <select id="f-necesidad" defaultValue="">
                  <option value="" disabled>
                    ¿Qué te interesa más?
                  </option>
                  <option>Landing page + chatbot IA</option>
                  <option>Solo landing page</option>
                  <option>Sistema POS</option>
                  <option>Landing + POS</option>
                  <option>No sé, quiero asesoría</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="f-msg">
                  ¿Algo más que quieras contarnos? (opcional)
                </label>
                <textarea
                  id="f-msg"
                  rows="2"
                  placeholder="Cuéntanos brevemente sobre tu negocio..."
                ></textarea>
              </div>

              <button className="btn-form" type="button">
                Quiero mi propuesta gratis {"->"}
              </button>
              <p className="form-note">
                🔒 Tus datos están seguros. No enviamos spam.
              </p>
            </div>

            <div className="form-success" id="formSuccess">
              <div className="success-icon">🎉</div>
              <div className="success-title">
                ¡Listo! Ya recibimos tu solicitud.
              </div>
              <div className="success-msg">
                Te contactaremos por WhatsApp en las próximas 24 horas con tu
                propuesta personalizada.
                <br />
                <br />
                Mientras tanto, si tienes preguntas escríbenos directo.
              </div>
              <br />
              <button
                className="btn-grad"
                onClick={() =>
                  openWhatsApp(
                    "https://wa.me/524490000000?text=Hola,%20acabo%20de%20llenar%20el%20formulario%20de%20Novali",
                  )
                }
              >
                Escribir por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

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
              onClick={() => openWhatsApp("https://wa.me/524490000000")}
            >
              Preguntar por WhatsApp
            </button>
          </div>
          <div className="faq-list">
            <div className="faq-item">
              <button className="faq-q" type="button">
                ¿Cuánto cuesta una página con chatbot IA?{" "}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">
                El desarrollo inicial (setup) va desde $8,000 MXN dependiendo
                del giro y complejidad. La mensualidad que incluye hosting,
                mantenimiento y el agente de IA cuesta desde $1,000 MXN al mes.
                Sin contratos de permanencia.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q" type="button">
                ¿En cuánto tiempo está lista mi página?{" "}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">
                El tiempo promedio de entrega es de 5 a 7 días hábiles desde que
                apruebas la propuesta y nos envías la información de tu negocio.
                Proyectos más complejos pueden tomar hasta 2 semanas.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q" type="button">
                ¿El chatbot realmente entiende preguntas?{" "}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">
                Sí. Usamos modelos de inteligencia artificial avanzados (Claude
                o equivalente) que entendemos lenguaje natural. Lo entrenamos
                con la información de tu negocio: servicios, precios, horarios,
                ubicación y más.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q" type="button">
                ¿Qué pasa si quiero cancelar?{" "}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">
                Sin problema. No hay contratos de permanencia. Si decides
                cancelar la mensualidad, tu página permanece activa 30 días más.
                Puedes llevarte el código de tu página sin costo adicional.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q" type="button">
                ¿Necesito saber de tecnología para administrar mi página?{" "}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">
                Para nada. Nosotros nos encargamos de todo. Si necesitas
                actualizar algo (precios, horarios, fotos), nos escribes por
                WhatsApp y lo hacemos ese mismo día. El soporte está incluido en
                tu mensualidad.
              </div>
            </div>
            <div className="faq-item">
              <button className="faq-q" type="button">
                ¿El chatbot puede agendar citas en mi Google Calendar?{" "}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">
                Sí, esa integración está disponible en el plan Estándar en
                adelante. El asistente verifica disponibilidad en tiempo real,
                agenda la cita y envía confirmación automática al cliente.
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="logo" style={{ fontSize: "1.2rem" }}>
          novali
        </div>
        <div className="f-links">
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
          <a href="#contacto">Contacto</a>
          <a href="https://wa.me/524490000000" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
        <div className="f-copy">© 2025 Novali. Aguascalientes, México.</div>
      </footer>
    </>
  );
}

export default App;

// FAQ
document.querySelectorAll(".faq-q").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains("open");
    document
      .querySelectorAll(".faq-item")
      .forEach((i) => i.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

// Form submit
function submitForm() {
  const nombre = document.getElementById("f-nombre").value.trim();
  const tel = document.getElementById("f-tel").value.trim();
  const negocio = document.getElementById("f-negocio").value.trim();

  if (!nombre || !tel || !negocio) {
    alert(
      "Por favor llena los campos obligatorios: nombre, WhatsApp y nombre del negocio.",
    );
    return;
  }

  // Here you'd POST to your backend / webhook
  // fetch('/api/leads', { method:'POST', body: JSON.stringify({...}) })

  document.getElementById("leadForm").style.display = "none";
  document.getElementById("formSuccess").style.display = "block";

  // Scroll to success
  document
    .getElementById("formSuccess")
    .scrollIntoView({ behavior: "smooth", block: "center" });
}

// Animate on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

document
  .querySelectorAll(".svc-card, .proof-card, .test-card, .how-step")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity .6s ease, transform .6s ease";
    observer.observe(el);
  });
