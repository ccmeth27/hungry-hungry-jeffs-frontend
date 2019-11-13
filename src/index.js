

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("form")
  const canvas = document.getElementById("canvas-lv-1")
  const canvas2 = document.getElementById("canvas-lv-2")
  let context = document.getElementById("canvas-lv-1").getContext("2d")
  let context2 = document.getElementById("canvas-lv-2").getContext("2d")
  const startButton = document.getElementById("startButton")
  const scoreBar = document.getElementById("scorebar")
  const timeBar = document.getElementById("timebar")

  const levelBar = document.getElementById("levelbar")
  let level = levelBar.innerText.split(" ")[1]

  let jeffImage = new Image()
  jeffImage.src = "images/jeff-animation.png"
  let jeff = new Sprite(context, 505, 718, jeffImage, 0, 2)
  let bezosImage = new Image()
  bezosImage.src = "images/bezos-animation.png"
  let jeffBezos = new Sprite(context, 505, 718, bezosImage, 0, 2)

  let ballSprite = new Image()
  ballSprite.src = "images/riceball.png"

  let choosenLevel = 1

  


  form.addEventListener("submit", submitHandler)

  function submitHandler(e){
    e.preventDefault()
    let initials = e.target[0].value
    let choosenLevel = e.target[1].value
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
    loop(timeBar, scoreBar, jeffBezos, ballSprite, context)
  }
  
})