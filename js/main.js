const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const game = new Game(ctx);

const startBtn = document.getElementById('startBtn')
const restartBtn = document.getElementById('restartBtn')
const titleScreen = document.getElementById('titleScreen')
console.log(titleScreen)

startBtn.addEventListener('click', () => {
    titleScreen.style.display = 'none'
    game.start()
})

restartBtn.addEventListener('click', () => {
    restartBtn.style.display = 'none'
})