function loop(timeBar, scoreBar, jeff, ballS, context){
    let time_left = 4
    // change to 24
    let interval = setInterval(() => {
        if(time_left > 0){
          time_left -= 1 
          timeBar.innerText = `Time Left: ${time_left} seconds`
          return
        } else{
          clearInterval(interval)
        }
      }, 1000)
    let down = false
    let score = parseInt(scoreBar.innerText.split(" ")[1])

    document.addEventListener("keydown", (e) => {
        if(e.keyCode === 32){
          e.preventDefault()
          jeff.update()  
          console.log("key down")
          if(down) return
          down = true
        }
      })
      document.addEventListener("keyup", (e) => {
        if(e.keyCode === 32){
          jeff.update() 
          console.log("key up")
          down = false
        }
      })

    
    let balls = new Array()
    
    let x = 300
    let y = 300
    for(let index = 0; index < 12; index ++) {
      balls.push(new Ball(x, y, 15))
    }
    gameLoop(true)
    
    function gameLoop(keepGoing) {
        let animation
        if(keepGoing){
            animation = window.requestAnimationFrame(gameLoop)
            let height = 600
            let width  = 600
            context.canvas.height = height
            context.canvas.width = width

            context.beginPath()
            // context.fillRect(255,460,90,40);
            jeff.render()
            context.closePath()

            for(let index = 0; index < balls.length; index ++) {
            let ball = balls[index]
            context.fillStyle = "rgba(0, 0, 0, 0)"
            context.beginPath()
            context.fill()
            context.drawImage(ballS, ball.x, ball.y, 40, 40)
            
            if (ball.x < 345 && ball.x > 255 && ball.y > 460 && ball.y < 500 && down === true) {
                balls.splice(index, 1)
                score += 100
                scoreBar.innerText = `Score: ${score}`
            }

            ball.updatePosition(width, height)
            }

        }else{
            window.cancelAnimationFrame(animation)
        }
        setTimeout(function () { 
            gameLoop(false)
        }, 4000)
    }
}