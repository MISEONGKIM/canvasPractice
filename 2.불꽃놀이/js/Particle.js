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
        // �߷�ȿ�� �Ʒ��� ��������
        this.gravity = 0.12;
        //�ӵ��� ���� �������� 0�� �����ϵ��� ���� �ڿ������� ���ߵ��ϰ� �ϱ�����
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
            //hypotenuse * 0.0001 ȭ���� ������ ������ŭ �����־ ȭ������ ���缭 ��ũ�� ���� 
            const r = randomNumBetween(10, 100) * hypotenuse(innerWidth, innerHeight) * 0.0001;
            //���� ���� �־��־�� ���� �Ʒ��� ���� ����ؼ� �������� ��ȯ
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