import { CavasOption } from '../../0.Common/canvasOption.js';

export class Particle {
    constructor(x, y, radius, vy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vy = vy;// 가속도(중력에 의해 떨어질 수록 빨라지는 것 처럼 효과 )
        this.acc = 1.03 
    }

    static randomNumBetween (min, max)  {
        return Math.random() * (max - min + 1) + min
    }
    static set(array) {
        this.particles = array
    }
    static get() {
        return this.particles;
    }

    update() {
        if(this.y - this.radius > CavasOption.canvasHeight) {
            this.y = 0;
            this.x = Particle.randomNumBetween(0, CavasOption.canvasWidth)
            this.radius = Particle.randomNumBetween(50, 100)
            this.vy = Particle.randomNumBetween(1, 5)
            return;
        }
        this.vy *= this.acc;
        this.y += this.vy;
    }

    draw() {
        CavasOption.ctx.beginPath()
        //Math.PI /180이  1도를 뜻함.
        CavasOption.ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360)
        CavasOption.ctx.fillStyle = `#8977ad`;
        CavasOption.ctx.fill();
        CavasOption.ctx.closePath();
    }
}