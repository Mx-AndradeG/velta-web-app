function Servicios() {
  return (
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
            Un asistente que responde preguntas frecuentes, captura el nombre y
            teléfono del cliente y agenda citas automáticamente.
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
            Actualización de contenido, hosting incluido, soporte por WhatsApp.
            Tu página siempre funcionando sin que te preocupes.
          </p>
          <span className="svc-price">Incluido en mensualidad</span>
        </div>
      </div>
    </section>
  );
}

export default Servicios;
