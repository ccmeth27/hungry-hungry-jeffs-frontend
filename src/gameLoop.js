function loop(jeff, ballSprite, numOfBalls, ballsSpeed, time = 24){
  let eatingAudio = new Audio('sounds/eating.m4a')
  let gameAudio = new Audio('sounds/hungry-hungry-jeffs-track.mp3')
  gameAudio.volume = 0.15

  const scoreBar = document.getElementById("scorebar")
  const timeBar = document.getElementById("timebar")  
  const levelBar = document.getElementById("levelbar")

  let canvas = document.getElementById("canvas")
  let context = canvas.getContext("2d")
  let nextLevelDiv = document.getElementById("nextLevelDiv")
  const info = document.getElementById("info")
  let time_left = time
  timeBar.innerText = `Time Left: ${time}`
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

  document.addEventListener("keydown", keyDownHandler)

  function keyDownHandler(e){
    if(e.keyCode === 32){
      e.preventDefault()
      jeff.update()  
      // console.log("key down")
      if(down) return
      down = true
    }
  }

  document.addEventListener("keyup", keyUpHandler) 
  
  function keyUpHandler(e){
    if(e.keyCode === 32){
      jeff.update() 
      // console.log("key up")
      down = false
    }
  }

  let balls = new Array()
  for(let index = 0; index < numOfBalls; index ++) {
    balls.push(new Ball(300, 300, ballsSpeed))
  }

  canvas.style.display = ''
  scoreBar.style.display = ''
  timeBar.style.display = ''
  levelBar.style.display = ''
  info.style.display = "none"
  gameLoop()
  
  function gameLoop() {
      if(balls.length !== 0 && time_left !== 0){
          window.requestAnimationFrame(gameLoop)
          let height = 600
          let width  = 600
          context.canvas.height = height
          context.canvas.width = width
          gameAudio.play()

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
              eatingAudio.pause()
              eatingAudio.currentTime = 0
              eatingAudio.play()
              balls.splice(index, 1)
              score += 100
              scoreBar.innerText = `Score: ${score}`

            }

          ball.updatePosition(width, height)
          }

      }else{
        context.clearRect(0, 0, canvas.width, canvas.height)
        canvas.style.display = 'none'
        scoreBar.style.display = 'none'
        timeBar.style.display = 'none'
        levelBar.style.display = 'none'
        nextLevelDiv.style.display = ''
        balls = []
        time_left = 0
        info.style.display = ''
        gameAudio.pause()
        gameAudio.currentTime = 0
        eatingAudio.pause()
        eatingAudio.currentTime = 0
        document.removeEventListener("keydown", keyDownHandler)
        document.removeEventListener("keyup", keyUpHandler)
        return
      }
  }
}