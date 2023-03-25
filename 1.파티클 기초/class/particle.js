import { Common } from '../../0.common/common.js';

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
    static set(array) {
        this.particles = array
    }
    static get() {
        return this.particles;
    }

    update() {
        if(this.y - this.radius > Common.canvasHeight) {
            this.y = 0;
            this.x = Particle.randomNumBetween(0, Common.canvasWidth)
            this.radius = Particle.randomNumBetween(50, 100)
            this.vy = Particle.randomNumBetween(1, 5)
            return;
        }
        this.vy *= this.acc;
        this.y += this.vy;
    }

    draw() {
        Common.ctx.beginPath()
        //Math.PI /180��  1���� ����.
        Common.ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360)
        Common.ctx.fillStyle = `#8977ad`;
        Common.ctx.fill();
        Common.ctx.closePath();
    }
}