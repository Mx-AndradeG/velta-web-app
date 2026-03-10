function Testimonios() {
  return (
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
              <div className="t-role">Consultorio dental · Aguascalientes</div>
            </div>
          </div>
        </div>
        <div className="test-card">
          <div className="stars">★★★★★</div>
          <p>
            "Mi barbería se llenó en el primer mes. La página se ve muy
            profesional y el sistema de citas nos ahorra como 2 horas al día de
            WhatsApp."
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
            recuperé la inversión en el segundo mes con los clientes nuevos que
            llegaron por la página."
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
  );
}

export default Testimonios;
