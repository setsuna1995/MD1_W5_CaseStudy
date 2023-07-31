let canvas = document.querySelector('canvas')
 canvas.width = innerWidth;
 canvas.height = innerHeight;
const scoreDis = document.querySelector('#scoreDis')
let ctx = canvas.getContext('2d');
const player = new Player (canvas.width/2, canvas.height/2, 30, 'red');
let bullet = [];
let enemy = [];
let particles = []
function spawmEnemies () {
    setInterval(() => {
        let r = Math.random()*(30-10) +10;
        let x
        let y
        if (Math.random()<0.5) {
            x = Math.random() <0.5?0-r:canvas.width + r
            y = Math.random()*canvas.height
        }
        else {
            x = Math.random() *canvas.width
            y = Math.random() <0.5?0-r:canvas.height + r
        }
        let color = 'hsl (0,50%, 50%)'
        let angle = Math.atan2( canvas.height / 2 -y, canvas.width/2-x)
        let velocity = {
            x: Math.cos(angle),
            y: Math.sin(angle)
        }
        enemy.push(new Enemies(x,y,r,color,velocity))
    }, 1000)

}

function animate () {
    let animationID = requestAnimationFrame(animate)
    let score = 0 ;
    ctx.fillStyle = 'rgba(0,0,0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.drawPlayer()
        particles.forEach((particle, index) => {
            if(particle.alpha <= 0){
                particles.splice(index, 1)
            } else {
                particle.update()
            }
        })
        bullet.forEach((bull, bulletIndex) => {
            bull.update()
            if(bull.x + bull.r < 0 ||
                bull.x - bull.r >canvas.width ||
                bull.y + bull.r < 0 ||
                bull.y - bull.r > canvas.height
            ){
                setTimeout(() => {
                    bullet.splice(bulletIndex, 1)
                }, 0)
            }
        })
        enemy.forEach((Enemies, enemyIndex) => {
            Enemies.updateEnemies()
            let distant = Math.hypot(player.x - Enemies.x, player.y - Enemies.y);
            if (distant - Enemies.r - player.r < 1) {
                cancelAnimationFrame(animationID)
            }
            bullet.forEach((bull, bulletIndex) => {
                let distant = Math.hypot(bull.x - Enemies.x, bull.y - Enemies.y);
                if (distant - Enemies.r - bull.r < 1) {
                    score += 100
                    console.log(score)
                    scoreDis.innerHTML = score;
                    setTimeout(() => {
                        enemy.splice(enemyIndex, 1)
                        bullet.splice(bulletIndex, 1)
                    }, 0)
                }

            })
        })
    }
addEventListener('click', (evt) => {
    let angle = Math.atan2(
        evt.clientY - canvas.height / 2,
        evt.clientX - canvas.width/2)
    let velocity = {
        x: Math.cos(angle)*4,
        y: Math.sin(angle)*4
    }
        let x = Math.floor(Math.random() * 256);
        let y = Math.floor(Math.random() * 256);
        let z = Math.floor(Math.random() * 256);
        let bgColor = "rgb(" + x + "," + y + "," + z + ")";
    bullet.push(new Bullet(
        canvas.width/2,
        canvas.height/2,
        5,
        bgColor,
        velocity)
    )
})
spawmEnemies()
animate();