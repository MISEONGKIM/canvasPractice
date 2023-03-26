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
            //Math.round(-tail.vy * 0.5)  : vy값에 비례하게(vy는 마이너스 값이니까 - 붙여줘서 양수로) 스파크를 생성시켜주면 마지막에는 vy가 0에 가깝기때문에 
            // 스파크를 거의 생성하지 않을 거임. 0.5는 대략 그냥 곱해주는 값인 듯 ?
            Array.from({length : Math.round(-tail.vy * 0.5) }, v => v).forEach((v) => {
                const vx = randomNumBetween(-5, 5) * 0.05;
                const vy = randomNumBetween(-5, 5) * 0.05;
                const opacity = Math.min(-tail.vy, 0.5); //tail의 마지막쯤엔 더 투명해보이도록 값을 줌.
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

                // 투명도가 0이 된 값은 제거함, 화면에 안보이는 파티클들을 지워주기 위해
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