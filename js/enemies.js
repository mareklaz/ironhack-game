class Crab {
    constructor (ctx, name, positionX, positionY, vx, patrol = false) {
        this.ctx = ctx
        this.name = name
        this.width = 84  
        this.height = 60
        this.position = {
            x: positionX,
            y: positionY
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
        this.damage = 10;
        this.limits = {
            left: LEFT_LIMIT,
            right: RIGHT_LIMIT
        }
        // Graphics
        this.rightSprite = './assets/img/crabRight.png'
        this.leftSprite = './assets/img/crabLeft.png'
        this.crabEnemyImg = new Image()
        this.crabEnemyImg.src = this.rightSprite
        this.crabEnemyImg.frames = 16
        this.crabEnemyImg.frameIndex = 0
        this.tick = 0

        this.soundAttack = new Audio();
        this.soundAttack.src = './assets/audio/attack.mp3';
        this.soundAttack.volume = 0.5
        
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

    collidesWhitPlayer(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    enemyActions() {
        this.collisionLimits()
        this.isOnFloor()
        if(Math.sign(this.velocity.x) === 1) {
            this.crabEnemyImg.src = this.rightSprite
        } else if (Math.sign(this.velocity.x) === -1) {
            this.crabEnemyImg.src = this.leftSprite
        } else {
            this.crabEnemyImg.src = this.rightSprite
        }
    }

    isOnFloor() {
        if (this.position.y + this.height >= this.maxY) {
            this.velocity.y = 0
            this.position.y = Math.round(this.maxY - this.height)
        }
    }

    collisionLimits() {
        const THRESHOLD = 20;
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
            this.crabEnemyImg,
            this.crabEnemyImg.frameIndex * this.crabEnemyImg.width / this.crabEnemyImg.frames,
            0,
            this.crabEnemyImg.width / this.crabEnemyImg.frames,
            this.crabEnemyImg.height,
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
    }

    // State Animation (idle, move, jump)
    animationIdle() {
        this.tick++
        
        if (this.tick > 4) {
          this.tick = 0
          this.crabEnemyImg.frameIndex++
        }
        if (this.crabEnemyImg.frameIndex >= 8) {
          this.crabEnemyImg.frameIndex = 0
        }
    }

    animationMove() {
        this.tick++
        
        if (this.tick > 4) {
          this.tick = 0
          this.crabEnemyImg.frameIndex++
        }
        if (this.crabEnemyImg.frameIndex >= 14) {
          this.crabEnemyImg.frameIndex = 9
        }
    }

    animationJump() {
        this.crabEnemyImg.frameIndex = 15
    }

}