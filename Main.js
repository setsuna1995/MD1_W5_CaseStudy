let canvas = document.querySelector('canvas')
canvas.width = innerWidth;
canvas.height = innerHeight;
let ctx = canvas.getContext('2d');
let player = new Player ();
let bullet = [];
let enemy = [];
function init () {
    player = new Player ();
    bullet = [];
    enemy = [];
    score = 0;
}
function spawmEnemies () {
    setInterval(() => {
        let r = 40;
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
        let angle = Math.atan2( canvas.height / 2 -y, canvas.width/2-x)
        let velocity = {
            x: Math.cos(angle)*2,
            y: Math.sin(angle)*2
        }
        enemy.push(new Enemies(x,y,r, 'red', velocity))
    }, 800)

}
let score = 0;
let  playSound = new  Audio('DduduDdudu-BLACKPINK-6291998.mp3')

function animate () {
    let animationID = requestAnimationFrame(animate)
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.drawPlayer()
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
            let distant = Math.hypot(canvas.width/2 - Enemies.position.x, canvas.height/2 - Enemies.position.y);
            if (distant - Enemies.r - player.r < 0) {
                cancelAnimationFrame(animationID)

                let choice = confirm('Your score is: ' + score + '. Are you want replay')
                console.log(choice)
                if (choice === true) {
                    restartGame()
                } else {
                    window.stop()
                    alert('See you again')
                    ctx.fillRect(0, 0, canvas.width, canvas.height)

                }
            }
                bullet.forEach((bull, bulletIndex) => {
                    let distant = Math.hypot(bull.x - Enemies.position.x, bull.y - Enemies.position.y);
                    if (distant - Enemies.r - 5 < 0) {
                        score += 100;
                        document.getElementById('scoreDis').innerHTML = score;
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
        x: Math.cos(angle)*3,
        y: Math.sin(angle)*3
    }
    bullet.push(new Bullet(
        canvas.width/2,
        canvas.height/2,
        5,
        'black',
        velocity)
    )
    console.log(bullet)
})
let choicePlay = confirm('Are you want play game?')
if ( choicePlay === true) {
    playSound.play()
    spawmEnemies()
    animate();
}
function restartGame () {
    init()
    spawmEnemies()
    animate();
}