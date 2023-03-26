import { CanvasOption } from "../../0.common/index.js";
import { randomNumBetween } from "../../0.common/utils.js";
export class Tail {
    constructor(x, vy, colorDeg) {
        this.x = x;
        this.y = CanvasOption.canvasHeight;
        this.vy = vy;
        this.friction = 0.98;
        this.ctx = CanvasOption.ctx;
        this.opacity = 1;
        this.angle = 0;
        this.colorDeg = colorDeg
    }

    update() {
        this.vy *= this.friction;
        this.angle += 1;
        this.x += Math.cos(this.angle) * this.vy * 0.2;
        this.y += this.vy;
        
        this.opacity = -this.vy;
    }

    draw() {
        this.ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 65%,${this.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

   
    static createArray(length, colorDeg) {
        const oldArray =  this.tails ?? [];
        this.tails = oldArray.concat(Array.from({length},(v) => v).map(() => {
            const x = randomNumBetween(CanvasOption.canvasWidth * 0.2, CanvasOption.canvasHeight* 0.8);
            const vy = CanvasOption.canvasHeight * randomNumBetween(0.01, 0.015) * -1;
           
            return new Tail(x, vy, colorDeg);
        }));
    }

    static get() {
        return this.tails ?? [];
    }

}