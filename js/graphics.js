class Window {
    constructor(ctx) {
        this.ctx = ctx
        this.width = CANVAS_WIDTH
        this.height = CANVAS_HEIGHT
        this.position = {
            x: 0,
            y: 0
        }
        // Graphics
        this.img = new Image()
        this.img.src = './assets/img/marco.png'
        this.img.frames = 4
        this.img.frameIndex = 0
    }

    draw() {
        // this.ctx.beginPath();
        // this.ctx.fillStyle = this.color
        // this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        // this.ctx.closePath();
        this.ctx.drawImage(
            this.img,
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

class Background {
  constructor(ctx) {
      this.ctx = ctx
      this.width = CANVAS_WIDTH
      this.height = CANVAS_HEIGHT
      this.position = {
          x: 0,
          y: 0
      }
      // Graphics
      this.img = new Image()
      this.img.src = './assets/img/background.png'
  }

  draw() {
      this.ctx.drawImage(
          this.img,
          this.position.x,
          this.position.y,
          this.width,
          this.height
      )
  }
}

class PlatformPrint {
  constructor(ctx) {
      this.ctx = ctx
      this.width = 1147
      this.height = 610
      this.position = {
          x: 0,
          y: 286
      }
      // Graphics
      this.img = new Image()
      this.img.src = './assets/img/level1-plataformas.png'
  }

  draw() {
      this.ctx.drawImage(
          this.img,
          this.position.x,
          this.position.y,
          this.width,
          this.height
      )
  }
}

class BackLevelPrint {
  constructor(ctx) {
      this.ctx = ctx
      this.width = 1084
      this.height = 832
      this.position = {
          x: 0,
          y: 128
      }
      // Graphics
      this.img = new Image()
      this.img.src = './assets/img/level1-back.png'
  }

  draw() {
      this.ctx.drawImage(
          this.img,
          this.position.x,
          this.position.y,
          this.width,
          this.height
      )
  }
}

class FrontLevelPrint {
  constructor(ctx) {
      this.ctx = ctx
      this.width = 1080
      this.height = 736
      this.position = {
          x: 192,
          y: 216
      }
      // Graphics
      this.img = new Image()
      this.img.src = './assets/img/level1-front.png'
  }

  draw() {
      this.ctx.drawImage(
          this.img,
          this.position.x,
          this.position.y,
          this.width,
          this.height
      )
  }
}

class BigClouds {
    constructor(ctx) {
        this.ctx = ctx
        this.width = 1792
        this.height = 202
        this.position = {
            x: 0,
            y: 546.8
        }
        this.velocity = {
            x: -0.5,
            y: 0
        }
        this.img = new Image()
        this.img.src = './assets/img/bigCloud.png'
        
    }
  
    draw() {
    
      this.ctx.drawImage(
        this.img,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
  
      this.ctx.drawImage(
        this.img,
        this.position.x + this.width-1,
        this.position.y,
        this.width,
        this.height
      )
    }
  
    move() {
      this.position.x += this.velocity.x
      if (this.position.x + this.width <= 0) {
        this.position.x = 0
      }
    }
}

class SmallCloud1 {
  constructor(ctx) {
      this.ctx = ctx
      this.width = 266
      this.height = 70
      this.randomN = Math.round(Math.random() * (480 - 256) + 256)
      this.position = {
          x: 1300,
          y: this.randomN
      }
      this.velocity = {
          x: -0.7,
          y: 0
      }
      this.img = new Image()
      this.img.src = './assets/img/smartCloud1.png'
      
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  move() {
    this.position.x += this.velocity.x
  }

  isVisible() {
    return this.position.x + this.width >= LEFT_LIMIT
  }

}

class WaterReflect {
    constructor(ctx) {
        this.ctx = ctx
        this.width = 510
        this.height = 20
        this.position = {
            x: (CANVAS_WIDTH / 2) - this.width / 2,
            y: 752
        }
        // Graphics
        this.img = new Image()
        this.img.src = './assets/img/waterReflect2.png'
        this.img.frames = 4
        this.img.frameIndex = 0
        this.tick = 0
    }

    draw() {
        // this.ctx.beginPath();
        // this.ctx.fillStyle = this.color
        // this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        // this.ctx.closePath();
        this.ctx.drawImage(
            this.img,
            0,
            this.img.frameIndex * this.img.height / this.img.frames,
            this.img.width,
            this.img.height / this.img.frames,
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