export class CanvasOption {
    static init() {
        this.canvas = document.querySelector('canvas');
        //context�� �׸��� �� ���� 
        this.ctx = this.canvas.getContext('2d')
        this.dpr = window.devicePixelRatio;
        this.resize(innerHeight, innerWidth);
    }

    static resize(canvasHeight, canvasWidth) {
        this.canvasHeight = canvasHeight;
        this.canvasWidth = canvasWidth;

        //canvas�� �⺻ width : 300, height: 150 ���� �����Ǿ�����. 
        //�׷��� canvas�� width, height ���� �����������.
        this.canvas.width = canvasWidth * this.dpr
        this.canvas.height = canvasHeight * this.dpr
        this.ctx.scale(this.dpr, this.dpr)
        
        this.canvas.style.width = canvasWidth + 'px'
        this.canvas.style.height = canvasHeight + 'px'
    }
}