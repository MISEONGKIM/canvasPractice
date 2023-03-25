import { CavasOption } from '../0.common/canvasOption.js';
import { Animate } from '../0.common/animate.js';
import { Particle } from './js/index.js';

window.addEventListener('load', () => {
    CavasOption.init();
    
    Particle.createArray(100);
    Particle.createArray(100);
    const animate = new Animate( () => {
        CavasOption.ctx.fillStyle = '#00000040';
        CavasOption.ctx.fillRect(0, 0, CavasOption.canvasWidth, CavasOption.canvasHeight)

        Particle.get().forEach((particle, index) => {
                particle.update();
                particle.draw();

                // ������ 0�� �� ���� ������, ȭ�鿡 �Ⱥ��̴� ��ƼŬ���� �����ֱ� ����
                if (particle.opacity < 0) {
                    Particle.get().splice(index, 1);
                }
    });
    });
    animate.start();
})

window.addEventListener('resize', () => {
    console.log(innerHeight, innerWidth)
    CavasOption.resize(innerHeight, innerWidth);
} )