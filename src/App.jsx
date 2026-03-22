import { useEffect } from "react";
import "./css/App.css";
import Nav from "./components/nav";
import Principal from "./components/principal";
import Servicios from "./components/servicios";
import Proceso from "./components/proceso";
import Testimonios from "./components/testimonios";
import Faq from "./components/faq";
import Footer from "./components/footer";
import Contacto from "./components/contacto";
import VeltaChat from "./VeltaChat";

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function openWhatsApp(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

function App() {
  useEffect(() => {
    // Scroll listener para el navbar
    const handleScroll = () => {
      document
        .getElementById("navbar")
        ?.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    // IntersectionObserver para animaciones al entrar al viewport
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

    document
      .querySelectorAll(".svc-card, .proof-card, .test-card, .how-step")
      .forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
        el.style.transition = "opacity .6s ease, transform .6s ease";
        observer.observe(el);
      });

    // Limpieza al desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

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
      <VeltaChat />
    </>
  );
}

export default App;
