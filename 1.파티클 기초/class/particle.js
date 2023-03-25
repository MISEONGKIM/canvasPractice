import { canvasHeight, canvasWidth, ctx } from "../index.js";
export class Particle {
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
        ctx.fillStyle = `#8977ad`;
        ctx.fill();
        ctx.closePath();
    }
}