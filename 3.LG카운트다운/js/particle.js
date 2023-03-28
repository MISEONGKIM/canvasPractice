import { CanvasOption } from "../../0.common/index.js";
import { randomNumBetween } from "../../0.common/utils.js";

export class Particle {
    constructor() {
        this.ctx = CanvasOption.ctx;

        this.rFriction = randomNumBetween(0.95, 1.01);
        this.rAlpha = randomNumBetween(0, 5);
        this.r = innerHeight / 4;
        
        this.angleFriction = randomNumBetween(0.97, 0.99);
        this.angleAlpha = randomNumBetween(1, 2);
        this.angle = randomNumBetween(0, 360);

        this.opacity = randomNumBetween(0.2, 1);

    }

    update() {
        this.rAlpha *= this.rFriction;
        this.r += this.rAlpha;

        this.angleAlpha *= this.angleFriction;
        this.angle +=  this.angleAlpha;
        
        this.x = innerWidth / 2 + this.r * Math.cos(Math.PI/180 * this.angle);
        this.y = innerHeight / 2  + this.r * Math.sin(Math.PI/180 * this.angle);
    
        this.opacity -= 0.003;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        this.ctx.fill();
        this.ctx.closePath();
    }

    static create(length) {
        const oldArray = this.paticles ?? [];
        this.paticles = oldArray.concat(Array.from({length}, v => v).map(() => {
            return new Particle();
        }));
    }

    static get() {
        return this.paticles ?? [];
    }

}