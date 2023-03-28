import { Animate, CanvasOption } from "../0.common/index.js";
import {Particle} from './js/index.js';
window.addEventListener('load', () => {
    CanvasOption.init();
    const animate = new Animate(() => {
        CanvasOption.ctx.clearRect(0, 0, CanvasOption.canvasWidth, CanvasOption.canvasHeight);
        for (let i = Particle.get().length - 1; i > -1; i--){
            Particle.get()[i].update();
            Particle.get()[i].draw();
            if( Particle.get()[i].opacity < 0) {
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
    Particle.create(800);
})