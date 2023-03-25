import { Particle, DatGUI } from './class/index.js';
import { Animate, CavasOption } from '../0.Common/index.js';

const createParticles = () => {
    Particle.set(Array.from({length : CavasOption.canvasWidth / 50}, (v, i)=> i).map(d => new Particle(
        Particle.randomNumBetween(0, CavasOption.canvasWidth),
        Particle.randomNumBetween(0, CavasOption.canvasHeight),
        Particle.randomNumBetween(50, 100),
        Particle.randomNumBetween(1, 5)
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