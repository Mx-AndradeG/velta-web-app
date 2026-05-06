import { useEffect, useState } from "react";
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
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("velta-theme");
    return saved !== "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
    try {
      localStorage.setItem("velta-theme", isDark ? "dark" : "light");
    } catch {}
  }, [isDark]);

  useEffect(() => {
    const root = document.documentElement;

    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      root.style.setProperty("--scroll-progress", progress.toString());
      document
        .getElementById("navbar")
        ?.classList.toggle("scrolled", window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            entry.target.style.filter = "blur(0)";
          }
        });
      },
      { threshold: 0.08 },
    );

    document
      .querySelectorAll(
        ".svc-card, .proof-card, .test-card, .how-step, .package-card",
      )
      .forEach((element, index) => {
        element.style.opacity = "0";
        element.style.transform = "translateY(24px) scale(.994)";
        element.style.filter = "blur(5px)";
        element.style.transition =
          "opacity .9s cubic-bezier(.22,1,.36,1), transform .9s cubic-bezier(.22,1,.36,1), filter .9s cubic-bezier(.22,1,.36,1)";
        element.style.transitionDelay = `${index * 50}ms`;
        element.style.willChange = "opacity, transform, filter";
        observer.observe(element);
      });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true"></div>
      <Nav isDark={isDark} setIsDark={setIsDark} />
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
