import { Common, Particle } from './index.js';

export class Animate {
    
    constructor(interval) {
        this.interval = interval;
        this.beforTime = Date.now();
    }

    start() {
        window.requestAnimationFrame(this.start.bind(this));
        const now = Date.now();
        const passedTime = now - this.beforTime;
        const particles = Particle.get();
        if(passedTime< this.interval) return; 

        Common.ctx.clearRect(0, 0, Common.canvasWidth, Common.canvasHeight)
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        })
       
        this.beforTime = now - (passedTime % this.interval)
    }
}