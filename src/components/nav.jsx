import { scrollToSection } from "../utils/ui";

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
        Quiero mi pagina
      </button>
    </nav>
  );
}

export default Nav;

if (typeof window !== "undefined") {
  window.addEventListener("scroll", () => {
    document
      .getElementById("navbar")
      ?.classList.toggle("scrolled", window.scrollY > 50);
  });
}
