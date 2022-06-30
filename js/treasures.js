//*************** Coin ***************//
class Coin {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.width = 22
        this.height = 22
        this.position = {
            x: x,
            y: y
        }
        // Graphics
        this.img = new Image()
        this.img.src = '../assets/img/coin.png'
        this.img.frames = 4
        this.img.frameIndex = 0
        this.tick = 0
        // Sound
        this.coinSound = new Audio()
        this.coinSound.src = '../assets/sound/coin2.wav'
    }

    coinCollide(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.animate()
    }

    animate() {
        this.tick++
        
        if (this.tick > 4) {
          this.tick = 0
          this.img.frameIndex++
        }

        if (this.img.frameIndex >= this.img.frames) {
          this.img.frameIndex = 0
        }
    }
}

//*************** Potion ***************//
class Potion {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.width = 18
        this.height = 28
        this.position = {
            x: x,
            y: y
        }
        this.restore = 100
        // Graphics
        this.img = new Image()
        this.img.src = '../assets/img/potion.png'
        this.img.frames = 7
        this.img.frameIndex = 0
        this.tick = 0
        // Sound
        this.potionSound = new Audio();
        this.potionSound.src = '../assets/sound/potion.mp3';
        this.potionSound.volume = 0.2
    }

    potionCollide(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.animate()
    }

    animate() {
        this.tick++
        if (this.tick > 4) {
          this.tick = 0
          this.img.frameIndex++
        }
        if (this.img.frameIndex >= this.img.frames) {
          this.img.frameIndex = 0
        }
    }
}

//*************** Diamond ***************//
class Diamond {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.width = 28
        this.height = 24
        this.position = {
            x: x,
            y: y
        }
        // Graphics
        this.img = new Image()
        this.img.src = '../assets/img/diamond.png'
        this.img.frames = 4
        this.img.frameIndex = 0
        this.tick = 0
        // Sound
        this.diamondSound = new Audio();
        this.diamondSound.src = '../assets/sound/diamond.mp3';
        this.diamondSound.volume = 0.2
    }

    diamondCollide(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    draw() {

        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.animate()
    }

    animate() {
        this.tick++
        
        if (this.tick > 4) {
          this.tick = 0
          this.img.frameIndex++
        }
        
        if (this.img.frameIndex >= this.img.frames) {
          this.img.frameIndex = 0
        }
    }
}
