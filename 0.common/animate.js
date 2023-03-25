export class Animate {
    constructor(exec) {
        const fps = 60;
        this.interval = 1000/fps;
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