import { canvasHeight, canvasWidth, ctx } from "../index.js";
export class Animate {
    
    constructor(interval, particles) {
        this.interval = interval;
        this.beforTime = Date.now();
        this.particles = particles;
    }

    start() {
        window.requestAnimationFrame(this.start.bind(this));
        const now = Date.now();
        const passedTime = now - this.beforTime;
        
        if(passedTime< this.interval) return; 

        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        this.particles.forEach(particle => {
            particle.update();
            particle.draw();
        })
       
        this.beforTime = now - (passedTime % this.interval)
    }
}