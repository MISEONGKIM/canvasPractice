import { CanvasOption } from "../../0.common/index.js";
import {hexToRgb, randomNumBetween} from "../../0.common/utils.js";

export class Particle {
    constructor(x, y, deg = 0, colors, shapes, spread = 30) {
        this.ctx = CanvasOption.ctx;
        this.x = x * innerWidth;
        this.y = y * innerHeight;

        this.angle = Math.PI / 180 * randomNumBetween(deg - spread, deg + spread);
        this.r = randomNumBetween(30, 100);
        this.vx = this.r * Math.cos(this.angle);
        this.vy = this.r * Math.sin(this.angle);
        this.gravity = 0.5;
        this.friction = 0.89;

        this.width = 12;
        this.height = 12;

        this.opacity = 1;

        this.widthDelta = randomNumBetween(0, 360);
        this.heightDelta = randomNumBetween(0, 360);

        this.rotation =  randomNumBetween(0, 360);
        this.rotationDelta =  randomNumBetween(-1, 1);
        
        this.colors = colors || ['#F51E05', '#7ff3e0', '#b0f70e', '#9033FF'];
        this.color = hexToRgb(this.colors[Math.floor(randomNumBetween(0, this.colors.length))]);
        
        this.shapes = shapes || ['square', 'circle'];
        this.shape =  this.shapes[Math.floor(randomNumBetween(0, this.shapes.length))];
    }

    update() {
        this.vy += this.gravity;
        
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
        
         this.opacity -= 0.005;

        this.widthDelta += 2;
        this.heightDelta += 2;

        this.rotation += this.rotationDelta;

    }
    drawSquare() {
        this.ctx.fillRect(
            this.x, 
            this.y, 
            this.width * Math.cos(Math.PI/180 * this.widthDelta), 
            this.height * Math.sin(Math.PI/180 * this.heightDelta)
        );
    }

    drawCircle() {
        this.ctx.beginPath();
        this.ctx.ellipse(
            this.x, 
            this.y,
            Math.abs(this.width * Math.cos(Math.PI/180 * this.widthDelta)) / 2, 
            Math.abs(this.height * Math.sin(Math.PI/180 * this.heightDelta)) / 2,
            0,
            0,
            Math.PI * 2
        )
        this.ctx.fill();
        this.ctx.closePath();
    }

    draw() {
       this.ctx.translate(this.x + this.width * 1.2, this.y + this.height * 1.2);
       this.ctx.rotate(Math.PI / 180 * this.rotation);
       this.ctx.translate(-this.x - this.width * 1.2, -this.y - this.height * 1.2);
        
       this.ctx.fillStyle = `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
      
       switch(this.shape) {
        case 'square' : 
            this.drawSquare();
            break;
        case 'circle' : 
            this.drawCircle();
            break;
       }
        
        this.ctx.resetTransform();
    }

    static create({x, y, deg, colors, shapes,spread, length}) {
        const oldArray = this.particles ?? [];
        this.particles = oldArray.concat(Array.from({length}, v => v).map(() => {
            return new Particle(x, y, deg, colors, shapes, spread);
        }));
    }
    static get() {
        return this.particles ?? [];
    }
}  