class Enemies {
    constructor(x,y,r,color, velocity) {
        this.r = 30;
        this.velocity= velocity;

        this.position = {
            x: x,
            y: y
        }
        this.width = 60;
        this.height = 60;
    }
    drawEnemies () {
        let image = new Image()
        this.image = image;
        image.src = 'images-removebg-preview.png';
        let canvas = document.getElementById('canvas');
        let ctx = canvas.getContext('2d');
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        // let canvas = document.getElementById('canvas')
        // let ctx = canvas.getContext('2d')
        // ctx.beginPath()
        // ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        // ctx.fillStyle = this.color;
        // ctx.fill()
        // ctx.closePath()

    }
    updateEnemies () {
        this.drawEnemies()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}