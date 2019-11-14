const USERS_URL = "http://127.0.0.1:3000/api/v1/users"
const GAMES_URL = "http://127.0.0.1:3000/api/v1/games"


document.addEventListener('DOMContentLoaded', () => {
  let statsShown = false

  const form = document.getElementById("form")
  const canvas = document.getElementById("canvas")
  let context = document.getElementById("canvas").getContext("2d")
  const statsButton = document.getElementById("statsButton")
  const statsTable = document.getElementById("statsTable")
  const startButton = document.getElementById("startButton")
  const scoreBar = document.getElementById("scorebar")
  const timeBar = document.getElementById("timebar")  
  const levelBar = document.getElementById("levelbar")
  const info = document.getElementById("info")

  let nextLevelButton = document.getElementById("nextLevel")


  let jeffImage = new Image()
  jeffImage.src = "images/jeff-animation.png"
  let bezosImage = new Image()
  bezosImage.src = "images/bezos-animation.png"
  let lebowskiImage = new Image()
  lebowskiImage.src = "images/lebowski-animation.png"
  
  let jeff = new Sprite(context, 505, 718, jeffImage, 0, 2)
  let jeffBezos = new Sprite(context, 505, 718, bezosImage, 0, 2)
  let jeffLebowski = new Sprite(context, 505, 718, lebowskiImage, 0, 2)

  let riceBallSprite = new Image()
  riceBallSprite.src = "images/riceball.png"
  let moneyBallSprite = new Image()
  moneyBallSprite.src = "images/moneyz.png"



  let balls = new Array()
  for(let index = 0; index < 12; index ++) {
    balls.push(new Ball(300, 300, 5))
  }



  function addPlayerToDB(userObj){
    fetch(USERS_URL, {
      method: "POST",
      headers: {
          "content-type": "application/json",
          accepts: "application/json"
      },
      body: JSON.stringify(userObj)
  })
  .then(resp => resp.json())
  .then(json => console.log(json))
  }

  


  form.addEventListener("submit", submitHandler)

  function submitHandler(e){
    e.preventDefault()
    let username = e.target[0].value
    let initials = e.target[1].value
    let profile_pic_path = e.target[2].value
    let userObj = {
      username: username,
      initials: initials,
      profile_pic_path: profile_pic_path
    }
    addPlayerToDB(userObj)
    startButton.style.display = ''
    statsButton.style.display = ''
    form.style.display = 'none'
  }

  startButton.addEventListener("click", startHandler)

  function startHandler(e){
    startButton.style.display = 'none'
    canvas.style.display = ''
    scoreBar.style.display = ''
    timeBar.style.display = ''
    levelBar.style.display = ''
    loop(timeBar, scoreBar, jeff, riceBallSprite, balls)
  }

  statsButton.addEventListener("click", showStatsHandler)

  function showStatsHandler(e){
    if(statsShown === false){
      statsShown = true
      statsTable.style.display = ''
    }else{
      statsShown = false
      statsTable.style.display = 'none'
    }
  }

  nextLevelButton.addEventListener("click", proceedToNextLevelHandler)

  function proceedToNextLevelHandler(e){
    balls = []
    canvas.style.display = ''
    nextLevelButton.style.display = 'none'
    if(parseInt(levelBar.innerText.split(" ")[1]) === 1 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 2"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 12))
      }
      loop(timeBar, scoreBar, jeffLebowski, moneyBallSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 2 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 3"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 12))
      }
      loop(timeBar, scoreBar, jeffBezos, moneyBallSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 3 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 4"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 12))
      }
      loop(timeBar, scoreBar, jeffLebowski, moneyBallSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 4 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 5"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 12))
      }
      loop(timeBar, scoreBar, jeffLebowski, moneyBallSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 5 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 6"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 12))
      }
      loop(timeBar, scoreBar, jeffLebowski, moneyBallSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 6 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 7"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 12))
      }
      loop(timeBar, scoreBar, jeffLebowski, moneyBallSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 7 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 8"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 12))
      }
      loop(timeBar, scoreBar, jeffLebowski, moneyBallSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 8 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 9"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 12))
      }
      loop(timeBar, scoreBar, jeffLebowski, moneyBallSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 9 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      canvas.style.display = 'none'
      let img = document.createElement("img")
      img.src = "images/you-win.png"
      info.appendChild(img)
    }else{
      canvas.style.display = 'none'
      let img = document.createElement("img")
      img.src = "images/you-lose.png"
      let h1 = document.createElement("h1")
      h1.innerText = `${scoreBar.innerText.split(" ")[1]} is not enough to proceed to next level`
      info.appendChild(img)
      info.appendChild(h1)
    }


  }
  
})
