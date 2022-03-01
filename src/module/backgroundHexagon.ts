import "../styles/backgroundHexagon.scss";
import SimplexNoise from "simplex-noise";

const backgroundHexagon = (observeCanvas: {
  view: { [key: string]: boolean };
}) => {
  const simplex = new SimplexNoise("seed");
  let canvas = document.querySelector<HTMLCanvasElement>("#background-hexagon");
  let container = document.querySelector<HTMLCanvasElement>(
    ".container-background-hexagon"
  );
  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  let sizeH = Math.max(height, width) / 30;
  let speed = 0.001;
  let t = Math.round(Math.random() * 1000);
  let color = "rgba(1, 220, 128,";

  let heightBefore = window.innerHeight;
  let widthBefore = window.innerWidth;
  let barNab = container.clientHeight - window.innerHeight;

  if (!observeCanvas.view.backgroundHexagon) {
    observeCanvas.view.backgroundHexagon = true;

    setTimeout(() => {
      observeCanvas.view.backgroundHexagon = false;
    }, 200);
  }

  class HEXAGON {
    x: number;
    y: number;
    renderer: any;
    select: boolean = false;
    alpha: number = 1;

    constructor(renderer: any, x: number, y: number) {
      this.renderer = renderer;
      this.x = x;
      this.y = y;
    }

    render(context: any) {
      context.save();
      context.translate(this.x, this.y);
      context.beginPath();
      for (var i = 0, vertices = this.renderer.vertices; i < 6; i++) {
        context[i == 0 ? "moveTo" : "lineTo"](vertices[i].x, vertices[i].y);
      }
      context.closePath();
      context.fillStyle = color + "0)";
      context.fill();
      context.restore();
    }

    update(context: any, opacity: number) {
      if (this.select) {
        return this.drawSelect(context);
      }
      context.save();
      context.translate(this.x, this.y);
      context.beginPath();

      for (var i = 0, vertices = this.renderer.vertices; i < 6; i++) {
        context[i == 0 ? "moveTo" : "lineTo"](vertices[i].x, vertices[i].y);
      }
      context.fillStyle = color + (opacity - 0.2) + ")";
      context.closePath();
      context.fill();
      context.strokeStyle = color + (opacity + 0.2) + ")";
      context.stroke();
      context.restore();
    }

    drawSelect(context: any) {
      context.save();
      context.translate(this.x, this.y);
      context.beginPath();

      for (var i = 0, vertices = this.renderer.vertices; i < 6; i++) {
        context[i == 0 ? "moveTo" : "lineTo"](vertices[i].x, vertices[i].y);
      }
      context.fillStyle = color + (this.alpha - 0.25) + ")";
      context.closePath();
      context.fill();
      context.strokeStyle = color + (this.alpha + 0.25) + ")";
      context.stroke();
      context.restore();

      this.alpha -= 0.01;
      if (this.alpha <= 0) {
        this.alpha = 1;
        this.select = false;
      }
    }
  }

  class RenderHexagon {
    RESIZE_INTERVAL: number = 30;
    RADIUS: number = sizeH;
    RATE: number = 1;
    hexagons: any[] = [];
    width: number = window.innerWidth;
    height: number = window.innerHeight;
    radius: number;
    vertices: any[] = [];
    hexWidth: number = 0;
    hexHeight: number = 0;
    context: any = ctx;
    tmpWidth: number = 0;
    tmpHeight: number = 0;
    stop: boolean = true;

    init() {
      this.setup();
      this.events();
      this.render();
    }

    setup() {
      this.createHexagons();
    }

    createHexagons() {
      this.radius = this.RADIUS * this.RATE;
      this.vertices = [];

      for (var i = 0; i < 6; i++) {
        this.vertices.push({
          x: this.radius * Math.sin((Math.PI / 3) * i),
          y: -this.radius * Math.cos((Math.PI / 3) * i),
        });
      }

      this.vertices.push(this.vertices[0]);
      this.hexWidth = this.RADIUS * Math.cos(Math.PI / 6) * 2;
      this.hexHeight = this.RADIUS * (2 - Math.sin(Math.PI / 6));

      var countX = Math.ceil(this.width / this.hexWidth),
        countY = Math.ceil(this.height / this.hexHeight),
        offsetX = -(countX * this.hexWidth - this.width) / 2,
        offsetY = -(countY * this.hexHeight - this.height) / 2;

      countX++;

      for (var y = 0; y < countY; y++) {
        for (var x = 0; x < countX; x++) {
          this.hexagons.push(
            new HEXAGON(
              this,
              offsetX +
                (x + 0.5) * this.hexWidth -
                (y % 2 == 1 ? 0 : this.hexWidth / 2),
              offsetY + (y + 0.5) * this.hexHeight
            )
          );
        }
      }
    }

    watchWindowSize() {
      this.RADIUS =
        Math.max(container.clientHeight, container.clientWidth) / 30;
      this.hexagons = [];
      this.width = container.clientWidth;
      this.height = container.clientHeight;
      this.radius = 0;
      this.vertices = [];
      this.hexWidth = 0;
      this.hexHeight = 0;
      this.context = ctx;
      this.tmpWidth = 0;
      this.tmpHeight = 0;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      this.setup();
    }

    events() {
      document
        .querySelector(".s1")
        .addEventListener("mousemove", (e: MouseEvent) => {
          let x = e.clientX;
          let y = e.clientY;
          if (!observeCanvas.view.backgroundHexagon) {
            observeCanvas.view.backgroundHexagon = true;
            observeCanvas.view.gravity = false;
          }

          let select = this.hexagons.find((hexagon) => {
            return (
              x > hexagon.x - this.hexWidth / 2 &&
              x < hexagon.x + this.hexWidth / 2 &&
              y > hexagon.y - this.hexHeight / 2 &&
              y < hexagon.y + this.hexHeight / 2
            );
          });

          if (select) {
            select.select = true;
            select.alpha = 1;
          }
        });
    }

    render() {
      this.context.clearRect(0, 0, this.width, this.height);
      for (var i = 0, count = this.hexagons.length; i < count; i++) {
        this.hexagons[i].render(this.context);
      }

      this.loop();
    }

    loop() {
      if (observeCanvas.view.backgroundHexagon) {
        let i = 0;
        this.context.clearRect(0, 0, this.width, this.height);
        for (let x = 0; x < this.hexagons.length; x++) {
          for (let y = 0; y < this.hexagons.length; y++) {
            if (this.hexagons[i]) {
              this.hexagons[i].update(
                this.context,
                simplex.noise2D(x / 6 + t, y / 6 + t)
              );
            }
            i++;
          }
        }
        t += speed;
      }

      requestAnimationFrame(() => {
        this.loop();
      });
    }
  }

  const app = new RenderHexagon();
  app.init();

  window.addEventListener("resize", () => {
    if (
      heightBefore - window.innerHeight > barNab ||
      window.innerHeight - heightBefore > barNab ||
      (heightBefore === window.innerHeight && widthBefore !== window.innerWidth)
    ) {
      app.watchWindowSize();
      heightBefore = window.innerHeight;
      widthBefore = window.innerWidth;
    }
  });
};

export default backgroundHexagon;
