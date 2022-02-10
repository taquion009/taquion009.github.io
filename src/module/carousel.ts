import "../styles/carousel.scss";

const carousel = () => {
  let cards = document.querySelectorAll<HTMLElement>(
    ".carousel .card-container"
  );
  let buttomLeft = document.querySelector<HTMLElement>(".carousel button.left");
  let buttomRight = document.querySelector<HTMLElement>(
    ".carousel button.right"
  );
  const CARDS = cards.length;
  const MAX_VISIBILITY = 3;
  let active = Math.round(CARDS / 2);

  const updateCarousel = () => {
    cards.forEach((el, i) => {
      i += 1;
      let VARActive = i === 0 ? "active" : "";
      let VAROffset = (active - i) / 3;
      let VARAbsOffset = Math.abs(active - i) / 3;
      let VARPointerEvents = active === i ? "auto" : "none";
      let VAROpacity = Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1";
      let VARDisplay = Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block";
      el.style.setProperty("--active", VARActive);
      el.style.setProperty("--offset", String(VAROffset));
      el.style.setProperty("--abs-offset", String(VARAbsOffset));
      el.style.setProperty("--pointer-events", VARPointerEvents);
      el.style.setProperty("opacity", VAROpacity);
      el.style.setProperty("display", VARDisplay);
    });

    buttomLeft.style.display = active == 1 ? "none" : "block";
    buttomRight.style.display = active == CARDS ? "none" : "block";
  };

  updateCarousel();

  buttomLeft.addEventListener("click", () => {
    active--;
    updateCarousel();
  });

  buttomRight.addEventListener("click", () => {
    active++;
    updateCarousel();
  });
};

export default carousel;
