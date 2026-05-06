// Seccion que explica el proceso de trabajo y algunas metricas comerciales.
function Proceso() {
  return (
    <>
      <section className="section how-section" id="proceso">
        <span className="sec-tag">El proceso</span>
        <h2 className="sec-title">
          De cero a tu p&aacute;gina
          <br />
          en menos de 7 d&iacute;as
        </h2>
        <p className="sec-sub">
          Sin reuniones interminables. Sin formularios complicados. As&iacute; de
          directo.
        </p>
        <div className="how-grid">
          <div className="how-step">
            <div className="step-num">01</div>
            <h4>Platicamos 30 min</h4>
            <p>
              Nos cuentas sobre tu negocio, tus clientes y qu&eacute; necesitas. Sin
              costo, sin compromiso.
            </p>
          </div>
          <div className="how-step">
            <div className="step-num">02</div>
            <h4>Dise&ntilde;amos tu propuesta</h4>
            <p>
              En 24 horas te enviamos boceto del dise&ntilde;o y propuesta de
              contenido personalizada para tu giro.
            </p>
          </div>
          <div className="how-step">
            <div className="step-num">03</div>
            <h4>Construimos y configuramos</h4>
            <p>
              Desarrollamos tu p&aacute;gina, entrenamos al agente de IA con la info
              de tu negocio y hacemos pruebas.
            </p>
          </div>
          <div className="how-step">
            <div className="step-num">04</div>
            <h4>Publicamos y listo</h4>
            <p>
              Tu p&aacute;gina sale en vivo con dominio, hosting y chatbot
              funcionando. T&uacute; solo das el visto bueno.
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
            <div className="proof-num">40+</div>
            <div className="proof-label">
              negocios locales que ya capturan clientes mientras duermen
            </div>
          </div>
          <div className="proof-card">
            <div className="proof-num">24/7</div>
            <div className="proof-label">
              tu chatbot atiende consultas aunque t&uacute; est&eacute;s apagado
            </div>
          </div>
          <div className="proof-card">
            <div className="proof-num">7 d&iacute;as</div>
            <div className="proof-label">
              y tu negocio ya est&aacute; capturando clientes
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Proceso;
