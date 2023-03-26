import { CanvasOption } from '../0.common/canvasOption.js';
import { Animate } from '../0.common/animate.js';
import { Particle, Sparke, Tail } from './js/index.js';
import { randomNumBetween } from '../0.common/utils.js';

window.addEventListener('load', () => {
    CanvasOption.init();
    const animate = new Animate( () => {
        
        CanvasOption.ctx.fillStyle = '#00000040';
        CanvasOption.ctx.fillRect(0, 0, CanvasOption.canvasWidth, CanvasOption.canvasHeight);

        CanvasOption.ctx.fillStyle = `rgba(255, 255, 255, ${Particle.get().length / 5000})`;
        CanvasOption.ctx.fillRect(0, 0, CanvasOption.canvasWidth, CanvasOption.canvasHeight);
       if(Math.random() < 0.03)  {
         const colorDeg = randomNumBetween(0, 360)
         Tail.createArray(1, colorDeg);
       }

        Tail.get().forEach((tail, index) => {
            tail.update();
            tail.draw();
            //Math.round(-tail.vy * 0.5)  : vy���� ����ϰ�(vy�� ���̳ʽ� ���̴ϱ� - �ٿ��༭ �����) ����ũ�� ���������ָ� ���������� vy�� 0�� �����⶧���� 
            // ����ũ�� ���� �������� ���� ����. 0.5�� �뷫 �׳� �����ִ� ���� �� ?
            Array.from({length : Math.round(-tail.vy * 0.5) }, v => v).forEach((v) => {
                const vx = randomNumBetween(-5, 5) * 0.05;
                const vy = randomNumBetween(-5, 5) * 0.05;
                const opacity = Math.min(-tail.vy, 0.5); //tail�� �������뿣 �� �����غ��̵��� ���� ��.
                Sparke.create(tail.x, tail.y, vx, vy, opacity, tail.colorDeg);
            })
            if(tail.vy > -0.7) {
                Tail.get().splice(index,1);
                Particle.createArray(100, tail.x, tail.y, tail.colorDeg);
            }
        })
        Particle.get().forEach((particle, index) => {
                particle.update();
                particle.draw();

                if(Math.random() < 0.1) {
                    Sparke.create(particle.x, particle.y, 0, 0, 0.3, 45);
                }

                // ������ 0�� �� ���� ������, ȭ�鿡 �Ⱥ��̴� ��ƼŬ���� �����ֱ� ����
                if (particle.opacity < 0) {
                    Particle.get().splice(index, 1);
                }
         });

         Sparke.get().forEach((sparke, index) => {
            sparke.update();
            sparke.draw();

            if (sparke.opacity < 0) {
                Sparke.get().splice(index, 1);
            }
         })
    });
    animate.start();
})

window.addEventListener('resize', () => {
    CanvasOption.resize(innerHeight, innerWidth);
} )