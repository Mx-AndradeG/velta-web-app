// Seccion que presenta los servicios principales en formato de tarjetas.
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
        Sin tecnicismos. Sin contratos eternos. T&uacute; te enfocas en tu
        negocio, nosotros en traerte clientes.
      </p>
      <div className="services-grid">
        <div className="svc-card">
          <div className="svc-icon">WEB</div>
          <h3>Landing Page Profesional</h3>
          <p>
            Dise&ntilde;o &uacute;nico para tu giro. Optimizada para m&oacute;vil,
            r&aacute;pida, con secciones de servicios, testimonios y llamada a la
            acci&oacute;n.
          </p>
          <span className="svc-price">Desde $8,000 MXN</span>
        </div>
        <div className="svc-card">
          <div className="svc-icon">IA</div>
          <h3>Agente de IA Integrado</h3>
          <p>
            Un asistente que responde preguntas frecuentes, captura el nombre y
            tel&eacute;fono del cliente y agenda citas autom&aacute;ticamente.
          </p>
          <span className="svc-price">Desde $1,000 MXN/mes</span>
        </div>
        <div className="svc-card">
          <div className="svc-icon">POS</div>
          <h3>Sistema POS para tu Negocio</h3>
          <p>
            Control de ventas, inventario y reportes. Compatible con cualquier
            giro. F&aacute;cil de usar desde el primer d&iacute;a.
          </p>
          <span className="svc-price">Cotizaci&oacute;n personalizada</span>
        </div>
        <div className="svc-card">
          <div className="svc-icon">WA</div>
          <h3>Integraci&oacute;n con WhatsApp</h3>
          <p>
            El agente de IA tambi&eacute;n puede responder en tu WhatsApp Business.
            Nunca m&aacute;s pierdas un cliente por no contestar.
          </p>
          <span className="svc-price">Add-on disponible</span>
        </div>
        <div className="svc-card">
          <div className="svc-icon">CAL</div>
          <h3>Agendado Autom&aacute;tico</h3>
          <p>
            El chatbot conecta con Google Calendar y agenda citas sin que t&uacute;
            tengas que hacer nada. Confirmaciones autom&aacute;ticas.
          </p>
          <span className="svc-price">Incluido en plan Est&aacute;ndar</span>
        </div>
        <div className="svc-card">
          <div className="svc-icon">SOS</div>
          <h3>Mantenimiento y Soporte</h3>
          <p>
            Actualizaci&oacute;n de contenido, hosting incluido, soporte por
            WhatsApp. Tu p&aacute;gina siempre funcionando sin que te preocupes.
          </p>
          <span className="svc-price">Incluido en mensualidad</span>
        </div>
      </div>
    </section>
  );
}

export default Servicios;
