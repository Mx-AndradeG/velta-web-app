// Sección de contacto con formulario de captación y estado visual de éxito.
function Contacto() {
  return (
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
              <div className="perk-icon">✓</div> Diseño 100% personalizado para
              tu giro
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
  );
}

export default Contacto;
