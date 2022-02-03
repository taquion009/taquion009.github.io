
import * as Matter from 'matter-js'
import imgGithub from '../../public/img/github.png'
import imgReact from '../../public/img/reactjs.png'
import imgJs from '../../public/img/js.png'
import imgcss from '../../public/img/css.png'
import imgHtml from '../../public/img/html.png'
import imgNode from '../../public/img/nodejs.png'
import imgNpm from '../../public/img/npm.png'
import imgVsc from '../../public/img/vsc.png'
import imgJson from '../../public/img/json.png'
import '../styles/gravity.scss'

const {Engine, Render, Bodies, Vertices, World, MouseConstraint, Events, Runner} = Matter

const engine = Matter.Engine.create()

  const createImg = (img:string) => {
      try{
        const imgElement = new Image()
        imgElement.src = img
        return true
      }catch(err){
        return false
      }
  }

  const loaderImgs = ()  => {
    createImg(imgGithub)
    createImg(imgReact)
    createImg(imgJs)
    createImg(imgcss)
    createImg(imgHtml)
    createImg(imgNode)
    createImg(imgNpm)
    createImg(imgVsc)
    createImg(imgJson)
  }

  const getELements = (
      img: string[],
      positions:number[][],
      widthElement:number,
      size:number,
      space: number,
      engine: Matter.Engine
    ): Matter.Body[] => {
    let elements = []
    for(let i = 0; i < img.length; i++){
      let element = Bodies.rectangle((positions[i][0]),positions[i][1], widthElement, widthElement, {
          isStatic: true,
            render: {
                strokeStyle: '#ffffff',
                sprite:{
                  xScale:size,
                  yScale:size,
                  texture: img[i]
                }
            }
          });
    World.add(engine.world, [element])
          elements.push(element)
    }
    return elements
  }
  
  const createElements = (engine: Matter.Engine,w: number,h: number) => {
    loaderImgs()
    let positions: number[][] = []

    let row = 0
    let borderH = 200
    let space = 0
    let borderW = 80
    let borderTop = 64
    let widthElement = 75
    let margin = 10
    let size = ((w-(borderW*2)+widthElement) + (h - (borderH)))/ (18 * widthElement)
    if(size > 1)size=1
    widthElement *= size
    let y = widthElement+margin+borderTop
    for(let i = 0; i < 18; i++){
      let x = borderW+(row*(widthElement+margin))
      if(w > 1250){
        x += (w-1250)/2
      }
      
      if(x > w-borderW || x > (w-1250)/2 + (1250-borderW)){
        space = ((w-(borderW*2)+widthElement) - ((widthElement+margin) * row))/row
        y += widthElement+margin
        x = borderW
        if(w > 1250){
          x += (w-1250)/2
          space = ((1250-(borderW)) - ((widthElement+margin) * row))/row
        }
        row = 0
      }

      positions.push([x,y])
      row++
    }

    let suma = 0
    positions = positions.map((el,i)=>{
      suma++
      if(i == 0){
        return [el[0]+(suma*space),el[1]]
      }else if(positions[i-1][0] < el[0]){
        return[el[0]+(suma*space),el[1]]
      }else{
        suma=1
        return[el[0]+(suma*space),el[1]]
      }
    })

    let elements = getELements(
      [imgJs,imgJs, imgJs, imgJs, imgJs, imgJs, imgJs, imgJs, imgJs,imgJs,imgJs, imgJs, imgJs, imgJs, imgJs, imgJs, imgJs, imgJs],
      positions,
      widthElement-margin,
      size,
      space,
      engine
    )
      
    const wallOptions = {
      isStatic: true,
      render: {
        visible: false,
      }
    }
  
    const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 100, wallOptions)
    const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 100, wallOptions)
    const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions)
    const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions)
    
    
    World.add(engine.world, [
      ground,
      ceiling,
      leftWall,
      rightWall,
    ])

    return {
      elements: [
        ...elements
      ],
  }
  }

  function gravity(eventResize?: any) {
  const sectionTag = document.querySelector<HTMLElement>(".gravity")
    if(eventResize){
      window.removeEventListener('resize', eventResize, false)
    }
    const w = window.innerWidth
    const h = window.innerHeight
    const renderer = Matter.Render.create({
      element: sectionTag,
      engine: engine,
      options: {
      height: h,
      width: w,
      background: "none",
      wireframes: false,
      pixelRatio: window.devicePixelRatio
    }
  })

    const mouseControl = MouseConstraint.create(engine, {
      element: sectionTag,
      constraint: {
        render: {
          visible: false
        }
      }
    })

  
    World.add(engine.world, mouseControl)
    
    let elements = createElements(engine, w, h)
    
    mouseControl.mouse.element.removeEventListener("mousewheel", mouseControl.mouse.mousewheel);
    mouseControl.mouse.element.removeEventListener("DOMMouseScroll", mouseControl.mouse.mousewheel);

    let touchStart: any = null;
    mouseControl.mouse.element.addEventListener('touchstart', (event) => {
      if (!mouseControl.body) {
        touchStart = event;
      }
    });

    mouseControl.mouse.element.addEventListener('touchend', (event) => {
      if (!mouseControl.body && touchStart) {
        event.preventDefault();
        touchStart = null;
      }
    });

    mouseControl.mouse.element.addEventListener('touchmove', (event) => {
      if (!mouseControl.body && touchStart) {
        event.preventDefault();
        const startY = touchStart.changedTouches[0].clientY;
        const endY = event.changedTouches[0].clientY;
        const delta = startY - endY
        
        if (delta > 80) {
          window.scrollBy(0, delta);
        }else if(delta < -80){
          window.scrollBy(0, delta);
        }
      }
    });

    const click = Bodies.circle(w-(w/5), h/2, 40, {
        isStatic: true,
        isSensor: true,
        render:{
          strokeStyle: '#ffffff',
          opacity: 0,
        }

  });
    const $click = document.querySelector<HTMLElement>('.click')
    $click.style.left = w-(w/5) + 'px';
    $click.style.top = h/2 + 'px';
    $click.style.display = 'flex';
    $click.style.transform = 'translate(-50%, -50%)';

    click.agregar= true

    if(w < 980){
      $click.style.left = w/2 + 'px';
      $click.style.top = h-h/5 + 'px';
      Matter.Body.set(click, "position", {x: w/2, y: h-h/5});
    }

    World.add(engine.world, click);

    Events.on(mouseControl, "mousedown", (event) => {
      if(elements.elements.length > 0 && mouseControl.body?.agregar) {
          World.remove(engine.world, mouseControl.body)
          $click.style.display = 'none';
          elements.elements.forEach(element => {
            Matter.Body.set(element, "isStatic", false)
          });
        }
    });

    let runner = Runner.run(engine)
    Render.run(renderer)

    let event = () => {
      if(renderer.canvas){
        World.clear(engine.world, null);
        Engine.clear(engine);
        Render.stop(renderer);
        Runner.stop(runner);
        renderer.canvas.remove();
        renderer.canvas = null;
        renderer.context = null;
        renderer.textures = {};
        renderer.sprites = {};
        document.querySelector(".container-gravity").removeChild(document.querySelector(".gravity"));
        let canvas = document.createElement("div")
        canvas.classList.add("gravity")
        document.querySelector(".container-gravity").appendChild(canvas)
        gravity(event)
      }
    }
    window.addEventListener('resize', event, false);

};

export default gravity;