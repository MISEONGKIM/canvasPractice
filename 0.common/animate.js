import { Common } from './common.js';

export class Animate {
    
    constructor(interval, exec) {
        this.interval = interval;
        this.beforTime = Date.now();
        this.exec = exec;
    }

    start() {
        window.requestAnimationFrame(this.start.bind(this));
        const now = Date.now();
        const passedTime = now - this.beforTime;
        if(passedTime< this.interval) return; 
        
        this.exec();
        this.beforTime = now - (passedTime % this.interval)
    }
}