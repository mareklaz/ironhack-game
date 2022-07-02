//*************** Crab Enemy ***************//
class Crab {
    constructor (ctx, positionX, vx, patrol = false) {
        this.ctx = ctx
        this.width = 84  
        this.height = 60
        this.position = {
            x: positionX,
            y: 320
        }
        this.velocity = {
            x: vx,
            y: 0
        }
        this.gravity = 0.7
        this.maxY = FLOOR
        this.maxX = 0
        // In game
        this.patrol = patrol
        this.damage = 100
        // Graphics
        this.rightSprite = './assets/img/crabRight.png'
        this.leftSprite = './assets/img/crabLeft.png'
        this.img = new Image()
        this.img.src = this.rightSprite
        this.img.frames = 16
        this.img.frameIndex = 0
        this.tick = 0

        this.soundAttack = new Audio();
        this.soundAttack.src = './assets/sound/attack.mp3';
        this.soundAttack.volume = 0.5
        this.limits = {
            left: LEFT_LIMIT,
            right: RIGHT_LIMIT
        }
    }

    move() {
        this.enemyActions()
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
        if(this.position.y + this.height + this.velocity.y <= this.maxY) {
            this.velocity.y += this.gravity
        } else {
            this.velocity.y = 0
        }
        this.position.x += this.velocity.x
    }

    enemyCollid(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    enemyActions() {
        this.collisionLimits()
        this.isOnFloor()
        if(Math.sign(this.velocity.x) === 1) {
            this.img.src = this.rightSprite
        } else if (Math.sign(this.velocity.x) === -1) {
            this.img.src = this.leftSprite
        } else {
            this.img.src = this.rightSprite
        }
    }

    isOnFloor() {
        if (this.position.y + this.height >= this.maxY) {
            this.velocity.y = 0
            this.position.y = Math.round(this.maxY - this.height)
        }
    }

    collisionLimits() {
        const THRESHOLD = 30;
        if(!this.patrol && !this.isOnFloor()) {
            if(this.position.x + this.width >= this.limits.right + THRESHOLD || this.position.x <= this.limits.left - THRESHOLD) {
                this.maxY = FLOOR
                this.limits = {
                    left: LEFT_LIMIT,
                    right: RIGHT_LIMIT
                }
            }
        }

        if(this.position.x + this.width >= this.limits.right + THRESHOLD) {
            this.velocity.x *= -1
            this.position.x = Math.round(this.limits.right - this.width + THRESHOLD)
        }
        if(this.position.x <= this.limits.left - THRESHOLD) {
            this.velocity.x *= -1
            this.position.x = Math.round(this.limits.left - THRESHOLD)
        }
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
        if (this.velocity.x !== 0) {
            this.animationMove()
        } else {
            this.animationIdle()
        }
        // if(!this.isOnFloor()) {
        //     this.animationJump()
        // }
    }

    // State Animation (idle, move, jump)
    animationIdle() {
        this.tick++
        
        if (this.tick > 4) {
          this.tick = 0
          this.img.frameIndex++
        }
        if (this.img.frameIndex >= 8) {
          this.img.frameIndex = 0
        }
    }

    animationMove() {
        this.tick++
        
        if (this.tick > 4) {
          this.tick = 0
          this.img.frameIndex++
        }
        if (this.img.frameIndex >= 14) {
          this.img.frameIndex = 9
        }
    }

    animationJump() {
        this.img.frameIndex = 15
    }

}

//*************** Shark Enemy ***************//
class Shark {
    constructor (ctx, positionX, vx) {
        this.ctx = ctx
        this.width = 48  
        this.height = 46
        this.position = {
            x: positionX,
            y: FLOOR - this.height
        }
        this.velocity = {
            x: vx,
            y: 0
        }
        this.gravity = 0.7
        this.maxY = FLOOR
        this.maxX = 0
        // In game
        this.damage = 5
        // Graphics
        this.rightSprite = './assets/img/sharkRight.png'
        this.leftSprite = './assets/img/sharkLeft.png'
        this.img = new Image()
        this.img.src = this.rightSprite
        this.img.frames = 15
        this.img.frameIndex = 0
        this.tick = 0

        this.soundAttack = new Audio();
        this.soundAttack.src = './assets/sound/attack.mp3';
        this.soundAttack.volume = 0.5
    }

    move() {
        this.playerActions()
        
        if(this.position.y + this.height + this.velocity.y >= this.maxY) {
            this.velocity.y += this.gravity
        } else {
            this.velocity.y = 0
        }
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
    }

    enemyCollid(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    playerActions() {
        this.collisionLimits()
        this.isOnFloor()
        if(Math.sign(this.velocity.x) === 1) {
            this.img.src = this.rightSprite
        } else if (Math.sign(this.velocity.x) === -1) {
            this.img.src = this.leftSprite
        } else {
            this.img.src = this.rightSprite
        }
    }

    isOnFloor() {
        if (this.position.y + this.height >= this.maxY) {
            this.velocity.y = 0
            this.position.y = Math.round(this.maxY - this.height)
        }
    }

    collisionLimits() {
        if(this.position.x + this.width >= RIGHT_LIMIT) {
            this.velocity.x *= -1
            this.position.x = Math.round(RIGHT_LIMIT - this.width)
        }
        if(this.position.x <= LEFT_LIMIT) {
            this.velocity.x *= -1
            this.position.x = Math.round(LEFT_LIMIT)
        }
        
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
        if (this.velocity.x !== 0) {
            this.animationMove()
        } else {
            this.animationIdle()
        }
        // if(!this.isOnFloor()) {
        //     this.animationJump()
        // }
    }

    // State Animation (idle, move, jump)
    animationIdle() {
        this.tick++
        
        if (this.tick > 4) {
          this.tick = 0
          this.img.frameIndex++
        }
        if (this.img.frameIndex >= 9) {
          this.img.frameIndex = 0
        }
    }

    animationMove() {
        this.tick++
        
        if (this.tick > 4) {
          this.tick = 0
          this.img.frameIndex++
        }
        if (this.img.frameIndex >= 14) {
          this.img.frameIndex = 9
        }
    }

    animationJump() {
        this.img.frameIndex = 15
    }

}