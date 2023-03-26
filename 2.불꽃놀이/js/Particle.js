import { CanvasOption } from "../../0.common/index.js";
import { randomNumBetween, hypotenuse } from "../../0.common/utils.js";
export class Particle {
    constructor(x, y, vx, vy, opacity, colorDeg) {
        this.ctx = CanvasOption.ctx;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy  = vy;
        this.opacity = opacity;
        this.colorDeg = colorDeg;
        // 중력효과 아래로 떨어지게
        this.gravity = 0.12;
        //속도가 점점 느려지게 0에 수렴하도록 만들어서 자연스럽게 멈추듯하게 하기위해
        this.friction = 0.95;
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
        this.ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        this.ctx.fillStyle = `hsla(${this.colorDeg}, 100%, 65%,${this.opacity})`;
        this.ctx.fill();
        this.ctx.closePath();
    }

    static createArray(length, x, y, colorDeg) {
        const oldArray =  this.particles ?? [];
        this.particles =  oldArray.concat(Array.from({length},(v) => v).map(() => {
            //hypotenuse * 0.0001 화면의 빗변의 비율만큼 곱해주어서 화면사이즈에 맞춰서 원크기 생성 
            const r = randomNumBetween(10, 100) * hypotenuse(innerWidth, innerHeight) * 0.0001;
            //라디안 값을 넣어주어야 함을 아래와 같이 계산해서 라디안으로 변환
            const angle = Math.PI / 180 * randomNumBetween(0, 360); 
            const vx = r * Math.cos(angle);
            const vy = r * Math.sin(angle);
            const opacity = randomNumBetween(0.6, 0.9);
            const _colorDeg = randomNumBetween(-20, 20) + colorDeg;
            return new Particle(x, y, vx,vy, opacity, _colorDeg);
        }));
    }

    static get() {
        return this.particles ?? [];
    }
}