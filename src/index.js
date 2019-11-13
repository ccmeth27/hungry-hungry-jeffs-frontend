// const playerStatsBtn = document.getElementById("playerStatsButton")


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("form")
  const canvas = document.getElementById("canvas")
  const startButton = document.getElementById("startButton")
  const scoreBar = document.getElementById("scorebar")

  const timeBar = document.getElementById("timebar")

  const levelBar = document.getElementById("levelbar")
  const playerStatsBtn = document.getElementById("playerStatsButton")

  playerStatsBtn.addEventListener("click", function (e) {
    console.log("button clicked")
})

  form.addEventListener("submit", submitHandler)

  function submitHandler(e){
    e.preventDefault()
    let username = e.target[0].value
    let initials = e.target[1].value
    startButton.style.display = ''
    form.style.display = 'none'
  }

  startButton.addEventListener("click", startHandler)

  function startHandler(e){
    startButton.style.display = 'none'
    canvas.style.display = ''
    scoreBar.style.display = ''
    timeBar.style.display = ''
    levelBar.style.display = ''
    gameLoop()
    setInterval(() => {
      if(time_left > 0){
        time_left -= 1 
        timeBar.innerText = `Time Left: ${time_left} seconds`
        return
      }
    }, 1000);


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
  }

  let down = false
  let score = 0
  let time_left = 24
  
  let context = document.querySelector("canvas").getContext("2d")
  let balls = new Array()

  let jeffImage = new Image()
  jeffImage.src = "images/jeff-animation.png"
  let jeff = new Sprite(context, 505, 718, jeffImage, 0, 2)
  let x = 300
  let y = 300
  for(let index = 0; index < 12; index ++) {
    balls.push(new Ball(x, y, 15))
  }
  function gameLoop() {
    

    let ballSprite = new Image()
    ballSprite.src = "images/riceball.png"
    
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
      // context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      context.fill()
      context.drawImage(ballSprite, ball.x, ball.y, 40, 40)
      
      if (ball.x < 345 && ball.x > 255 && ball.y > 460 && ball.y < 500 && down === true) {
        balls.splice(index, 1)
        score += 100
        scoreBar.innerText = `Score: ${score}`
      }

      ball.updatePosition(width, height)

    }
    // context.arc(300, 300, ball.radius, 0, Math.PI * 2)
    // context.fill()
    // context.drawImage(ourJeffSprite, 250, 530, 100, 100)  
    // jeff.update()
  }
  
})