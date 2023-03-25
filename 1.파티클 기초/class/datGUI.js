import { Particle } from './index.js';

export class DatGUI {
    static init({blurValue, alphaChannel, alphaOffset, particles}) {
       const gui = new dat.GUI();
       const controls = new function () {
            this.blurValue = blurValue;
            this.alphaChannel = alphaChannel;
            this.alphaOffset = alphaOffset;
            this.acc = 1.03
        };
        const f1 = gui.addFolder('Gooey Effect');
        f1.open()
        f1.add(controls, 'blurValue', 0, 100).onChange((value) => {
            document.querySelector('feGaussianBlur').setAttribute('stdDeviation', value)
        });
        f1.add(controls, 'alphaChannel', 1, 200).onChange((value) => {
            document.querySelector('feColorMatrix').setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${value} ${this.alphaOffset}`)
        });
        f1.add(controls, 'alphaOffset', -40, 40).onChange((value) => {
            document.querySelector('feColorMatrix').setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${this.alphaChannel} ${value}`)
        });

        const f2 = gui.addFolder('Particle Property');
        f2.open()
        f2.add(controls, 'acc', 1, 1.5, 0.01).onChange((value) => {
            Particle.get().forEach(particle => particle.acc = value)
        });
    }

}