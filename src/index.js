

document.addEventListener('DOMContentLoaded', () => {

  let down = false
  let score = 0
  
  let context = document.querySelector("canvas").getContext("2d")
  let balls = new Array()

  let jeffImage = new Image()
  jeffImage.src = "images/bezos-animation.png"
  let jeff = new Sprite(context, 505, 718, jeffImage, 0, 2)
  let x = 300
  let y = 300
  for(let index = 0; index < 12; index ++) {
    balls.push(new Ball(x, y, 15))
  }
  function loop() {
    let ballSprite = new Image()
    ballSprite.src = "images/moneyz.png"
    
    window.requestAnimationFrame(loop)
    let height = 600
    let width  = 600
    context.canvas.height = height
    context.canvas.width = width

    context.beginPath()
    // context.fillRect(255,420,90,80);
    jeff.render()
    context.closePath()

    for(let index = 0; index < balls.length; index ++) {
      let ball = balls[index]
      context.fillStyle = "rgba(0, 0, 0, 0)"
      context.beginPath()
      // context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      context.fill()
      context.drawImage(ballSprite, ball.x, ball.y, 40, 40)
      
      if (ball.x < 345 && ball.x > 255 && ball.y > 420 && ball.y < 500 && down === true) {
        balls.splice(index, 1)
        score += 100
        console.log(score)
      }

      ball.updatePosition(width, height)

    }
    // context.arc(300, 300, ball.radius, 0, Math.PI * 2)
    // context.fill()
    // context.drawImage(ourJeffSprite, 250, 530, 100, 100)  
    // jeff.update()
  }
  document.addEventListener("keydown", (e) => {
    if(e.keyCode === 32){
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
  loop()
  
})