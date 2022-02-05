import "../styles/eclipse.scss"

const eclipse = () => {
    let canvas = document.querySelector<HTMLCanvasElement>('canvas.eclipse'),
        w = canvas.width = window.innerWidth,
        h = canvas.height = window.innerHeight,
        c = canvas.getContext('2d'),
        position: {x:number,y:number} = {x:0,y:0},
        points = [],
        eclipses: any[] = [],
        i = 0,
        cambio = 0

    let size = Math.round(Math.min(w, h)/9);

    const setPositionInit = () => {
        if(w < 980){
            position.x = w/2
            position.y = h-h/4
        }else{
            position.x = w-w/3
            position.y =  h/2
        }
    }

    window.addEventListener('resize', function(){
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        setPositionInit()
    });


    setPositionInit()

    let random = function(min:number, max:number){
        return Math.random()*(max-min)*min;
    };

    function rad(angle:number) {
        return angle * Math.PI / 180;
    }

    const createCircle = (x:number, y:number, radius:number, color:string, stroke:any, shadow:any) => {
        c.beginPath();
        c.arc(x, y, radius, 0, 2 * Math.PI, true);
        c.fillStyle = color;
        c.fill();
        if(stroke){
            c.strokeStyle = stroke[0];
            c.lineWidth = stroke[1];
            c.stroke();
        }
        if(shadow){
            c.shadowColor = shadow[0];
            c.shadowBlur = shadow[1];
        }
    }

    const createParticle = () => {
        points = [];
        for (let i = 0; i < size; i++) {
            let dist = (Math.random() * 200/2 * 0.1) +size;
            let angle = i * 360 / size;
            points.push([
                dist * Math.cos(rad(angle)),
                dist * Math.sin(rad(angle))
            ]);
        }
        return points;
    }

    function getCursorPosition(e:any){
        let x, y;
        if(e.clientY){
            x = e.clientX - canvas.offsetLeft;
            y = e.clientY - canvas.offsetTop;
        }else{
            x = e.touches[0].clientX - canvas.offsetLeft;
            y = e.touches[0].clientY - canvas.offsetTop;
        }
            position.x = x 
            position.y = y
    };
    
    document.querySelector(".s5").addEventListener('mousemove', function(e) {
        getCursorPosition(e)
    })


    class Fuego {
        x: number;
        y: number;
        velY: number;
        velX: number;
        size: number;
        alpha: number;
        points: any[];
        constructor(x:number, y:number) {
            this.x = x;
            this.y = y;
            this.velY = -1;
            this.velX = (random(1, 10) - 5) / 10;
            this.size = 1;
            this.alpha = 1;
            this.points = createParticle();
        }
        update = function () {
            this.y += this.velY;
            this.x += this.velX;
            this.velY *= 0.99;
            if (this.alpha < 0)
                this.alpha = 0;
            c.beginPath();
            c.moveTo(position.x + this.points[0][0], position.y + this.points[0][1]);
            for (let i = size - 1; i >= 0; i -= 1) {
                c.lineTo(position.x + this.points[i][0], position.y + this.points[i][1]);
            }
            c.lineWidth = 5;
            c.strokeStyle = '#fff';
            c.globalAlpha = this.alpha;
            c.shadowColor = '#fff';
            c.shadowBlur = size * 0.3;
            c.stroke();
            this.size -= 0.02;
        };
    }

    let draw = function(){
        if(eclipses.length < 100){
            let eclipse = new Fuego(position.x, position.y);
            eclipses.push(eclipse);
        }
        
        c.clearRect(0, 0, canvas.width, canvas.height);
        eclipses[i].update();
        cambio++
        if(cambio == 8){
            i++
            if(i > eclipses.length-1) i = 0
            cambio = 0
        }

        c.beginPath();
        createCircle(position.x, position.y, size+7, '#000', ["#fff",4], false)
        window.requestAnimationFrame(draw);
    };

    window.requestAnimationFrame(draw);
}

export default eclipse