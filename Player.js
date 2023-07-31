class Player {
    constructor(x,y,r,color,velocity) {
        this.x =x ;
            this.y = y;
            this.r = r;
            this.color = color;
            this.velocity = velocity
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
    }

    drawPlayer() {

        // img.onload = () => {
        //     ctx.drawImage(img, this.x, this.y)
        // }
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}