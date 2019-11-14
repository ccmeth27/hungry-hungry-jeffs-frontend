function loop(timeBar, scoreBar, jeff, ballSprite, balls){
    let canvas = document.getElementById("canvas")
    let context = canvas.getContext("2d")
    let nextLevelButton = document.getElementById("nextLevel")
    let time_left = 24
    // change to 24
    let interval = setInterval(() => {
        if(time_left > 0){
          time_left -= 1 
          timeBar.innerText = `Time Left: ${time_left}`
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

    
    
    gameLoop()
    if(status === "times up") return score
    function gameLoop() {
        if(balls !== [] && time_left !== 0){
            window.requestAnimationFrame(gameLoop)
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
              context.drawImage(ballSprite, ball.x, ball.y, 40, 40)
              
              if (ball.x < 345 && ball.x > 255 && ball.y > 460 && ball.y < 500 && down === true) {
                  balls.splice(index, 1)
                  score += 100
                  scoreBar.innerText = `Score: ${score}`
              }

            ball.updatePosition(width, height)
            }

        }else{
          context.clearRect(0, 0, canvas.width, canvas.height)
          canvas.style.display = 'none'
          nextLevelButton.style.display = ''
          balls = []

          return
        }
    }
}