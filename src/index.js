

document.addEventListener('DOMContentLoaded', () => {
  
  let context = document.querySelector("canvas").getContext("2d")
  let balls = new Array()

  let jeffImage = new Image()
  jeffImage.src = "images/jeff-animation.png"
  let jeff = new Sprite(context, 1010, 718, jeffImage, 90, 4)
  let x = 300
  let y = 300
  for(let index = 0; index < 12; index ++) {
    balls.push(new Ball(x, y, 15))
  }
  function loop() {
    let ballSprite = new Image()
    ballSprite.src = "images/riceball.png"

    let ourJeffSprite = new Image()
    ourJeffSprite.src = "images/jeff.png"
    
    window.requestAnimationFrame(loop)
    let height = 600
    let width  = 600
    context.canvas.height = height
    context.canvas.width = width
    for(let index = 0; index < balls.length; index ++) {
      let ball = balls[index]
      context.fillStyle = "rgba(0, 0, 0, 0)"
      context.beginPath()
      // context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
      context.fill()
      context.drawImage(ballSprite, ball.x, ball.y, 40, 40)
      
      if (ball.x < 270 && ball.x > 220 && ball.y > 500 && ball.y < 600) {
        balls.splice(index, 1)
      }

      ball.updatePosition(width, height)

    }
    context.beginPath()
    context.fillRect(255,420,90,80);
    // context.arc(300, 300, ball.radius, 0, Math.PI * 2)
    // context.fill()
    // context.drawImage(ourJeffSprite, 250, 530, 100, 100)  
    jeff.update()
    jeff.render()

  }
  loop()
  
})