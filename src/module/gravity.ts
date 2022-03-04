const Matter = require("../lib/matter.js");
import { gsap } from "gsap";

const { Engine, Render, Bodies, World, MouseConstraint, Runner } = Matter;

const names = [
  "JavaScript",
  "CSS",
  "HTML",
  "React",
  "GIT",
  "NextJS",
  "NodeJS",
  "Redux",
  "TypeScript",
  "SCSS",
  "StyledComp",
  "Material ui",
  "NPM",
  "Figma",
];

const engine = Matter.Engine.create();

const getELements = (
  img: string[],
  positions: number[][],
  widthElement: number,
  size: number,
  content: string[],
  engine: Matter.Engine
): Matter.Body[] => {
  let elements = [];
  for (let i = 0; i < names.length; i++) {
    let element = Bodies.rectangle(
      positions[i][0],
      positions[i][1],
      widthElement * size,
      widthElement * size,
      {
        chamfer: { radius: [5 * size, 5 * size, 5 * size, 5 * size] },
        isStatic: true,
        render: {
          strokeStyle: "#ffffff",
          sprite: {
            xScale: size,
            yScale: size,
            texture: img[i],
          },
        },
      }
    );

    World.add(engine.world, [element]);
    elements.push(element);

    let $spanText = document.createElement("span");

    $spanText.innerHTML = content[i] || "Otro";
    $spanText.style.position = "absolute";
    $spanText.style.top = `${positions[i][1] + (widthElement * size) / 2}px`;
    $spanText.style.width = `${widthElement * size + 50}px`;
    $spanText.style.left = `${
      positions[i][0] - (50 + widthElement * size) / 2
    }px`;
    $spanText.style.padding = `${5 * size}px`;
    $spanText.style.fontSize = `${16 * size}px`;
    document
      .querySelector<HTMLElement>(".container-gravity")
      .appendChild($spanText);
  }
  return elements;
};

const createElements = (
  engine: Matter.Engine,
  w: number,
  h: number,
  images: any
) => {
  let positions: number[][] = [];

  let row = 0;
  let cantidad = 18;
  let borderH = 25;
  let space = 0;
  let borderW = 100;
  let borderTop = 64;
  let widthElement = 92.5;
  let margin = 12;
  let size =
    (w - borderW * 2 + widthElement + (h - borderH)) /
    (cantidad * widthElement);
  if (size > 1) size = 1;
  if (w < 980) {
    borderTop = 32;
    borderW = 80;
  }
  widthElement *= size;
  let y = widthElement + borderTop + borderH + margin * 2 * size;
  for (let i = 0; i < cantidad; i++) {
    let x = borderW + row * (widthElement + margin);
    if (w > 1250) {
      x += (w - 1250) / 2;
    }

    if (x > w - borderW || x > (w - 1250) / 2 + (1250 - borderW)) {
      space =
        (w - borderW * 2 + widthElement - (widthElement + margin) * row) / row;
      y += widthElement + margin * 2 * size;
      x = borderW;
      if (w > 1250) {
        x += (w - 1250) / 2;
        space = (1250 - borderW - (widthElement + margin) * row) / row;
      }
      row = 0;
    }

    positions.push([x, y]);
    row++;
  }

  let suma = 0;
  positions = positions.map((el, i) => {
    suma++;
    if (i == 0) {
      return [el[0] + suma * space, el[1]];
    } else if (positions[i - 1][0] < el[0]) {
      return [el[0] + suma * space, el[1]];
    } else {
      suma = 1;
      return [el[0] + suma * space, el[1]];
    }
  });

  let elements = getELements(
    images,
    positions,
    92.5 - margin,
    size,
    names,
    engine
  );

  const wallOptions = {
    isStatic: true,
    render: {
      visible: false,
    },
  };

  const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions);
  const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions);
  const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions);
  const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions);

  World.add(engine.world, [ground, ceiling, leftWall, rightWall]);

  return {
    elements: [...elements],
  };
};

