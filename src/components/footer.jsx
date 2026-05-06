// Pie de página con enlaces secundarios y datos básicos de marca.
function Footer() {
  return (
    <footer>
      <div className="logo" style={{ fontSize: "1.2rem" }}>
        logikstudio
      </div>
      <div className="f-links">
        <a href="#">Privacidad</a>
        <a href="#">Términos</a>
        <a href="#contacto">Contacto</a>
        <a href="https://wa.me/4422709543" target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </div>
      <div className="f-copy">© 2025 logikstudio. Aguascalientes, México.</div>
    </footer>
  );
}

export default Footer;
