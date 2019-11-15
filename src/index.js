const USERS_URL = "http://127.0.0.1:3000/api/v1/users"
const GAMES_URL = "http://127.0.0.1:3000/api/v1/games"


document.addEventListener('DOMContentLoaded', () => {
  getLeaderboard()
  addCarouselListeners()
  addSelectorListeners()

  const playerNumDiv = document.getElementById("chooseNumOfPlayers")
  const one_player = document.getElementById("1pButton")
  const two_players = document.getElementById("2pButton")
  const four_players = document.getElementById("4pButton")
  const restartMultiButton = document.getElementById("restart2p")
  const restartMultiDiv = document.getElementById("restartDiv2p")
  const leftScoreBar = document.getElementById("p1scorebar")
  const rightScoreBar = document.getElementById("p2scorebar")

  const multiplayerForm = document.getElementById("gameSettings2p")  
  const numOfBallsMulti = document.getElementById("numOfBalls")
  const ballsSpeedMulti = document.getElementById("ballsSpeed")
  const timeToPlayMulti = document.getElementById("timeToPlay")
  const numOfBallsSlider = document.querySelector(`[data-selector="1"]`)
  const ballsSpeedSlider = document.querySelector(`[data-selector="2"]`)
  const timeToPlaySlider = document.querySelector(`[data-selector="3"]`)


  let player_id
  let leaderboardGames = new Array()
  let personalGames = new Array()

  const form = document.getElementById("form")
  const canvas = document.getElementById("canvas")
  const context = document.getElementById("canvas").getContext("2d")
  const startButton = document.getElementById("startButton")
  const scoreBar = document.getElementById("scorebar")
  const levelBar = document.getElementById("levelbar")
  const info = document.getElementById("info")

  const carousel = document.getElementById("myCarousel")
  const nextLevelButton = document.getElementById("nextLevel")
  const nextLevelDiv = document.getElementById("nextLevelDiv")

  const restartButton = document.getElementById("restart")
  const restartDiv = document.getElementById("restartDiv")

  const statsTable = document.getElementById("playerStatsTableBody")
  const leaderboard = document.getElementById("leaderboardTableBody")


  let jeffImage = new Image()
  jeffImage.src = "images/jeff-animation.png"
  let jeffExtraImage = new Image()
  jeffExtraImage.src = "images/jeff-secret-animation.png"
  let bezosImage = new Image()
  bezosImage.src = "images/bezos-animation.png"
  let goldblumImage = new Image()
  goldblumImage.src = "images/goldblum-animation.png"
  let lebowskiImage = new Image()
  lebowskiImage.src = "images/lebowski-animation.png"
  
  let jeff = new Sprite(context, 505, 718, jeffImage, 0, 2)
  let jeffTheBoss = new Sprite(context, 505, 718, jeffExtraImage, 0, 2)
  let jeffBezos = new Sprite(context, 505, 718, bezosImage, 0, 2)
  let jeffLebowski = new Sprite(context, 505, 718, lebowskiImage, 0, 2)
  let jeffGoldblum = new Sprite(context, 505, 718, goldblumImage, 0, 2)

  let multiCharsImages = [jeffImage, bezosImage, jeffExtraImage, goldblumImage, lebowskiImage]

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

  let multiBalls = [riceBallSprite, basketBallSprite, edamameBallSprite, dinosaurSprite, alienSprite, pianoSprite, whiteRussianSprite, bowlingSprite, tronDiscSprite, bookSprite, boxSprite, moneyBallSprite]


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
      player_id = json.data.attributes.id
      const gameRecordNumber = json.data.attributes.games.length
      const gameRecords = json.data.attributes.games

      if(gameRecordNumber > 0){
        statsTable.innerText = ''
        gameRecords.forEach(game => {personalGames.push(game)})
        personalGames.forEach(populatePersonalStats)
      }
    })
  }

  function addGameToDB(gameObj){
    fetch(GAMES_URL, {
      method: "POST",
      headers: {
          "content-type": "application/json",
          accepts: "application/json"
      },
      body: JSON.stringify(gameObj)
    })
    .then(resp => resp.json())
    .then(json => {
      if(json.data.attributes.score > 0){
        statsTable.innerText = ''
        personalGames.push(json.data.attributes)
        personalGames.forEach(populatePersonalStats)
      }

      if(json.data.attributes.score > leaderboardGames[leaderboardGames.length - 1].attributes.score){
        leaderboard.innerText = ''
        for (let index = 0; index < leaderboardGames.length-1; index++) {
          const element = leaderboardGames[index]
          const next_element = leaderboardGames[index+1]
          if(json.data.attributes.score > element.attributes.score){
            leaderboardGames.unshift(json.data)
            leaderboardGames.pop()
            break
          }else if(json.data.attributes.score >= next_element.attributes.score && json.data.attributes.score < element.attributes.score) {
            leaderboardGames.splice(index+1, 0, json.data)
            leaderboardGames.pop()
            break
          }
        }
        leaderboardGames.forEach(populateLeaderboard)
      }
    })
  }

  function populatePersonalStats(gameRec){
    const date = gameRec.created_at.split("T")[0]
    const time = gameRec.created_at.split("T")[1].split(".")[0]

    let t = ""
    let tr = "<tr>"
    tr += `<td>${gameRec.score}</td>`
    tr += `<td>${gameRec.level}</td>`
    tr += `<td>${date} ${time}</td>`
    tr += "</tr>"
    t += tr

    statsTable.innerHTML += t
  }

  function getLeaderboard(){
    fetch(GAMES_URL)
    .then(resp => resp.json())
    .then(json => {
      leaderboard.innerText = ''
      json.data.forEach(game => {leaderboardGames.push(game)})
      leaderboardGames.forEach(populateLeaderboard)
    })
  }

  function populateLeaderboard(gameRec){
    const date = gameRec.attributes.created_at.split("T")[0]
    const time = gameRec.attributes.created_at.split("T")[1].split(".")[0]

    let t = ""
    let tr = "<tr>"
    tr += `<td>${gameRec.attributes.user.username}</td>`
    tr += `<td>${gameRec.attributes.user.initials}</td>`
    tr += `<td>${gameRec.attributes.score}</td>`
    tr += `<td>${gameRec.attributes.level}</td>`
    tr += `<td>${date} ${time}</td>`
    tr += "</tr>"
    t += tr

    leaderboard.innerHTML += t
  }


  one_player.addEventListener("click", singlePlayerHandler)

  function singlePlayerHandler(e){
    playerNumDiv.style.display = "none"
    form.style.display = ""
  }

  two_players.addEventListener("click", twoPlayersHandler)

  function twoPlayersHandler(e){
    playerNumDiv.style.display = "none"
    multiplayerForm.style.display = ""
    info.getElementsByTagName("h5")[0].remove()

    numOfBallsMulti.addEventListener("input", (e) => {
      numOfBallsSlider.innerText = `${e.target.value}`
    })
    ballsSpeedMulti.addEventListener("input", (e) => {
      ballsSpeedSlider.innerText = `${e.target.value}`
    })
    timeToPlayMulti.addEventListener("input", (e) => {
      timeToPlaySlider.innerText = `${e.target.value}`
    })
  }

  multiplayerForm.addEventListener("submit", handleMultiplayerSettings)

  function handleMultiplayerSettings(e){
    e.preventDefault()
    carousel.style.display = "none"
    multiplayerForm.style.display = "none"
    multiLoop("2", multiCharsImages[Math.floor(Math.random()*multiCharsImages.length)], multiCharsImages[Math.floor(Math.random()*multiCharsImages.length)], multiBalls[Math.floor(Math.random()*multiBalls.length)], e.target[0].value,  e.target[1].value, e.target[2].value)
  }

  
  form.addEventListener("submit", submitHandler)

  function submitHandler(e){
    e.preventDefault()
    let username = e.target[0].value
    let initials = e.target[1].value
    if(/\S/.test(username) && initials.length === 3 && /^[A-Z_0-9]*$/.test(initials)){
      startButton.style.display = ''
      form.style.display = 'none'
      let userObj = {
        username: username,
        initials: initials
      }
      addPlayerToDB(userObj)
    }else{
      window.alert("Username can not be blank\nand initials should be 3\nuppercase letters and/or numbers")
    }
  }

  startButton.addEventListener("click", startHandler)

  function startHandler(e){
    startButton.style.display = 'none'
    carousel.style.display = 'none'
    info.getElementsByTagName("h5")[0].remove()
    loop(jeff, riceBallSprite, 12, 5)
  }

  restartButton.addEventListener("click", rastartHandler)

  function rastartHandler(e){
    levelBar.innerText = "Level 1"
    scoreBar.innerText = "Score: 0"
    balls = []
    document.querySelectorAll(`[data-loss_id="loss"]`).forEach((el) => el.remove())
    canvas.style.display = ''
    loop(jeff, riceBallSprite, 12, 5)
    restartDiv.style.display = 'none'
  }

  restartMultiButton.addEventListener("click", restartMultiHandler)
  
  function restartMultiHandler(e){
    leftScoreBar.innerText = "Score: 0"
    rightScoreBar.innerText = "Score: 0"
    balls = []
    canvas.style.display = ''
    document.querySelectorAll(`[data-loss_id="loss"]`).forEach((el) => el.remove())
    multiLoop("2", multiCharsImages[Math.floor(Math.random()*multiCharsImages.length)], multiCharsImages[Math.floor(Math.random()*multiCharsImages.length)], multiBalls[Math.floor(Math.random()*multiBalls.length)], 8, 5, 15)
    restartMultiDiv.style.display = 'none'
  }


  nextLevelButton.addEventListener("click", proceedToNextLevelHandler)

  function proceedToNextLevelHandler(e){
    balls = []
    canvas.style.display = ''
    nextLevelDiv.style.display = 'none'
    if(parseInt(levelBar.innerText.split(" ")[1]) === 1 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 2"
      loop(jeff, basketBallSprite, 12, 8)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 2 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 3"
      loop(jeffTheBoss, edamameBallSprite, 12, 6)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 3 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 4"
      loop(jeffGoldblum, dinosaurSprite, 10, 6)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 4 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 5"
      loop(jeffGoldblum, alienSprite, 12, 7)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 5 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 6"
      loop(jeffGoldblum, pianoSprite, 12, 6)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 6 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 7"
      loop(jeffLebowski, whiteRussianSprite, 12, 6)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 7 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 8"
      loop(jeffLebowski, tronDiscSprite, 12, 7)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 8 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 9"
      loop(jeffLebowski, bowlingSprite, 12, 9)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 9 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 10"
      loop(jeffBezos, bookSprite, 12, 6)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 10 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 11"
      loop(jeffBezos, boxSprite, 12, 10)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 11 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      levelBar.innerText = "Level 12"
      loop(jeffBezos, moneyBallSprite, 12, 8)
    }else if(parseInt(levelBar.innerText.split(" ")[1]) === 12 && parseInt(scoreBar.innerText.split(" ")[1]) > 600){
      canvas.style.display = 'none'
      let img = document.createElement("img")
      img.src = "images/you-win.png"
      info.appendChild(img)
      let gameObj = {
        level: parseInt(levelBar.innerText.split(" ")[1]),
        score: parseInt(scoreBar.innerText.split(" ")[1]),
        user_id: player_id
      }
      addGameToDB(gameObj)
    }else{
      canvas.style.display = 'none'
      restartDiv.style.display = ''
      let img = document.createElement("img")
      img.src = "images/you-lose.png"
      img.dataset.loss_id = "loss"
      let h4 = document.createElement("h4")
      h4.innerText = `${scoreBar.innerText.split(" ")[1]} is not enough to proceed to the next level`
      h4.dataset.loss_id = "loss"
      h4.id = "win_lose"
      info.appendChild(img)
      info.appendChild(h4)
      let gameObj = {
        level: parseInt(levelBar.innerText.split(" ")[1]),
        score: parseInt(scoreBar.innerText.split(" ")[1]),
        user_id: player_id
      }
      addGameToDB(gameObj)
    }


  }
  
})
