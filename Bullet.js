class Bullet {
    constructor(x,y,r,color,velocity) {
        this.x =x;
        this.y=y;
        this.r=r;
        this.color = color
        this.velocity=velocity;
    }
    drawBullet () {
        let canvas = document.getElementById('canvas')
        let ctx = canvas.getContext('2d')
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = 'red' ;
        ctx.fill()
        ctx.closePath()
    }
    update () {
        this.drawBullet()
        this.x += this.velocity.x
        this.y += this.velocity.y
    }
}