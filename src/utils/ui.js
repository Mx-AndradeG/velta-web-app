export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function openWhatsApp(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}
