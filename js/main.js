const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const game = new Game(ctx);


const startBtn = document.getElementById('startBtn')

game.start()

// startBtn.addEventListener('click', () => {
//   game.start()
// })