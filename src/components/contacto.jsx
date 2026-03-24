import { useState } from "react";
import { openWhatsApp } from "../utils/ui";

const INITIAL_FORM = {
  nombre: "",
  whatsapp: "",
  negocio: "",
  giro: "",
  necesidad: "",
  mensaje: "",
  website: "",
};

const FORMSUBMIT_ENDPOINT = import.meta.env.VITE_FORMSUBMIT_ENDPOINT || "";

function Contacto() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!FORMSUBMIT_ENDPOINT) {
      setError(
        "Falta configurar VITE_FORMSUBMIT_ENDPOINT para enviar el formulario.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("nombre", formData.nombre);
      payload.append("whatsapp", formData.whatsapp);
      payload.append("negocio", formData.negocio);
      payload.append("giro", formData.giro);
      payload.append("necesidad", formData.necesidad);
      payload.append("mensaje", formData.mensaje);
      payload.append("_subject", "Nueva solicitud desde Velta Web");
      payload.append("_captcha", "false");
      payload.append("_template", "table");
      payload.append("_honey", formData.website);

      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      if (!response.ok) {
        throw new Error("No fue posible enviar la solicitud.");
      }

      setFormData(INITIAL_FORM);
      setIsSuccess(true);
    } catch {
      setError(
        "Hubo un problema al enviar tu solicitud. Intenta de nuevo en unos minutos.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

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
            Cuentanos sobre tu negocio y en menos de 24 horas te enviamos una
            propuesta personalizada sin compromiso.
          </p>
          <div className="form-perks">
            <div className="perk">
              <div className="perk-icon">OK</div> Sin contratos de permanencia
            </div>
            <div className="perk">
              <div className="perk-icon">OK</div> Diseno 100% personalizado para
              tu giro
            </div>
            <div className="perk">
              <div className="perk-icon">OK</div> Entrega en menos de 7 dias
            </div>
            <div className="perk">
              <div className="perk-icon">OK</div> Soporte por WhatsApp incluido
            </div>
            <div className="perk">
              <div className="perk-icon">OK</div> Agente de IA entrenado con tu
              negocio
            </div>
          </div>
        </div>

        <div>
          {!isSuccess ? (
            <form className="lead-form" id="leadForm" onSubmit={handleSubmit}>
              <div className="form-title">Solicita tu propuesta</div>
              <div className="form-subtitle">
                Te respondemos en menos de 24 horas por WhatsApp
              </div>

              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="form-honeypot"
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="f-nombre">Nombre *</label>
                  <input
                    type="text"
                    id="f-nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="f-tel">WhatsApp *</label>
                  <input
                    type="tel"
                    id="f-tel"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="449 000 0000"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="f-negocio">Nombre de tu negocio *</label>
                <input
                  type="text"
                  id="f-negocio"
                  name="negocio"
                  value={formData.negocio}
                  onChange={handleChange}
                  placeholder="Ej. Consultorio Dra. Garcia"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="f-giro">A que se dedica tu negocio?</label>
                <select
                  id="f-giro"
                  name="giro"
                  value={formData.giro}
                  onChange={handleChange}
                >
                  <option value="">Selecciona tu giro</option>
                  <option>Consultorio / Clinica</option>
                  <option>Salon de belleza / Barberia</option>
                  <option>Restaurante / Cafeteria</option>
                  <option>Tienda / Retail</option>
                  <option>Despacho / Consultoria</option>
                  <option>Escuela / Academia</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="f-necesidad">
                  Que necesitas principalmente?
                </label>
                <select
                  id="f-necesidad"
                  name="necesidad"
                  value={formData.necesidad}
                  onChange={handleChange}
                >
                  <option value="">Que te interesa mas?</option>
                  <option>Landing page + chatbot IA</option>
                  <option>Solo landing page</option>
                  <option>Sistema POS</option>
                  <option>Landing + POS</option>
                  <option>No se, quiero asesoria</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="f-msg">
                  Algo mas que quieras contarnos? (opcional)
                </label>
                <textarea
                  id="f-msg"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Cuentanos brevemente sobre tu negocio..."
                ></textarea>
              </div>

              {error ? <p className="form-error">{error}</p> : null}

              <button className="btn-form" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Enviando..." : "Quiero mi propuesta gratis ->"}
              </button>
              <p className="form-note">
                Tus datos estan seguros. No enviamos spam.
              </p>
            </form>
          ) : (
            <div className="form-success form-success-visible" id="formSuccess">
              <div className="success-icon">Listo</div>
              <div className="success-title">Ya recibimos tu solicitud.</div>
              <div className="success-msg">
                Te contactaremos por WhatsApp en las proximas 24 horas con tu
                propuesta personalizada.
                <br />
                <br />
                Mientras tanto, si tienes preguntas escribenos directo.
              </div>
              <br />
              <button
                className="btn-grad"
                onClick={() =>
                  openWhatsApp(
                    "https://wa.me/4492344656?text=Hola,%20acabo%20de%20llenar%20el%20formulario%20de%20Velta",
                  )
                }
              >
                Escribir por WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Contacto;
