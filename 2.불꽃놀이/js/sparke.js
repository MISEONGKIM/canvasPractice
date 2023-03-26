import { CanvasOption } from "../../0.common/index.js";

export class Sparke {
    constructor(x, y, vx, vy, opacity, colorDeg) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.ctx = CanvasOption.ctx;
        this.opacity = opacity;
        this.colorDeg = colorDeg;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.opacity -= 0.01;
    }

    draw() {
        this.ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 65%,${this.opacity})`;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    static create(x, y, vx, vy, opacity, color) {
        const oldArray = this.sparkes ?? [];
        this.sparkes = oldArray.concat(new Sparke(x, y, vx, vy, opacity, color));
    }

    static get() {
        return this.sparkes ?? [];
    }

}