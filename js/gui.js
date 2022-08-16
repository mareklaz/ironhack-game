class HealthBarContainerGUI {
    constructor(ctx) {
        this.ctx = ctx
        this.width = 384,
        this.height = 34
        this.position = {
            x: 60,
            y: 40
        }
        // Graphics
        this.img = new Image()
        this.img.src = './assets/img/healthContainer.png'
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

class HealthBar {
    constructor(ctx) {
        this.ctx = ctx;
        this.health
        this.width = 342;
        this.height = 4;
        this.position = {
            x: 94,
            y: 54
        }
        this.opacity = 1;
    }
    healthBarWidth() {

        this.total = ((this.width * this.health) / 100)

        if(this.health > 100) {
            this.total = 342;
        } else if (this.health <= 0) {
            this.total = 0
        }

        return this.total
    }
    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = `#DC4949`;
        this.ctx.fillRect(this.position.x, this.position.y, this.healthBarWidth(), this.height);
        this.ctx.closePath();
        // Width Text
        // this.ctx.font = "44px pixelFont";
        // this.ctx.fillStyle = "#DC4949";
        // this.ctx.textAlign = "right";
        // this.ctx.fillText(this.width, 650, 70);
    }
}

class ScoreGUI {
    constructor(ctx, points) {
        this.ctx = ctx
        this.width = 32;
        this.height = 32;
        this.position = {
            x: 1190,
            y: 40
        }
        this.score = points;
        // Graphics
        this.scoreImg = new Image()
        this.scoreImg.src = './assets/img/coin.png'
        this.scoreImg.frames = 4
        this.scoreImg.frameIndex = 0
        this.tick = 0
    }
    draw() {
        this.ctx.drawImage(
            this.scoreImg,
            this.scoreImg.frameIndex * this.scoreImg.width / this.scoreImg.frames,
            0,
            this.scoreImg.width / this.scoreImg.frames,
            this.scoreImg.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.ctx.font = "44px pixelFont";
        this.ctx.fillStyle = "#f7f1df";
        this.ctx.textAlign = "right";
        this.ctx.fillText(this.score, 1180, 69);

        this.animate()
    }
    animate() {
        this.tick++
        
        if (this.tick > 9) {
          this.tick = 0
          this.scoreImg.frameIndex++
        }

        if (this.scoreImg.frameIndex >= this.scoreImg.frames) {
          this.scoreImg.frameIndex = 0
        }
    }    
}

class KeyGUI {
    constructor(ctx) {
        this.ctx = ctx
        this.keyNum = 0;
        this.keyReq
        this.width = 16;
        this.height = 30;
        this.position = {
            x: 800,
            y: 40
        }
        // Graphics
        this.keyImg = new Image()
        this.keyImg.src = './assets/img/key.png'
        this.keyImg.frames = 8
        this.keyImg.frameIndex = 0
        this.tick = 0
    }
    draw() {
        this.ctx.drawImage(
            this.keyImg,
            this.keyImg.frameIndex * this.keyImg.width / this.keyImg.frames,
            0,
            this.keyImg.width / this.keyImg.frames,
            this.keyImg.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.ctx.font = "44px pixelFont";
        this.ctx.fillStyle = "#eed878";
        this.ctx.textAlign = "right";
        this.ctx.fillText(`${this.keyNum} / ${this.keyReq}`, 790, 69);
        this.animate()
    }
    animate() {
        this.tick++
        
        if (this.tick > 8) {
          this.tick = 0
          this.keyImg.frameIndex++
        }

        if (this.keyImg.frameIndex >= this.keyImg.frames) {
          this.keyImg.frameIndex = 0
        }
    }    
}

class LevelGUI {
    constructor(ctx) {
        this.ctx = ctx;
        this.level = 0;
        this.position = {
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2 + 450
        }
        this.opacity = 1;
    }
    draw() {
        this.ctx.font = "44px pixelFont";
        this.ctx.fillStyle = "#ffbd9f";
        this.ctx.textAlign = "center";
        this.ctx.fillText('Level: ' + (this.level + 1), this.position.x, this.position.y);
    }
}

class KeyDoorsGUI {
    constructor(ctx) {
        this.ctx = ctx;
        this.level = 0;
        this.position = {
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT / 2 + 450
        }
        this.opacity = 1;
        this.active = false;
    }

    isActive() {
        if(this.active) {
            this.draw()
        }
    }

    draw() {
        const width = 800;
        const height = 40;
        this.ctx.fillStyle = '#302e3a';
        this.ctx.fillRect(this.position.x - width / 2, this.position.y - height, width, height);
        this.ctx.font = "44px pixelFont";
        this.ctx.fillStyle = "#ffffff";
        this.ctx.textAlign = "center";
        this.ctx.fillText("You don't have enough keys to access", this.position.x, this.position.y);
    } 
}