class Player {
    constructor() {
        // this.x =x ;
        //     this.y = y;
        //     this.r = r;
        //     this.color = color;
        //     this.velocity = velocity


        this.width = 100;
        this.height = 100;

        this.position = {
            x: canvas.width / 2-50,
            y: canvas.height / 2-60
        }
        this.r = 3;
    }

    drawPlayer() {
        let image = new Image()
        this.image = image
        image.src = 'pngtree-ufo-png-image_7077225.png'
        let canvas = document.querySelector('canvas');
        let ctx = canvas.getContext('2d');
        ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        // img.onload = () => {
        //     ctx.drawImage(img, this.x, this.y)
        // }
        // ctx.beginPath();
        // ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        // ctx.fillStyle = this.color;
        // ctx.fill();
        // ctx.closePath();
    }
}