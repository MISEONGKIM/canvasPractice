const canvas = document.querySelector('canvas');

const dpr = window.devicePixelRatio;
//context�� �׸��� �� ���� 
const ctx = canvas.getContext('2d')

const canvasWidth = innerWidth
const canvasHeight = innerHeight

canvas.style.width = canvasWidth + 'px'
canvas.style.height = canvasHeight + 'px'

//canvas�� �⺻ width : 300, height: 150 ���� �����Ǿ�����. 
//�׷��� canvas�� width, height ���� �����������.
canvas.width = canvasWidth * dpr
canvas.height = canvasHeight * dpr
ctx.scale(dpr,dpr)


class Particle {
    constructor(x, y, radius, vy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vy = vy;// ���ӵ�(�߷¿� ���� ������ ���� �������� �� ó�� ȿ�� )
        this.acc = 1.03 
    }

     static randomNumBetween (min, max)  {
        return Math.random() * (max - min + 1) + min
      }

    update() {
        if(this.y - this.radius > canvasHeight) {
            this.y = 0;
            this.x = Particle.randomNumBetween(0, canvasWidth)
            this.radius = Particle.randomNumBetween(50, 100)
            this.vy = Particle.randomNumBetween(1, 5)
            return;
        }
        this.vy *= this.acc;
        this.y += this.vy;
    }

    draw() {
        ctx.beginPath()
        //Math.PI /180��  1���� ����.
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360)
        ctx.fillStyle = 'orange';
        ctx.fill();
        ctx.closePath();
    }
}

class Animate {
    
    constructor(interval, particles) {
        this.interval = interval;
        this.beforTime = Date.now();
        this.particles = particles;
    }

    start() {
        window.requestAnimationFrame(animate.start.bind(this));
        const now = Date.now();
        const passedTime = now - this.beforTime;
        
        if(passedTime< this.interval) return; 

        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        })
       
        this.beforTime = now - (passedTime % this.interval)
    }
}
const fps = 60;
const particles = Array.from({length : canvasWidth / 10}, (v, i)=> i).map(d => new Particle(
    Particle.randomNumBetween(0, canvasWidth),
    Particle.randomNumBetween(0, canvasHeight),
    Particle.randomNumBetween(50, 100),
    Particle.randomNumBetween(1, 5)
));
const animate = new Animate(1000/fps, particles)
animate.start(particles);