let time = gsap
  .timeline({
    repeat: -1,
    delay: 1.2,
  })
  .to(".animation-drag", {
    duration: 0.25,
    opacity: 1,
  })
  .to(".animation-drag .mouse", {
    duration: 0.5,
    y: "+=100%",
  })
  .to(".animation-drag", {
    duration: 0.5,
    x: "150",
    y: "-150",
  })
  .to(".animation-drag .box", {
    delay: 0.25,
    duration: 0.5,
    y: "+=150",
  })
  .to(".animation-drag", {
    delay: 0.5,
    duration: 0.5,
    opacity: 0,
  })
  .pause();

function gravity(
  eventResize?: any,
  images?: string[] | HTMLImageElement,
  observeCanvas?: { view: { [key: string]: boolean } }
) {
  const sectionTag = document.querySelector<HTMLElement>(".gravity");
  if (eventResize) {
    window.removeEventListener("resize", eventResize, false);
  }
  let container = document.querySelector<HTMLCanvasElement>(
    ".container-background-hexagon"
  );
  const w = container.clientWidth;
  const h = container.clientHeight;
  const renderer = Matter.Render.create({
    element: sectionTag,
    engine: engine,
    options: {
      height: h,
      width: w,
      background: "none",
      wireframes: false,
      pixelRatio: window.devicePixelRatio,
    },
  });

  const mouseControl = MouseConstraint.create(engine, {
    element: sectionTag,
    constraint: {
      render: {
        visible: false,
      },
    },
  });

  World.add(engine.world, mouseControl);

  let elements: any = [];
  let touchStart: any = null;
  let containerGravity = document.querySelector<HTMLElement>(
    ".container-gravity-move"
  );
  if (!!images) {
    elements = createElements(engine, w, h, images);
  }

  if (!observeCanvas.view.gravity) {
    observeCanvas.view.gravity = true;

    setTimeout(() => {
      observeCanvas.view.gravity = false;
    }, 200);
  }

  const findElement = (x: number, y: number) => {
    let dif = window.screenY - containerGravity.getBoundingClientRect().top;

    y += dif;
    let element = elements.elements.find((el: Matter.Body) => {
      return (
        x > el.position.x - (el.bounds.max.x - el.bounds.min.x) / 2 &&
        x < el.position.x + (el.bounds.max.x - el.bounds.min.x) / 2 &&
        y > el.position.y - (el.bounds.max.y - el.bounds.min.y) / 2 &&
        y < el.position.y + (el.bounds.max.y - el.bounds.min.y) / 2
      );
    });

    return element;
  };

  function onTouch(evt: any) {
    evt.preventDefault();
    if (
      evt.touches.length > 1 ||
      (evt.type == "touchend" && evt.touches.length > 0)
    )
      return;

    let type = null;
    let touch = null;

    switch (evt.type) {
      case "touchstart":
        type = "mousedown";
        touch = evt.changedTouches[0];
        break;
      case "touchmove":
        type = "mousemove";
        touch = evt.changedTouches[0];
        break;
      case "touchend":
        type = "mouseup";
        touch = evt.changedTouches[0];
        break;
    }

    let newEvt = new MouseEvent(type, {
      clientX: touch.clientX,
      clientY: touch.clientY,
      bubbles: true,
      cancelable: true,
      altKey: evt.altKey,
      button: evt.button,
      buttons: evt.buttons,
      ctrlKey: evt.ctrlKey,
      metaKey: evt.metaKey,
      shiftKey: evt.shiftKey,
      relatedTarget: evt.relatedTarget,
      screenX: touch.screenX,
      screenY: touch.screenY,
      view: window,
      detail: 0,
    });
    mouseControl.mouse.element.dispatchEvent(newEvt);
  }

  const onMouse = (evt: any) => {
    evt.preventDefault();

    let newEvt = new MouseEvent(evt.type, {
      clientX: evt.clientX,
      clientY: evt.clientY,
      bubbles: true,
      cancelable: true,
      altKey: evt.altKey,
      button: evt.button,
      buttons: evt.buttons,
      ctrlKey: evt.ctrlKey,
      metaKey: evt.metaKey,
      shiftKey: evt.shiftKey,
      relatedTarget: evt.relatedTarget,
      screenX: evt.screenX,
      screenY: evt.screenY,
      view: window,
      detail: 0,
    });

    mouseControl.mouse.element.dispatchEvent(newEvt);
  };

  mouseControl.mouse.element.removeEventListener(
    "mousewheel",
    mouseControl.mouse.mousewheel
  );

  mouseControl.mouse.element.removeEventListener(
    "DOMMouseScroll",
    mouseControl.mouse.mousewheel
  );

  mouseControl.mouse.element.removeEventListener(
    "touchstart",
    mouseControl.mouse.mousedown
  );

  mouseControl.mouse.element.removeEventListener(
    "touchmove",
    mouseControl.mouse.mousemove
  );

  mouseControl.mouse.element.addEventListener(
    "touchstart",
    mouseControl.mouse.mousedown,
    {
      passive: false,
    }
  );

  mouseControl.mouse.element.addEventListener(
    "touchmove",
    mouseControl.mouse.mousemove,
    {
      passive: false,
    }
  );

  const eventStart = (event: any) => {
    let x = event.clientX || event.touches[0]?.clientX;
    let y = event.clientY || event.touches[0]?.clientY;

    let element = findElement(x, y);

    if (!element || element.isStatic) {
      touchStart = {
        x: x,
      };
    } else {
      event.preventDefault();
      if (time.isActive()) {
        document.getElementById("animation-drag").style.display = "none";
        time.pause();
        time.kill();
        time.restart();
      }
      if (event.clientX) {
        onMouse(event);
      } else {
        onTouch(event);
      }
    }
  };

  const eventEnd = (event: any) => {
    if (!touchStart) {
      if (event.clientX) {
        onMouse(event);
      } else {
        onTouch(event);
      }
    } else {
      touchStart = null;
    }
  };

  const eventMove = (event: any) => {
    if (!touchStart) {
      event.preventDefault();
      if (event.clientX) {
        onMouse(event);
      } else {
        onTouch(event);
      }
    }
  };

  containerGravity.addEventListener("touchstart", eventStart, {
    passive: false,
  });
  containerGravity.addEventListener("touchend", eventEnd);
  containerGravity.addEventListener("touchmove", eventMove, {
    passive: false,
  });
  containerGravity.addEventListener("mousedown", eventStart);
  containerGravity.addEventListener("mouseup", eventEnd);
  containerGravity.addEventListener("mousemove", eventMove);

  const $click = document.querySelector<HTMLElement>(".click");
  $click.style.position = "absolute";
  $click.style.left = w / 2 + "px";
  $click.style.top = h - h / 5 + "px";
  $click.style.display = "flex";

  $click.addEventListener("click", (event) => {
    if (elements.elements.length > 0) {
      document.getElementById("animation-drag").style.display = "flex";
      time.play();
      $click.style.display = "none";
      elements.elements.forEach((element: any) => {
        Matter.Body.set(element, "isStatic", false);
      });
    }
  });

  let runner = Runner.run(observeCanvas.view, engine);
  Render.run(renderer, observeCanvas.view);

  let heightBefore = window.innerHeight;
  let widthBefore = window.innerWidth;
  let barNab = container.clientHeight - window.innerHeight;
  let event = () => {
    if (
      heightBefore - window.innerHeight > barNab ||
      window.innerHeight - heightBefore > barNab ||
      (heightBefore === window.innerHeight && widthBefore !== window.innerWidth)
    ) {
      if (renderer.canvas) {
        World.clear(engine.world, null);
        Engine.clear(engine);
        Render.stop(renderer);
        Runner.stop(runner);
        renderer.canvas.remove();
        renderer.canvas = null;
        renderer.context = null;
        renderer.textures = {};
        renderer.sprites = {};
        document.querySelector(".container-gravity").innerHTML = "";
        let canvas = document.createElement("div");
        canvas.classList.add("gravity");
        document.querySelector(".container-gravity").appendChild(canvas);
        containerGravity.removeEventListener("touchstart", eventStart);
        containerGravity.removeEventListener("touchend", eventEnd);
        containerGravity.removeEventListener("touchmove", eventMove);
        containerGravity.removeEventListener("mousedown", eventStart);
        containerGravity.removeEventListener("mouseup", eventEnd);
        containerGravity.removeEventListener("mousemove", eventMove);
        if (time.isActive()) {
          document.getElementById("animation-drag").style.display = "none";
          time.pause();
          time.kill();
          time.restart();
        }
        gravity(event, images, observeCanvas);
      }
      heightBefore = window.innerHeight;
      widthBefore = window.innerWidth;
    }
  };
  window.addEventListener("resize", event, false);
}

export default gravity;
