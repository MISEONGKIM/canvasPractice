import { CanvasOption } from '../../0.common/canvasOption.js';
import {randomNumBetween} from '../../0.common/utils.js';

export class Particle {
    constructor(x, y, radius, vy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.vy = vy;// ���ӵ�(�߷¿� ���� ������ ���� �������� �� ó�� ȿ�� )
        this.acc = 1.03 
    }

    static set(array) {
        this.particles = array
    }
    static get() {
        return this.particles;
    }

    update() {
        if(this.y - this.radius > CanvasOption.canvasHeight) {
            this.y = 0;
            this.x = randomNumBetween(0, CanvasOption.canvasWidth)
            this.radius = randomNumBetween(50, 100)
            this.vy = randomNumBetween(1, 5)
            return;
        }
        this.vy *= this.acc;
        this.y += this.vy;
    }

    draw() {
        CanvasOption.ctx.beginPath()
        //Math.PI /180��  1���� ����.
        CanvasOption.ctx.arc(this.x, this.y, this.radius, 0, Math.PI / 180 * 360)
        CanvasOption.ctx.fillStyle = `#8977ad`;
        CanvasOption.ctx.fill();
        CanvasOption.ctx.closePath();
    }
}