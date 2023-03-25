import { Animate, Particle, DatGUI } from './class/index.js';


export const canvasWidth = innerWidth
export const canvasHeight = innerHeight

const canvas = document.querySelector('canvas');
//context는 그리게 될 도구 
export const ctx = canvas.getContext('2d')
const dpr = window.devicePixelRatio;

canvas.style.width = canvasWidth + 'px'
canvas.style.height = canvasHeight + 'px'

//canvas는 기본 width : 300, height: 150 으로 설정되어있음. 
//그래서 canvas의 width, height 값도 조절해줘야함.
canvas.width = canvasWidth * dpr
canvas.height = canvasHeight * dpr
ctx.scale(dpr,dpr)

 
const fps = 60;
export const particles = Array.from({length : canvasWidth / 50}, (v, i)=> i).map(d => new Particle(
    Particle.randomNumBetween(0, canvasWidth),
    Particle.randomNumBetween(0, canvasHeight),
    Particle.randomNumBetween(50, 100),
    Particle.randomNumBetween(1, 5)
));
const animate = new Animate(1000/fps, particles, ctx)
animate.start(particles);
DatGUI.init({
    blurValue : 40,
    alphaChannel : 100,
    alphaOffset : -23,
    particles
});