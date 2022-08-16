// Plaform Print
class BasePrint {
    constructor(ctx, source) {
        this.ctx = ctx;
        this.width = 1280;
        this.height = 960;
        this.position = {
            x: 0,
            y: 0
        }
        // Graphics
        this.img = new Image();
        this.img.src = source;
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
};

// Window Frame
class WindowFrame extends BasePrint {};

// Plaform Print
class PlatformPrint extends BasePrint {};

// Front Print
class FrontPrint extends BasePrint {};

// Back Print
class BackPrint extends BasePrint {};

// Background Print
class BackgroundPrint extends BasePrint {};

// Water Reflect
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
        this.waterImg = new Image()
        this.waterImg.src = './assets/img/waterReflect2.png'
        this.waterImg.frames = 4
        this.waterImg.frameIndex = 0
        this.tick = 0
    }

    draw() {
        this.ctx.drawImage(
            this.waterImg,
            0,
            this.waterImg.frameIndex * this.waterImg.height / this.waterImg.frames,
            this.waterImg.width,
            this.waterImg.height / this.waterImg.frames,
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
          this.waterImg.frameIndex++
        }
        
        if (this.waterImg.frameIndex >= this.waterImg.frames) {
          this.waterImg.frameIndex = 0
        }
    }
};

// Big Cloud
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
        this.bigCloudsImg = new Image()
        this.bigCloudsImg.src = './assets/img/bigCloud.png'
        
    }
  
    draw() {
    
      this.ctx.drawImage(
        this.bigCloudsImg,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
  
      this.ctx.drawImage(
        this.bigCloudsImg,
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
};

// Small Clouds
class SmallClouds {
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
      this.smallCloudsImg = new Image()
      this.smallCloudsImg.src = './assets/img/smartCloud.png'
      
  }

  draw() {
    this.ctx.drawImage(
      this.smallCloudsImg,
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

};

