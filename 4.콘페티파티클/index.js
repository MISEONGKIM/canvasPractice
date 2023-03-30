import { Animate, CanvasOption } from "../0.common/index.js";
import { Particle } from "./js/index.js";

window.addEventListener('load', () => {
    CanvasOption.init();
     let deg = 1;
    const animate = new Animate(() => {
        deg += 1;
        CanvasOption.ctx.clearRect(0, 0, CanvasOption.canvasWidth, CanvasOption.canvasHeight);
  
        Particle.create({ x : 0.5, y : 0.5, deg : 225 + deg, spread: 1, length : 5});
        Particle.create({ x : 0.5, y : 0.5, deg : 90 + deg, spread: 1, length : 5});
        Particle.create({ x : 0.5, y : 0.5, deg : 315 + deg, spread: 1, length : 5});
        for (let i = Particle.get().length - 1; i > -1; i--) {
            Particle.get()[i].update();
            Particle.get()[i].draw();

            if(Particle.get()[i].opacity < 0 || Particle.get()[i].y > CanvasOption.canvasHeight) {
                Particle.get().splice(i, 1);
            }
        }
    });
    animate.start();
});

window.addEventListener('resize', () => {
    CanvasOption.resize(innerHeight, innerWidth);
});

window.addEventListener('click', () => {
    Particle.create({ x : 0, y : 0.5, deg : -50, spread: 1, length : 10});
});