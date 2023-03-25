import { Particle, DatGUI } from './js/index.js';
import { Animate, CavasOption } from '../0.Common/index.js';
import {randomNumBetween} from '../0.common/utils.js';
const createParticles = () => {
    Particle.set(Array.from({length : CavasOption.canvasWidth / 50}, (v, i)=> i).map(d => new Particle(
        randomNumBetween(0, CavasOption.canvasWidth),
        randomNumBetween(0, CavasOption.canvasHeight),
        randomNumBetween(50, 100),
        randomNumBetween(1, 5)
    )));
}

window.addEventListener('load', () => {
    CavasOption.init();
    createParticles();
    DatGUI.init({
        blurValue : 40,
        alphaChannel : 100,
        alphaOffset : -23,
    });
    const animate = new Animate(() => {
        CavasOption.ctx.clearRect(0, 0, CavasOption.canvasWidth, CavasOption.canvasHeight)
        Particle.get().forEach(particle => {
            particle.update();
            particle.draw();
        })
       
    })
    animate.start();
})

window.addEventListener('resize', () => {
    CavasOption.resize(innerHeight, innerWidth);
    createParticles();
})