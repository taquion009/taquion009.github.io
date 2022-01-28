
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
import imgPorfile from '../../public/img/profile.jpg'

const {Engine, Render, Bodies, Vertices, World, MouseConstraint, Events, Runner} = Matter

const engine = Matter.Engine.create()

    const preload = (img:string) => {
      try{
        const imgElement = new Image()
        imgElement.src = img
        return true
      }catch(err){
        return false
      }
    }
  const loaderImgs = ()  => {
    preload(imgGithub)
    preload(imgReact)
    preload(imgJs)
    preload(imgcss)
    preload(imgHtml)
    preload(imgNode)
    preload(imgNpm)
    preload(imgVsc)
    preload(imgJson)
    preload(imgPorfile)
  }
  
  const createElements = (engine: Matter.Engine,w: number,h: number) => {
    loaderImgs()
    const getXRandom = () => {
      return Math.floor(Math.random() * w)
    }
  
    const getYRandom = () => {
      return Math.floor(Math.random() * h)
    }
      
      const github = Bodies.circle(getXRandom(), getYRandom(), 40, {
            density: 0.0005,
            frictionAir: 0.03,
            restitution: 0.3,
            friction: 0.01,
            render: {
                sprite: {
                    texture: imgGithub,
                    xScale: 1,
                    yScale: 1
                }
            }
        });

      const react = Bodies.circle(getXRandom(), getYRandom(), 55, {
            density: 0.0005,
            frictionAir: 0.03,
            restitution: 0.3,
            friction: 0.01,
            render: {
                sprite: {
                    texture: imgReact,
                    xScale: 1,
                    yScale: 1
                }
            }
        });

      const js = Bodies.rectangle(getXRandom(), getYRandom(), 64, 64, {
          render: {
              strokeStyle: '#ffffff',
              sprite: {
                  texture: imgJs,
                  xScale: 1,
                  yScale: 1
              }
          }
        });
          
        let cssPath = Vertices.fromPath('0 5 68 5 63 70 34 78 5 70', null)
        const css = Bodies.fromVertices(getXRandom(), getYRandom(), cssPath, {
        render: {
          strokeStyle: '#ffffff',
          sprite: {
              texture: imgcss,
              xScale: 1,
              yScale: 1
          }
      }
        });

        let nodejsPath = Vertices.fromPath('32 0 60 16 60 48 32 64 5 48 5 16', null);
          const nodejs = Bodies.fromVertices(getXRandom(), getYRandom(), nodejsPath, {
          render: {
            strokeStyle: '#ffffff',
            sprite: {
                texture: imgNode,
                xScale: 1,
                yScale: 1
            }
        }
          });

        let htmlPath = Vertices.fromPath('0 5 68 5 63 74 34 82 5 74', null);
        const html = Bodies.fromVertices(getXRandom(), getYRandom(), htmlPath, {
          render: {
            strokeStyle: '#ffffff',
            sprite: {
                texture: imgHtml,
                xScale: 1,
                yScale: 1
            }
        }
          });


        let vscPath = Vertices.fromPath('0 20 70 0 80 15 80 65 65 80 0 60',null);
          const vsc = Bodies.fromVertices(getXRandom(), getYRandom(), vscPath, {
            render: {
              strokeStyle: '#ffffff',
              sprite: {
                  texture: imgVsc,
                  xScale: 1,
                  yScale: 1
              }
          }
        });

        let npmPath = Vertices.fromPath('0 10 144 10 144 70 0 70', null);
          const npm = Bodies.fromVertices(getXRandom(), getYRandom(), npmPath, {
            render: {
              strokeStyle: '#ffffff',
              sprite: {
                  texture: imgNpm,
                  xScale: 1,
                  yScale: 1
              }
          }
        });

        let jsonPath = Vertices.fromPath('0 0 46 0 63 20 63 84 0 84', null);
          const json = Bodies.fromVertices(getXRandom(), getYRandom(), jsonPath, {
            render: {
              strokeStyle: '#ffffff',
              sprite: {
                  texture: imgJson,
                  xScale: 1,
                  yScale: 1
              }
          }
        });

    let xM = 0
    let scale = 1
    let yM = 0
    if(w > 1250) {
      xM = ((1250+(190/2))/2) +  (w/2) - 201;
      yM = h/2;
    } else if(w <= 980) {
      xM = w/2;
      yM = h/3.5;
      scale = 0.7;
    } else {
      xM = 32 + w - 195;
      yM = h/2;
    }
    
    const $profile = document.querySelector<HTMLElement>('.porfile-container')
    $profile.style.left = xM + 'px';
    $profile.style.top = yM + 'px';
    $profile.style.transform = 'translate(calc(-50% - 1px),-50%) scale(' + scale + ')';

    const profile = Bodies.rectangle(xM, yM, 201, 251, {
      isStatic: true,
      render: {
        sprite: {
          texture: imgPorfile,
          xScale: 1,
          yScale: 1
      },
      }
    })

    profile.render.sprite.xScale = scale;
    profile.render.sprite.yScale = scale;
    Matter.Body.scale(profile, scale, scale)
  
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
      profile,
      ground,
      ceiling,
      leftWall,
      rightWall,
    ])

    return {
      elements: [
        js,
        react,
        css,
        github,
        html,
        vsc,
        nodejs,
        npm,
        json,
      ],
      porfile:profile
  }
  }

  function gravity(eventResize: any) {
  const sectionTag = document.querySelector<HTMLElement>(".shapes")
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
        const delta = Math.abs(startY - endY);
        
        if (delta > 80) {
          window.scrollBy(0, delta);
        }
      }
    });

    const click = Bodies.circle(w/2, h-h/8, 40, {
        isStatic: true,
        isSensor: true,
        render:{
          strokeStyle: '#ffffff',
          opacity: 0,
        }

  });
   const $click = document.querySelector<HTMLElement>('.click')
    $click.style.left = w/2 + 'px';
    $click.style.top = h-h/8 + 'px';
    $click.style.display = 'flex';

    click.agregar= true

    World.add(engine.world, click);

    Events.on(mouseControl, "mousedown", (event) => {
      if(elements.elements.length > 0 && mouseControl.body?.agregar) {
        World.remove(engine.world, mouseControl.body)
        let element = elements.elements[Math.floor(Math.random() * elements.elements.length)];
        let x = event.mouse.position.x;
        let y = event.mouse.position.y;
        Matter.Body.set(element, "position", {x: x, y: y});
        elements.elements.splice(elements.elements.indexOf(element), 1);
        World.add(engine.world, element);
        if(elements.elements.length > 0) {
          const generar = ():any => {
            let numX = Math.floor(Math.random() * ((w-50) - 50) + 50)
            let numY = Math.floor(Math.random() * ((h-50) - 50) + 50)
            if(numX >= elements.porfile.vertices[0].x - 40 && numX <= elements.porfile.vertices[1].x + 40
            && numY >= elements.porfile.vertices[0].y - 40 && numY <= elements.porfile.vertices[2].y + 40) {
              return generar()
            }
            return [numX, numY]
          }
          let [x, y] = generar()
          $click.style.left = x + 'px';
          $click.style.top = y + 'px';
          Matter.Body.set(click, "position", {
            x: x,
            y: y,
          });
          World.add(engine.world, click);
        }else{
          $click.style.display = 'none';
        }
      }
    })

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
        // renderer.sprites = {};
        document.querySelector(".s1-container").removeChild(document.querySelector(".shapes"))
        let canvas = document.createElement("div")
        canvas.classList.add("shapes")
        document.querySelector(".s1-container").appendChild(canvas)
        gravity(event)
      }
    }
    window.addEventListener('resize', event, false);

};

gravity(null)

export default gravity;