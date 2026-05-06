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
        est&aacute;n creciendo
      </h2>
      <div className="test-grid">

        <div className="test-card">
          <div className="stars">★★★★★</div>
          <p className="test-quote">
            &ldquo;Ya no pierdo pacientes por no contestar a tiempo.&rdquo;
          </p>
          <p>
            Ten&iacute;a pacientes que me escrib&iacute;an a las 10 de la noche preguntando
            por cita y como no contestaba hasta el d&iacute;a siguiente, ya hab&iacute;an
            ido con otro dentista. Eso me pas&oacute; m&aacute;s veces de las que quisiera
            contar. Desde que tenemos el chatbot, responde en segundos, les da
            mis horarios disponibles y confirma la cita sin que yo haga nada.
          </p>
          <div className="t-author">
            <div className="t-av">M</div>
            <div>
              <div className="t-name">Dra. Mart&iacute;nez</div>
              <div className="t-role">Consultorio dental &middot; Aguascalientes</div>
            </div>
          </div>
        </div>

        <div className="test-card">
          <div className="stars">★★★★★</div>
          <p className="test-quote">
            &ldquo;Me llevaba dos horas al d&iacute;a solo el WhatsApp.&rdquo;
          </p>
          <p>
            Antes me llevaba f&aacute;cil dos horas al d&iacute;a solo contestando
            WhatsApp: que si hay lugar, que a qu&eacute; hora vienes, que ya no hay.
            Eso sin contar los que se quedaban sin respuesta y se iban a otra
            barber&iacute;a. Ahora la p&aacute;gina lo hace todo sola: el cliente agenda,
            le llega confirmaci&oacute;n autom&aacute;tica y yo me entero cuando ya
            tiene cita. Ya no cargo el tel&eacute;fono como si fuera mi trabajo.
          </p>
          <div className="t-author">
            <div className="t-av">R</div>
            <div>
              <div className="t-name">Ricardo Flores</div>
              <div className="t-role">Barber&iacute;a RFB &middot; Aguascalientes</div>
            </div>
          </div>
        </div>

        <div className="test-card">
          <div className="stars">★★★★★</div>
          <p className="test-quote">
            &ldquo;En el segundo mes ya hab&iacute;a recuperado la inversi&oacute;n.&rdquo;
          </p>
          <p>
            Honestamente pens&eacute; que era caro para lo que yo necesitaba &mdash;
            tengo un negocio chico y no soy de tecnolog&iacute;a. Pero en el segundo
            mes ya hab&iacute;a recuperado la inversi&oacute;n solo con clientas que
            llegaron por la p&aacute;gina y preguntaron por el chatbot. Lo que m&aacute;s
            me sorprendi&oacute; es que el bot les explica los servicios, da precios
            y agenda sin que yo est&eacute; disponible. Nunca pens&eacute; que una
            p&aacute;gina web pudiera pagar su propia mensualidad.
          </p>
          <div className="t-author">
            <div className="t-av">L</div>
            <div>
              <div className="t-name">Laura Vega</div>
              <div className="t-role">Spa &amp; Est&eacute;tica &middot; Aguascalientes</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Testimonios;
