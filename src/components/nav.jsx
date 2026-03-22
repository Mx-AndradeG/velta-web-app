// Barra de navegación fija con enlaces a las secciones principales.
function Nav() {
  return (
    <nav id="navbar">
      <div className="logo">Velta</div>
      <ul className="nav-links">
        <li>
          <a href="#servicios">Servicios</a>
        </li>
        <li>
          <a href="#proceso">Proceso</a>
        </li>
        <li>
          <a href="#testimonios">Casos</a>
        </li>
        <li>
          <a href="#faq">FAQ</a>
        </li>
      </ul>
      <button className="nav-cta" onClick={() => scrollToSection("contacto")}>
        Quiero mi página
      </button>
    </nav>
  );
}

export default Nav;

// Cambia el estilo del nav cuando el usuario se desplaza por la página.
if (typeof window !== "undefined") {
  window.addEventListener("scroll", () => {
    document
      .getElementById("navbar")
      .classList.toggle("scrolled", window.scrollY > 50);
  });
}
