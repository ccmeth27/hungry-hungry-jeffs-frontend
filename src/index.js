const USERS_URL = "http://127.0.0.1:3000/api/v1/users"
const GAMES_URL = "http://127.0.0.1:3000/api/v1/games"


document.addEventListener('DOMContentLoaded', () => {
  updateLeaderboard()
  addCarouselListeners()
  addSelectorListeners()

  const form = document.getElementById("form")
  const canvas = document.getElementById("canvas")
  const context = document.getElementById("canvas").getContext("2d")
  // const statsButton = document.getElementById("statsButton")
  const startButton = document.getElementById("startButton")
  const scoreBar = document.getElementById("scorebar")
  const timeBar = document.getElementById("timebar")  
  const levelBar = document.getElementById("levelbar")
  const info = document.getElementById("info")

  const carousel = document.getElementById("myCarousel")
  const nextLevelButton = document.getElementById("nextLevel")
  const nextLevelDiv = document.getElementById("nextLevelDiv")

  const statsTable = document.getElementById("playerStatsTableBody")
  const leaderboard = document.getElementById("leaderboardTable")


  let jeffImage = new Image()
  jeffImage.src = "images/jeff-animation.png"
  let bezosImage = new Image()
  bezosImage.src = "images/bezos-animation.png"
  let goldblumImage = new Image()

  let lebowskiImage = new Image()
  lebowskiImage.src = "images/lebowski-animation.png"
  
  let jeff = new Sprite(context, 505, 718, jeffImage, 0, 2)
  let jeffBezos = new Sprite(context, 505, 718, bezosImage, 0, 2)
  let jeffLebowski = new Sprite(context, 505, 718, lebowskiImage, 0, 2)
  let jeffGoldblum = new Sprite(context, 505, 718, goldblumImage, 0, 2)

  // generic Jeff sprites
  let riceBallSprite = new Image()
  riceBallSprite.src = "images/riceball.png"
  let basketBallSprite = new Image()
  basketBallSprite.src = "images/basketball.png"
  let edamameBallSprite = new Image()
  edamameBallSprite.src = "images/edamame.png"

  // goldblum sprites
  let dinosaurSprite = new Image()
  dinosaurSprite.src = "images/t-rex-dinosaur-head.png"
  let alienSprite = new Image ()
  alienSprite.src = "images/spaceship.png"
  let pianoSprite = new Image ()
  pianoSprite.src = "images/piano.png"
  
  // bridges sprites
  let whiteRussianSprite = new Image()
  whiteRussianSprite.src = "images/white-russian.png"
  let bowlingSprite = new Image ()
  bowlingSprite.src = "images/bowling.png"
  let tronDiscSprite = new Image ()
  tronDiscSprite.src = "images/tron-disc.png"

  // bezos sprites
  let bookSprite = new Image ()
  bookSprite.src ="images/books.png"
  let boxSprite = new Image ()
  boxSprite.src = "images/amazon-box.png"
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
  .then(json => {
    const gameRecordNumber = json.data.attributes.games.length
    const gameRecords = json.data.attributes.games

    if(gameRecordNumber > 0){
      gameRecords.forEach(populatePersonalStats)
    }
  })
  }

  function populatePersonalStats(gameRec){
    let t = ""

    let tr = "<tr>"
    tr += `<td>${gameRec.score}</td>`
    tr += `<td>${gameRec.level}</td>`
    tr += `<td>${gameRec.created_at}</td>`
    tr += "</tr>"
    t += tr

    statsTable.innerHTML += t
  }

  function updateLeaderboard(){
    fetch(GAMES_URL)
    .then(resp => resp.json())
    .then(json => json.data.forEach(populateLeaderboard))
  }

  function populateLeaderboard(gameRec){
    let t = ""
    let tr = "<tr>"
    tr += `<td>${gameRec.attributes.user.username}</td>`
    tr += `<td>${gameRec.attributes.user.initials}</td>`
    tr += `<td>${gameRec.attributes.score}</td>`
    tr += `<td>${gameRec.attributes.level}</td>`
    tr += `<td>${gameRec.attributes.created_at}</td>`
    tr += "</tr>"
    t += tr

    leaderboard.innerHTML += t
  }

  


  form.addEventListener("submit", submitHandler)

  function submitHandler(e){
    e.preventDefault()
    startButton.style.display = ''
    form.style.display = 'none'
    let username = e.target[0].value
    let initials = e.target[1].value
    let userObj = {
      username: username,
      initials: initials
    }
    addPlayerToDB(userObj)
  }

  startButton.addEventListener("click", startHandler)

  function startHandler(e){
    startButton.style.display = 'none'
    canvas.style.display = ''
    scoreBar.style.display = ''
    timeBar.style.display = ''
    levelBar.style.display = ''
    carousel.style.display = 'none'
    loop(timeBar, scoreBar, jeff, riceBallSprite, balls)
  }


  nextLevelButton.addEventListener("click", proceedToNextLevelHandler)

  function proceedToNextLevelHandler(e){
    balls = []
    canvas.style.display = ''
    nextLevelDiv.style.display = 'none'
    if(parseInt(levelBar.innerText.split(" ")[1]) === 1 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 2"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 8))
      }
      loop(timeBar, scoreBar, jeff, basketBallSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 2 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 3"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 6))
      }
      loop(timeBar, scoreBar, jeff, edamameBallSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 3 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 4"
      for(let index = 0; index < 10; index ++) {
        balls.push(new Ball(300, 300, 6))
      }
      loop(timeBar, scoreBar, jeff, dinosaurSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 4 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 5"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 7))
      }
      loop(timeBar, scoreBar, jeff, alienSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 5 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 6"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 6))
      }
      loop(timeBar, scoreBar, jeff, pianoSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 6 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 7"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 6))
      }
      loop(timeBar, scoreBar, jeffLebowski, whiteRussianSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 7 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 8"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 7))
      }
      loop(timeBar, scoreBar, jeffLebowski, tronDiscSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 8 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 9"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 9))
      }
      loop(timeBar, scoreBar, jeffLebowski, bowlingSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 9 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 10"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 6))
      }
      loop(timeBar, scoreBar, jeffBezos, bookSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 10 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 11"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 10))
      }
      loop(timeBar, scoreBar, jeffBezos, boxSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 11 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 12"
      for(let index = 0; index < 12; index ++) {
        balls.push(new Ball(300, 300, 8))
      }
      loop(timeBar, scoreBar, jeffBezos, moneyBallSprite, balls)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 12 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
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
