function Principal() {
  return (
    <>
      <section className="hero">
        <div className="hero-orb orb1"></div>
        <div className="hero-orb orb2"></div>

        <div className="hero-badge">
          <span className="badge-dot"></span>
          Páginas web con Inteligencia Artificial · Aguascalientes
        </div>

        <h1>
          Tu negocio merece una
          <br />
          <span className="grad">página que trabaje</span>
          <br />
          mientras tú descansas.
        </h1>

        <p className="hero-sub">
          Creamos landing pages con agente de IA integrado que responde
          preguntas, agenda citas y captura clientes, las 24 horas del día.
        </p>

        <div className="hero-actions">
          <button
            className="btn-grad"
            onClick={() => scrollToSection("contacto")}
          >
            Quiero mi página gratis {"->"}
          </button>
          <button
            className="btn-ghost"
            onClick={() => scrollToSection("servicios")}
          >
            Ver servicios
          </button>
        </div>

        <div className="hero-mockup">
          <div className="mockup-browser">
            <div className="browser-bar">
              <div className="browser-dot d1"></div>
              <div className="browser-dot d2"></div>
              <div className="browser-dot d3"></div>
              <div className="browser-url">tu-negocio.com</div>
            </div>
            <div className="browser-content">
              <div className="mock-block">
                <div className="mock-line grad-line"></div>
                <div className="mock-line" style={{ width: "85%" }}></div>
                <div className="mock-line short"></div>
                <div style={{ marginTop: "1rem" }}>
                  <div
                    className="mock-line"
                    style={{
                      width: "45%",
                      height: "32px",
                      borderRadius: "6px",
                      background: "linear-gradient(90deg,#6366F1,#22D3EE)",
                    }}
                  ></div>
                </div>
              </div>
              <div
                className="mock-block"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".5rem",
                }}
              >
                <div
                  style={{
                    fontSize: ".65rem",
                    color: "#6366F1",
                    marginBottom: ".3rem",
                    letterSpacing: ".1em",
                  }}
                >
                  ASISTENTE IA
                </div>
                <div className="mock-chat-bubble">
                  ¡Hola! ¿En qué te puedo ayudar? 👋
                </div>
                <div className="mock-chat-bubble user">
                  Quiero agendar una cita
                </div>
                <div className="mock-chat-bubble">
                  ¡Claro! ¿Qué día te viene mejor?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="logos-strip" style={{ position: "relative", zIndex: 1 }}>
        <span className="logos-label">Negocios que ya confían en nosotros</span>
        <div className="logos-row">
          <span className="logo-item">DentPlus</span>
          <span className="logo-item">Barber&Co</span>
          <span className="logo-item">FoodLab</span>
          <span className="logo-item">LexGroup</span>
          <span className="logo-item">StyleRoom</span>
        </div>
      </div>
    </>
  );
}

export default Principal;
