import { scrollToSection } from "../utils/ui";

function Principal() {
  return (
    <>
      <section className="hero">
        <div className="hero-orb orb1"></div>
        <div className="hero-orb orb2"></div>
        <div className="hero-orb orb3"></div>

        <div className="hero-badge">
          <span className="badge-dot"></span>
          P&aacute;ginas web con IA &middot; Aguascalientes
        </div>

        <h1>
          &iquest;Cu&aacute;ntos clientes perdiste anoche
          <br />
          <span className="grad">mientras dorm&iacute;as?</span>
        </h1>

        <p className="hero-sub">
          Cada mensaje sin responder en WhatsApp es un cliente que ya encontr&oacute;
          a alguien m&aacute;s. Con logikstudio, tu negocio responde, cotiza y agenda
          citas las 24 horas &mdash; sin que toques nada.
        </p>

        <div className="hero-perks">
          <span className="hero-perk">
            <span className="hero-perk-check">✓</span>
            Responde en segundos, incluso a las 3 am
          </span>
          <span className="hero-perk">
            <span className="hero-perk-check">✓</span>
            Citas agendadas solas en Google Calendar
          </span>
          <span className="hero-perk">
            <span className="hero-perk-check">✓</span>
            Lista en 7 d&iacute;as, sin tecnicismos
          </span>
        </div>

        <div className="hero-actions">
          <button
            className="btn-grad"
            onClick={() => scrollToSection("contacto")}
          >
            Ver mi demo gratis ahora
          </button>
          <button
            className="btn-ghost"
            onClick={() => scrollToSection("proceso")}
          >
            C&oacute;mo funciona
          </button>
        </div>

        <div className="hero-mockup">
          <div className="mockup-browser">
            <div className="browser-bar">
              <div className="browser-dot d1"></div>
              <div className="browser-dot d2"></div>
              <div className="browser-dot d3"></div>
              <div className="browser-url">tu-negocio.com</div>
              <div className="browser-status">
                <span className="status-dot"></span>
                En l&iacute;nea
              </div>
            </div>
            <div className="browser-content">
              <div className="mock-block">
                <div className="mock-line grad-line"></div>
                <div className="mock-line" style={{ width: "85%" }}></div>
                <div className="mock-line short"></div>
                <div className="mock-cta-wrap">
                  <div className="mock-line mock-cta-line"></div>
                </div>
              </div>
              <div className="mock-block mock-chat-panel">
                <div className="mock-chat-title">ASISTENTE IA</div>
                <div className="mock-chat-bubble bubble-1">
                  Hola. &iquest;En qu&eacute; te puedo ayudar?
                </div>
                <div className="mock-chat-bubble user bubble-2">
                  Quiero agendar una cita
                </div>
                <div className="mock-chat-bubble bubble-3">
                  Claro. &iquest;Qu&eacute; d&iacute;a te viene mejor?
                </div>
                <div className="mock-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="logos-strip" style={{ position: "relative", zIndex: 1 }}>
        <span className="logos-label">Negocios que ya conf&iacute;an en nosotros</span>
        <div className="logos-row">
          <span className="logo-item">DentPlus</span>
          <span className="logo-item">Barber&amp;Co</span>
          <span className="logo-item">FoodLab</span>
          <span className="logo-item">LexGroup</span>
          <span className="logo-item">StyleRoom</span>
        </div>
      </div>
    </>
  );
}

export default Principal;
