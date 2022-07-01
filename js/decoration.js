class PalmBack {
    constructor(ctx, posX, posY) {
        this.ctx = ctx
        this.width = 95 
        this.height = 160
        this.position = {
            x: posX,
            y: posY
        }
        // Graphics
        this.img = new Image()
        this.img.src = '../assets/img/palm.png'
        this.img.frames = 4
        this.img.frameIndex = 0
        this.tick = 0
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        // this.ctx.drawImage(
        //     this.img,
        //     this.img.frameIndex * this.img.width / this.img.frames,
        //     0,
        //     this.img.width / this.img.frames,
        //     this.img.height,
        //     this.position.x,
        //     this.position.y,
        //     this.width,
        //     this.height
        // )
    }
    
    animate() {
        this.tick++
        
        if (this.tick > 13) {
          this.tick = 0
          this.img.frameIndex++
        }
        
        if (this.img.frameIndex >= this.img.frames) {
          this.img.frameIndex = 0
        }
    }
}