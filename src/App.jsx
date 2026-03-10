import "./css/App.css";
import Nav from "./components/nav";
import Principal from "./components/principal";
import Servicios from "./components/servicios";
import Proceso from "./components/proceso";
import Testimonios from "./components/testimonios";
import Faq from "./components/faq";
import Footer from "./components/footer";
import Contacto from "./components/contacto";

// Utilidad global para desplazar la vista hasta una sección concreta.
function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// Utilidad global para abrir enlaces de WhatsApp en una nueva pestaña.
function openWhatsApp(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

// Composición principal de la landing page.
function App() {
  return (
    <>
      <Nav />
      <Principal />
      <Servicios />
      <Proceso />
      <Testimonios />
      <Contacto />
      <Faq />
      <Footer />
    </>
  );
}

export default App;

// Animación simple para mostrar elementos cuando entran al viewport.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
      }
    });
  },
  { threshold: 0.1 },
);

// Registra bloques visuales que deben aparecer con transición al hacer scroll.
document
  .querySelectorAll(".svc-card, .proof-card, .test-card, .how-step")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity .6s ease, transform .6s ease";
    observer.observe(el);
  });
