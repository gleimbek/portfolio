// Scroll simple animation (reveal effect)

const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 500;

    if (top > offset) {
      sec.style.opacity = "1";
      sec.style.transform = "translateY(0)";
      sec.style.transition = "0.6s ease";
    }
  });
});
