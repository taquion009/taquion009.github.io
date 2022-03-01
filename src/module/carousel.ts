import "../styles/carousel.scss";

const carousel = () => {
  let carousel = document.querySelector<HTMLElement>(".carousel");

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

  const move = (el: HTMLElement, i: number, dir: number) => {
    i += 1 + dir;
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
  };

  const updateCarousel = (dir: number) => {
    cards.forEach((el, i) => {
      move(el, i, dir);
    });

    buttomLeft.style.display = active == 1 ? "none" : "block";
    buttomRight.style.display = active == CARDS ? "none" : "block";
  };

  updateCarousel(0);

  buttomLeft.addEventListener("click", () => {
    active--;
    updateCarousel(0);
  });

  buttomRight.addEventListener("click", () => {
    active++;
    updateCarousel(0);
  });
  let start = 0;
  let suma = 0;

  carousel.addEventListener(
    "touchstart",
    (e) => {
      start = e.touches[0].clientX;
    },
    {
      passive: false,
    }
  );

  window.addEventListener("touchend", (e) => {
    active = Math.round(active + suma * -1);
    if (active > CARDS) {
      active = CARDS;
    }

    if (active < 1) {
      active = 1;
    }

    updateCarousel(0);
    start = 0;
    suma = 0;
  });

  window.addEventListener("touchmove", (e) => {
    if (start) {
      let offset = e.touches[0].clientX - start;
      suma += offset / carousel.clientWidth;
      updateCarousel(suma);

      start = e.touches[0].clientX;
    }
  });

  window.addEventListener("mousemove", (e) => {
    if (start) {
      let offset = e.clientX - start;
      suma += offset / carousel.clientWidth;
      updateCarousel(suma);

      start = e.clientX;
    }
  });

  carousel.addEventListener("mousedown", (e) => {
    start = e.clientX;
  });

  window.addEventListener("mouseup", (e) => {
    active = Math.round(active + suma * -1);
    if (active > CARDS) {
      active = CARDS;
    }

    if (active < 1) {
      active = 1;
    }

    updateCarousel(0);
    start = 0;
    suma = 0;
  });
};

export default carousel;
