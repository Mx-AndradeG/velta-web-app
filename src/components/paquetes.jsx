import { scrollToSection } from "../utils/ui";

const packages = [
  {
    name: "Vitrina",
    price: "Desde $8,000 MXN",
    description:
      "Presencia profesional que genera confianza de inmediato. Tu negocio visible, serio y listo para recibir clientes.",
    features: [
      "Tu negocio visible en Google desde el primer día",
      "Diseño que transmite confianza desde el primer clic",
      "Clientes que te buscan te encuentran y te contactan",
      "Botón directo a WhatsApp para cerrar en el momento",
      "Publicado y funcionando en menos de 7 días",
    ],
    note: "Para empezar rápido y bien",
    badge: "Para empezar",
    cta: "Quiero mi vitrina digital",
  },
  {
    name: "Asistente",
    price: "Desde $9,000 MXN + $1,000/mes",
    priceNote: "Menos que contratar a alguien part-time un solo mes",
    description:
      "Atiende, agenda y captura clientes sin descansar — incluso cuando tú no estás.",
    features: [
      "Tu negocio responde consultas a cualquier hora, incluso a las 3 am",
      "Cada prospecto deja su nombre y teléfono, automático",
      "Las citas llegan confirmadas a tu agenda — tú solo las atiende",
      "Nunca más pierdes un cliente por no contestar a tiempo",
      "Actualizamos precios y horarios con un mensaje tuyo",
    ],
    note: "El más elegido por consultorios y barberías",
    featured: true,
    badge: "El más elegido",
    cta: "Quiero mi asistente digital",
  },
  {
    name: "Despacho",
    price: "Cotización personalizada",
    description:
      "Toda tu operación de clientes en piloto automático, sin que contrates a nadie más.",
    features: [
      "Todo lo del plan Asistente incluido",
      "Citas agendadas directo en tu Google Calendar, sin intermediarios",
      "Tus clientes también reciben respuesta por WhatsApp Business",
      "Flujos de atención diseñados para tu giro específico",
      "Soporte prioritario — cualquier ajuste ese mismo día",
    ],
    note: "Para negocios con más volumen de clientes",
    badge: "Operación completa",
    cta: "Quiero una cotización",
  },
];

const anchors = [
  {
    text: (
      <>
        <strong>Una recepcionista en Aguascalientes cuesta $7,000&ndash;$10,000 al mes.</strong>{" "}
        Nuestro plan Asistente cuesta $1,000.
      </>
    ),
  },
  {
    text: (
      <>
        <strong>Una agencia de redes te cobra $3,000&ndash;$8,000/mes para que te vean.</strong>{" "}
        Nosotros cobramos $1,000 para que te contraten.
      </>
    ),
  },
  {
    text: (
      <>
        <strong>Una agencia web tradicional tarda 3 meses y cobra el doble.</strong>{" "}
        Nosotros lo ponemos a funcionar en 7 d&iacute;as.
      </>
    ),
  },
  {
    text: (
      <>
        <strong>Cada semana sin p&aacute;gina son clientes que no te encuentran.</strong>{" "}
        Eso no sale en ning&uacute;n recibo, pero cuesta.
      </>
    ),
  },
];

function Paquetes() {
  return (
    <section className="section packages-section" id="paquetes">
      <div className="packages-header">
        <span className="sec-tag">Planes</span>
        <h2 className="sec-title">
          Elige el nivel de
          <br />
          automatizaci&oacute;n para tu negocio
        </h2>
        <p className="sec-sub">
          Antes de ver los n&uacute;meros, considera lo que probablemente ya est&aacute;s pagando.
        </p>
      </div>

      <div className="packages-anchors">
        {anchors.map((anchor, i) => (
          <div className="packages-anchor" key={i}>
            {anchor.text}
          </div>
        ))}
      </div>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <article
            key={pkg.name}
            className={`package-card${pkg.featured ? " package-card-featured" : ""}`}
          >
            <div className="package-top">
              <span className="package-badge">{pkg.badge}</span>
              <h3>{pkg.name}</h3>
              <div className="package-price">{pkg.price}</div>
              {pkg.priceNote && (
                <div className="package-price-note">{pkg.priceNote}</div>
              )}
              <p>{pkg.description}</p>
            </div>

            <div className="package-divider" />

            <ul className="package-features">
              {pkg.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <div className="package-footer">
              <span className="package-note">{pkg.note}</span>
              <a
                className="btn-ghost package-cta"
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contacto");
                }}
              >
                {pkg.cta}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Paquetes;
