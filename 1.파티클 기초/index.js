import { Particle, DatGUI } from './class/index.js';
import { Animate, Common } from '../0.common/index.js';

Common.init();

const createParticles = () => {
    Particle.set(Array.from({length : Common.canvasWidth / 50}, (v, i)=> i).map(d => new Particle(
        Particle.randomNumBetween(0, Common.canvasWidth),
        Particle.randomNumBetween(0, Common.canvasHeight),
        Particle.randomNumBetween(50, 100),
        Particle.randomNumBetween(1, 5)
    )));
}

window.addEventListener('load', () => {
    createParticles();
    DatGUI.init({
        blurValue : 40,
        alphaChannel : 100,
        alphaOffset : -23,
    });
    const fps = 60;
    const animate = new Animate(1000/fps, () => {
        Common.ctx.clearRect(0, 0, Common.canvasWidth, Common.canvasHeight)
        Particle.get().forEach(particle => {
            particle.update();
            particle.draw();
        })
       
    })
    animate.start();
})

window.addEventListener('resize', () => {
    Common.resize(innerHeight, innerWidth);
    createParticles();
})