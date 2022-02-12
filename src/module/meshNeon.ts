import "../styles/meshNeon.scss";
import SimplexNoise from "simplex-noise";

const meshNeon = () => {
  const simplex = new SimplexNoise("seed");
  let canvas = document.querySelector<HTMLCanvasElement>(".meshNeon");
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let hexagons: Hexagon[] = [];
  let sizeH = Math.max(height, width) / 40;
  let gap = 5;
  let speed = 0.001;
  let t = Math.round(Math.random() * 1000);
  let maxCountW = Math.round(width / (sizeH + gap));
  let maxCountH = Math.round(height / (sizeH + gap));
  let widthH = sizeH + (sizeH - gap) * Math.cos(Math.PI / 6) + 1;
  let heightH = sizeH + (sizeH - gap) * Math.sin(Math.PI / 6) + 1;
  let color = "rgba(1, 220, 128,";

  if (width < 980) {
    sizeH = Math.max(height, width) / 30;
  }

  class Hexagon {
    x: number;
    y: number;
    color: string;
    drawM: boolean = false;
    alpha: number = 1;
    middleX: number;
    middleY: number;
    constructor(x: number, y: number, color: string) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.middleX =
        this.x -
        (sizeH - gap) -
        (sizeH - gap) * Math.sin(Math.PI / 6) +
        widthH / 2;
      this.middleY = this.y - (sizeH - gap) + heightH / 2;
    }
    draw() {
      let wP = sizeH - gap;
      let p1x = this.x - wP;
      let p1y = this.y - wP;

      let p2x = p1x + wP;
      let p2y = p1y + 0;

      let p3x = p2x + wP * Math.sin(Math.PI / 6);
      let p3y = p2y + wP * Math.cos(Math.PI / 6);

      let p4x = p3x - wP * Math.sin(Math.PI / 6);
      let p4y = p3y + wP * Math.cos(Math.PI / 6);

      let p5x = p4x - wP;
      let p5y = p4y + 0;

      let p6x = p5x - wP * Math.sin(Math.PI / 6);
      let p6y = p5y - wP * Math.cos(Math.PI / 6);

      let p7x = p6x + wP * Math.sin(Math.PI / 6);
      let p7y = p6y - wP * Math.cos(Math.PI / 6);
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.moveTo(p1x, p1y);
      ctx.lineTo(p2x, p2y);
      ctx.lineTo(p3x, p3y);
      ctx.lineTo(p4x, p4y);
      ctx.lineTo(p5x, p5y);
      ctx.lineTo(p6x, p6y);
      ctx.lineTo(p7x, p7y);
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.strokeStyle = "#000";
      ctx.closePath();
    }

    update(color: string) {
      if (!this.drawM) {
        this.color = color;
        this.draw();
      }
    }

    updateDraw() {
      this.color = `${color}${this.alpha})`;
      this.alpha -= 0.01;
      if (this.alpha <= 0) {
        this.drawM = false;
        this.alpha = 1;
      }
      this.draw();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    hexagons.forEach((hex) => {
      if (!hex.drawM) {
        hex.draw();
      } else {
        hex.updateDraw();
      }
    });
  }

  function init() {
    for (let x = 0; x < maxCountW; x++) {
      for (let y = 0; y < maxCountH; y++) {
        hexagons.push(
          new Hexagon(
            x * (sizeH * 2) + gap,
            y * (sizeH * 2) + gap,
            `${color}${simplex.noise2D(x / 6 + t, y / 6 + t) + 0.4})`
          )
        );
      }
    }
  }

  function loop() {
    let i = 0;
    for (let x = 0; x < maxCountW; x++) {
      for (let y = 0; y < maxCountH; y++) {
        hexagons[i].update(`${color}${simplex.noise2D(x / 6 + t, y / 6 + t)})`);
        i++;
      }
    }
    draw();
    t += speed;
    requestAnimationFrame(loop);
  }

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    maxCountW = Math.round(width / (sizeH + gap));
    maxCountH = Math.round(height / (sizeH + gap));
    sizeH = Math.max(height, width) / 40;
    gap = 5;
    hexagons = [];
    widthH = sizeH + (sizeH - gap) * Math.cos(Math.PI / 6) + 1;
    heightH = sizeH + (sizeH - gap) * Math.sin(Math.PI / 6) + 1;
    if (width < 980) {
      sizeH = Math.max(height, width) / 30;
    }
    init();
  });

  document
    .querySelector<HTMLElement>(".s1")
    .addEventListener("mousemove", (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const hexagon = hexagons.find(
        (hex) =>
          x < hex.middleX + widthH / 2 &&
          x > hex.middleX - widthH / 2 &&
          y < hex.middleY + heightH / 2 &&
          y > hex.middleY - heightH / 2
      );
      if (hexagon) {
        hexagon.drawM = true;
      }
    });

  document
    .querySelector<HTMLElement>(".s1")
    .addEventListener("touchmove", (event) => {
      const y = event.changedTouches[0].clientY;
      const x = event.changedTouches[0].clientX;
      const hexagon = hexagons.find(
        (hex) =>
          x < hex.middleX + widthH / 2 &&
          x > hex.middleX - widthH / 2 &&
          y < hex.middleY + heightH / 2 &&
          y > hex.middleY - heightH / 2
      );
      if (hexagon) {
        hexagon.drawM = true;
      }
    });

  init();
  loop();
};

export default meshNeon;
