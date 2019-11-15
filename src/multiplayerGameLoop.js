function multiLoop(game_mode = "2",jeff_left_pic, jeff_right_pic, ballSprite, numOfBalls, ballsSpeed, time= 24, jeff_top_pic, jeff_bottom_pic){
    let eatingAudio = new Audio('sounds/eating.m4a')
    let gameAudio = new Audio('sounds/hungry-hungry-jeffs-track.mp3')
    gameAudio.volume = 0.15
  
    const leftScoreBar = document.getElementById("p1scorebar")
    const rightScoreBar = document.getElementById("p2scorebar")
    const timeBar = document.getElementById("2ptimebar")
  
    let canvas = document.getElementById("canvas")
    let context = canvas.getContext("2d")
    let restartDiv = document.getElementById("restartDiv2p")
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
    let down_right = false
    let down_left = false
    let leftScore = parseInt(leftScoreBar.innerText.split(" ")[1])
    let rightScore = parseInt(rightScoreBar.innerText.split(" ")[1])

    let jeff_top, jeff_bottom
    let jeff_right = new Sprite(context, 505, 718, jeff_right_pic, 0, 2)
    let jeff_left = new Sprite(context, 505, 718, jeff_left_pic, 0, 2)

    let topScoreBar = document.getElementById("p3scorebar")
    let bottomScoreBar = document.getElementById("p4scorebar")
    let down_top = false
    let down_bottom = false
    let topScore = parseInt(topScoreBar.innerText.split(" ")[1])
    let bottomScore = parseInt(bottomScoreBar.innerText.split(" ")[1])
    if(game_mode === "4"){
      jeff_top = new Sprite(context, 505, 718, jeff_top_pic, 0, 2)
      jeff_bottom = new Sprite(context, 505, 718, jeff_bottom_pic, 0, 2)
    }
  
    document.addEventListener("keydown", keyDownHandler)
  
    function keyDownHandler(e){
      if(e.keyCode === 65){
        e.preventDefault()
        jeff_left.update()  
        // console.log("key down")
        if(down_left) return
        down_left = true
      }else if(e.keyCode === 76){
        e.preventDefault()
        jeff_right.update()  
        // console.log("key down")
        if(down_right) return
        down_right = true
      }
      if(game_mode === "4"){
        if(e.keyCode === 67){
          e.preventDefault()
          jeff_bottom.update()  
          // console.log("key down")
          if(down_bottom) return
          down_bottom = true
        }else if(e.keyCode === 78){
          e.preventDefault()
          jeff_top.update()  
          // console.log("key down")
          if(down_top) return
          down_top = true
        }
      }
    }
    //65- a  76- l 67- c 78- n
  
    document.addEventListener("keyup", keyUpHandler) 
    
    function keyUpHandler(e){
      if(e.keyCode === 65){
        jeff_left.update() 
        // console.log("key up")
        down_left = false
      }else if(e.keyCode === 76){
        jeff_right.update() 
        // console.log("key up")
        down_right = false
      }
      if(game_mode === "4"){
        if(e.keyCode === 67){
          jeff_bottom.update() 
          // console.log("key up")
          down_botjeff_bottom = false
        }else if(e.keyCode === 78){
          jeff_top.update() 
          // console.log("key up")
          down_top = false
        }
      }
    }
  
    let balls = new Array()
    for(let index = 0; index < numOfBalls; index ++) {
      balls.push(new Ball(300, 300, ballsSpeed))
    }
  
    canvas.style.display = ''
    leftScoreBar.style.display = ''
    rightScoreBar.style.display = ''
    timeBar.style.display = ''
    info.style.display = "none"
    if(game_mode === "4"){
      topScoreBar.style.display = ''
      bottomScoreBar.style.display = ''
      multiGameLoop("4")
    }else{
      multiGameLoop("2")
    }
    
    function multiGameLoop(numOfPlayers = "2") {
        if(balls.length !== 0 && time_left !== 0){
            window.requestAnimationFrame(multiGameLoop)
            let height = 600
            let width  = 600
            context.canvas.height = height
            context.canvas.width = width
            gameAudio.play()
  
            context.beginPath()
            context.fillStyle = "#dbf02c"
            context.fillRect(570,220,30,30) //105  470 dbf02c
            context.fillStyle = "#21dd21"
            context.fillRect(0,220,30,30)
            jeff_left.multiRender("left")
            jeff_right.multiRender("right")
            context.closePath()
  
            for(let index = 0; index < balls.length; index ++) {
              let ball = balls[index]
              context.fillStyle = "rgba(0, 0, 0, 0)"
              context.beginPath()
              context.fill()
              context.drawImage(ballSprite, ball.x, ball.y, 40, 40)
              
              if (ball.x < 510 && ball.x > 470 && ball.y > 255 && ball.y < 345 && down_right === true) {
                eatingAudio.pause()
                eatingAudio.currentTime = 0
                eatingAudio.play()
                balls.splice(index, 1)
                rightScore += 100
                rightScoreBar.innerText = `Score: ${rightScore}`
              }else if (ball.x < 145 && ball.x > 105 && ball.y > 255 && ball.y < 345 && down_left === true) {
                eatingAudio.pause()
                eatingAudio.currentTime = 0
                eatingAudio.play()
                balls.splice(index, 1)
                leftScore += 100
                leftScoreBar.innerText = `Score: ${leftScore}`
              }
  
            ball.updatePosition(width, height)
            }
  
        }else{
          context.clearRect(0, 0, canvas.width, canvas.height)
          canvas.style.display = 'none'
          timeBar.style.display = 'none'
          restartDiv.style.display = ''
          balls = []
          time_left = 0
          info.style.display = ''
          gameAudio.pause()
          gameAudio.currentTime = 0
          eatingAudio.pause()
          eatingAudio.currentTime = 0
          document.removeEventListener("keydown", keyDownHandler)
          document.removeEventListener("keyup", keyUpHandler)
          let img = document.createElement("img")
          let h4 = document.createElement("h4")
          if(parseInt(rightScoreBar.innerText.split(" ")[1]) > parseInt(leftScoreBar.innerText.split(" ")[1])){
            h4.innerText = `Yellow won!`
          }else if(parseInt(leftScoreBar.innerText.split(" ")[1]) > parseInt(rightScoreBar.innerText.split(" ")[1])){
            h4.innerText = `Green won!`
          }else{
            img.src = "images/tie-game.jpg"
            h4.innerText = `It's a tie!`
          }
            h4.dataset.loss_id = "loss"
            h4.id = "win_lose"
            info.appendChild(img)
            info.appendChild(h4)
          return
        }
    }
  }