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
import Paquetes from "./components/paquetes";
import VeltaChat from "./VeltaChat";

function App() {
  useEffect(() => {
    const handleScroll = () => {
      document
        .getElementById("navbar")
        ?.classList.toggle("scrolled", window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(
        ".svc-card, .proof-card, .test-card, .how-step, .package-card",
      )
      .forEach((element) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(24px)";
        element.style.transition = "opacity .6s ease, transform .6s ease";
        observer.observe(element);
      });

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
      <Paquetes />
      <Contacto />
      <Faq />
      <Footer />
      <VeltaChat />
    </>
  );
}

export default App;
