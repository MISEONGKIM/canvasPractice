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
    //Particle.create(800);
    const texts = document.querySelectorAll('span');
   //fromTo(애니메이션대상, 처음상태, 끝상태) 지정한 상태로 애니메이션이 동작됨.
   const countDownOption = { 
    opacity : 1, 
    scale : 1, 
    duration : 0.4, 
    ease : 'Power4.easeOut'
    }; 
    gsap.fromTo(texts[0], { opacity : 0, scale : 5}, {...countDownOption});

    gsap.fromTo(texts[1], { opacity : 0, scale : 5}, {
        ...countDownOption, 
        delay : 1, //1초 후에 시작되어야함.
        //카운트다운 2가 시작되면 1의 투명도를 0으로
        onStart: () => texts[0].style.opacity = 0,
    });

    gsap.fromTo(texts[2], { opacity : 0, scale : 5}, {
        ...countDownOption, 
        delay : 2,
        onStart: () => texts[1].style.opacity = 0,
    });

    const ringImg = document.querySelector('#ring');
    gsap.fromTo(ringImg, {opacity : 1}, {
        opacity: 0,
        duration : 1,
        delay : 3, //3초 후 사라짐
        //링 이미지가 사라지는 애니메이션이 시작이 되는 순간
        onStart : () => {
            Particle.create(800);
            texts[2].style.opacity = 0
        },
    })
})