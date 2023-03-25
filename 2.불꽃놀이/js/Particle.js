import { CavasOption } from "../../0.common/index.js";
import { randomNumBetween, hypotenuse } from "../../0.common/utils.js";
export class Particle {
    constructor(x, y, vx, vy, opacity) {
        this.ctx = CavasOption.ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy  = vy;
        this.opacity = opacity;
        // 중력효과 아래로 떨어지게
        this.gravity = 0.12;
        //속도가 점점 느려지게 0에 수렴하도록 만들어서 자연스럽게 멈추듯하게 하기위해
        this.friction = 0.93;
    }

    update() {
     this.vy += this.gravity;
     
     this.vx *= this.friction;
     this.vy *= this.friction;
     
     this.x += this.vx;
     this.y += this.vy;

     this.opacity -= 0.02;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        this.ctx.fill();
        this.ctx.closePath();
    }

    static createArray(length) {
        const x = randomNumBetween(0, CavasOption.canvasHeight);
        const y = randomNumBetween(0, CavasOption.canvasHeight);

        this.particles = Array.from({length},(v) => v).map(() => {
            const r = randomNumBetween(2, 100) * hypotenuse(innerWidth, innerHeight) * 0.0001;
            //라디안 값을 넣어주어야 함을 아래와 같이 계산해서 라디안으로 변환
            const angle = Math.PI / 180 * randomNumBetween(0, 360); 
            const vx = r * Math.cos(angle);
            const vy = r * Math.sin(angle);
            const opacity = randomNumBetween(0.6, 0.9);
           
            return new Particle(x, y, vx,vy, opacity);
        });
    }

    static get() {
        return this.particles;
    }
}