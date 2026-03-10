// Pie de página con enlaces secundarios y datos básicos de marca.
function Footer() {
  return (
    <footer>
      <div className="logo" style={{ fontSize: "1.2rem" }}>
        novali
      </div>
      <div className="f-links">
        <a href="#">Privacidad</a>
        <a href="#">Términos</a>
        <a href="#contacto">Contacto</a>
        <a href="https://wa.me/524490000000" target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </div>
      <div className="f-copy">© 2025 Novali. Aguascalientes, México.</div>
    </footer>
  );
}

export default Footer;
