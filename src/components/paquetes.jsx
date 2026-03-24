const packages = [
  {
    name: "Plan Basico",
    price: "Desde $8,000 MXN",
    description:
      "La base ideal para negocios que necesitan presencia profesional y captacion clara.",
    features: [
      "Landing page personalizada",
      "Diseno responsive y optimizado",
      "Formulario de contacto",
      "Boton directo a WhatsApp",
      "Hosting y soporte inicial",
    ],
    note: "Ideal para empezar rapido",
  },
  {
    name: "Plan IA",
    price: "Desde $9,000 MXN + $1,000/mes",
    description:
      "Combina una landing comercial con un agente que responde, califica y captura leads.",
    features: [
      "Todo lo del Plan Basico",
      "Agente de IA entrenado con tu negocio",
      "Captura automatica de prospectos",
      "Atencion 24/7 en tu sitio",
      "Ajustes y soporte mensual",
    ],
    note: "El paquete mas solicitado",
    featured: true,
  },
  {
    name: "Plan IA Plus",
    price: "Cotizacion personalizada",
    description:
      "La opcion para negocios que quieren automatizar atencion, agenda y seguimiento.",
    features: [
      "Todo lo del Plan IA",
      "Agendado automatico con calendario",
      "Integracion avanzada con WhatsApp",
      "Flujos y prompts personalizados",
      "Soporte prioritario",
    ],
    note: "Pensado para operaciones con mas volumen",
  },
];

function Paquetes() {
  return (
    <section className="section packages-section" id="paquetes">
      <div className="packages-header">
        <span className="sec-tag">Paquetes</span>
        <h2 className="sec-title">
          Elige el nivel de
          <br />
          automatizacion para tu negocio
        </h2>
        <p className="sec-sub">
          Tres formas de lanzar tu presencia digital con una estructura clara,
          sin salirte del estilo y soporte que ya ofrece logikstudio.
        </p>
      </div>

      <div className="packages-grid">
        {packages.map((pkg) => (
          <article
            key={pkg.name}
            className={`package-card${pkg.featured ? " package-card-featured" : ""}`}
          >
            <div className="package-top">
              <span className="package-badge">
                {pkg.featured ? "Recomendado" : "Paquete"}
              </span>
              <h3>{pkg.name}</h3>
              <div className="package-price">{pkg.price}</div>
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
              <a className="btn-ghost package-cta" href="#contacto">
                Solicitar este plan
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Paquetes;
