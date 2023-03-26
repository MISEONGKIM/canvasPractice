export class CanvasOption {
    static init() {
        this.canvas = document.querySelector('canvas');
        //context는 그리게 될 도구 
        this.ctx = this.canvas.getContext('2d')
        this.dpr = window.devicePixelRatio;
        this.resize(innerHeight, innerWidth);
    }

    static resize(canvasHeight, canvasWidth) {
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;

        //canvas는 기본 width : 300, height: 150 으로 설정되어있음. 
        //그래서 canvas의 width, height 값도 조절해줘야함.
        this.canvas.width = canvasWidth * this.dpr
        this.canvas.height = canvasHeight * this.dpr
        this.ctx.scale(this.dpr, this.dpr)
        
        this.canvas.style.width = canvasWidth + 'px'
        this.canvas.style.height = canvasHeight + 'px'
    }
}