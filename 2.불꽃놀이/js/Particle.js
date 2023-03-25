import { CavasOption } from "../../0.common/index.js";
import { randomNumBetween } from "../../0.common/utils.js";
export class Particle {
    constructor(x, y, vx, vy) {
        this.ctx = CavasOption.ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy  = vy;
        this.opacity = 1;
    }

    update() {
     this.x += this.vx;
     this.y += this.vy;

     this.opacity -= 0.01;
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        this.ctx.fill()
        this.ctx.closePath()
    }

    static createArray(length) {
        const x = randomNumBetween(0, CavasOption.canvasHeight);
        const y = randomNumBetween(0, CavasOption.canvasHeight);

        this.particles = Array.from({length},(v) => v).map(() => new Particle(x, y, randomNumBetween(-5, 5), randomNumBetween(-5, 5)));
        console.log(this.particles);
    }

    static get() {
        return this.particles;
    }
}