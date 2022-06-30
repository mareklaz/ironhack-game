//*************** Wooden Health Bar Container ***************//
class healthBarContainerGUI {
    constructor(ctx) {
        this.ctx = ctx
        this.width = 384,
        this.height = 34
        this.position = {
            x: 60,
            y: 80
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
//*************** Red Health Bar ***************//
class healthBarGUI {
    constructor(ctx) {
        this.ctx = ctx
        this.width = 342;
        this.height = 4;
        this.position = {
            x: 34,
            y: 14
        }
        // Graphics
        this.img = new Image()
        this.img.src = './assets/img/healthBar.png'
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.position.x = 60 + 34,
            this.position.y = 80 + 14,
            this.width,
            this.height
        )
        // Width Text
        // this.ctx.font = "44px pixelFont";
        // this.ctx.fillStyle = "#DC4949";
        // this.ctx.textAlign = "right";
        // this.ctx.fillText(String(this.width), 1000, 110);
    }
    
}
//*************** Coin GUI ***************//
class coinGUI {
    constructor(ctx) {
        this.ctx = ctx
        this.score = 0
        this.width = 32;
        this.height = 32;
        this.position = {
            x: 32,
            y: 32
        }
        // Graphics
        this.guiCoinImg = new Image()
        this.guiCoinImg.src = './assets/img/gui_coin.png'
    }
    draw() {
        this.ctx.drawImage(
            this.guiCoinImg,
            this.position.x = 1190,
            this.position.y = 80,
            this.width,
            this.height
        )
        this.ctx.font = "44px pixelFont";
        this.ctx.fillStyle = "#fff";
        this.ctx.textAlign = "right";
        this.ctx.fillText(String(this.score), 1190, 110);
    }
    
}

//*************** Key GUI ***************//
class keyGUI {
    constructor(ctx) {
        this.ctx = ctx
        this.keyN = 0
        this.width = 16;
        this.height = 30;
        this.position = {
            x: 32,
            y: 32
        }
        // Graphics
        this.guiCoinImg = new Image()
        this.guiCoinImg.src = './assets/img/gui_key.png'
    }
    draw() {
        this.ctx.drawImage(
            this.guiCoinImg,
            this.position.x = 800,
            this.position.y = 80,
            this.width,
            this.height
        )
        this.ctx.font = "44px pixelFont";
        this.ctx.fillStyle = "#eed878";
        this.ctx.textAlign = "right";
        this.ctx.fillText(String(this.keyN), 790, 110);
    }
    
}
