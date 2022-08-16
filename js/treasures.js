const timeOut = 10000

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
        // In Game
        this.isObsolete = false
        setTimeout(() => {
            this.isObsolete = true
        }, timeOut)
        // Graphics
        this.img = new Image()
        this.img.src = './assets/img/coin.png'
        this.img.frames = 4
        this.img.frameIndex = 0
        this.tick = 0
        // Sound
        this.treasureSound = new Audio()
        this.treasureSound.src = './assets/audio/coin2.wav'
        
    }

    itemCollide(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    itemAdd(player) {
        player.score += 100
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

//*************** Emerald ***************//
class Emerald {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.width = 24
        this.height = 24
        this.position = {
            x: x,
            y: y
        }
        // In Game
        this.isObsolete = false
        setTimeout(() => {
            this.isObsolete = true
        }, timeOut)
        // Graphics
        this.img = new Image()
        this.img.src = './assets/img/emerald.png'
        this.img.frames = 4
        this.img.frameIndex = 0
        this.tick = 0
        // Sound
        this.treasureSound = new Audio();
        this.treasureSound.src = './assets/audio/diamond.mp3';
        this.treasureSound.volume = 0.2
    }

    itemCollide(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    itemAdd(player) {
        player.score += 500
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
        // In Game
        this.isObsolete = false
        setTimeout(() => {
            this.isObsolete = true
        }, timeOut)
        // Graphics
        this.img = new Image()
        this.img.src = './assets/img/diamond.png'
        this.img.frames = 4
        this.img.frameIndex = 0
        this.tick = 0
        // Sound
        this.treasureSound = new Audio();
        this.treasureSound.src = './assets/audio/diamond.mp3';
        this.treasureSound.volume = 0.2
    }

    itemCollide(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    itemAdd(player) {
        player.score += 1000
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
        // In Game
        this.isObsolete = false
        setTimeout(() => {
            this.isObsolete = true
        }, timeOut)
        this.restore = 100
        // Graphics
        this.img = new Image()
        this.img.src = './assets/img/potion.png'
        this.img.frames = 7
        this.img.frameIndex = 0
        this.tick = 0
        // Sound
        this.treasureSound = new Audio();
        this.treasureSound.src = './assets/audio/potion.mp3';
        this.treasureSound.volume = 0.7
    }

    itemCollide(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    itemAdd(player) {
        player.health += 100 - player.health
        
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

//*************** Key ***************//
class Key {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.width = 16
        this.height = 30
        this.position = {
            x: x,
            y: y
        }
        // In Game
        this.isObsolete = false
        setTimeout(() => {
            this.isObsolete = true
        }, timeOut)
        // Graphics
        this.img = new Image()
        this.img.src = './assets/img/key.png'
        this.img.frames = 8
        this.img.frameIndex = 0
        this.tick = 0
        // Sound
        this.treasureSound = new Audio();
        this.treasureSound.src = './assets/audio/diamond.mp3';
        this.treasureSound.volume = 0.2
    }

    itemCollide(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    itemAdd(player) {
        player.keys += 1
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
        
        if (this.tick > 6) {
          this.tick = 0
          this.img.frameIndex++
        }
        
        if (this.img.frameIndex >= this.img.frames) {
          this.img.frameIndex = 0
        }
    }
}

