import { Particle, DatGUI } from './js/index.js';
import { Animate, CanvasOption } from '../0.Common/index.js';
import {randomNumBetween} from '../0.common/utils.js';
const createParticles = () => {
    Particle.set(Array.from({length : CanvasOption.canvasWidth / 50}, (v, i)=> i).map(d => new Particle(
        randomNumBetween(0, CanvasOption.canvasWidth),
        randomNumBetween(0, CanvasOption.canvasHeight),
        randomNumBetween(50, 100),
        randomNumBetween(1, 5)
    )));
}

window.addEventListener('load', () => {
    CanvasOption.init();
    createParticles();
    DatGUI.init({
        blurValue : 40,
        alphaChannel : 100,
        alphaOffset : -23,
    });
    const animate = new Animate(() => {
        CanvasOption.ctx.clearRect(0, 0, CanvasOption.canvasWidth, CanvasOption.canvasHeight)
        Particle.get().forEach(particle => {
            particle.update();
            particle.draw();
        })
       
    })
    animate.start();
})

window.addEventListener('resize', () => {
    CanvasOption.resize(innerHeight, innerWidth);
    createParticles();
})