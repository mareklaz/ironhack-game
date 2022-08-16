class Platform {
    constructor(ctx, name, posX, posY, width, height, opacity) {
        this.ctx = ctx;
        this.name = name;
        this.width = width;
        this.height = height;
        this.position = {
            x: posX,
            y: posY
        }
        this.opacity = opacity;
    }

    collidesPlayer(player) {
        const collideX = player.position.x + player.width >= this.position.x && player.position.x  <= this.position.x + this.width;
        const collideY = player.position.y + player.height <= this.position.y && player.position.y + player.height + player.velocity.y >= this.position.y;
        return collideX && collideY;
    }

    collidesEnemy(enemy) {
        const collideX = enemy.position.x + enemy.width >= this.position.x && enemy.position.x  <= this.position.x + this.width;
        const collideY = enemy.position.y + enemy.height <= this.position.y && enemy.position.y + enemy.height + enemy.velocity.y >= this.position.y;
        return collideX && collideY
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(129, 199, 132, ${this.opacity})`;
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.ctx.closePath();
    }
}

class Palm {
    constructor(ctx, name, posX, posY) {
        this.ctx = ctx
        this.name = name;
        this.width = 78;
        this.height = 64;
        this.position = {
            x: posX,
            y: posY
        }
        // Graphics
        this.palmImg = new Image();
        this.palmImg.src = './assets/img/palm.png';
        this.palmImg.frames = 4;
        this.palmImg.frameIndex = 0;
        this.tick = 0;
    }
    draw() {
        this.ctx.drawImage(
            this.palmImg,
            this.palmImg.frameIndex * this.palmImg.width / this.palmImg.frames,
            0,
            this.palmImg.width / this.palmImg.frames,
            this.palmImg.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.animation()
    }
    animation() {
        this.tick++;
        
        if (this.tick > 8) {
          this.tick = 0;
          this.palmImg.frameIndex++;
        }

        if (this.palmImg.frameIndex >= this.palmImg.frames) {
          this.palmImg.frameIndex = 0;
        }
    }
}

class PalmBack extends Palm {
    constructor(ctx, name, posX, posY) {
        super(ctx, name, posX, posY);
        this.palmImg.src = './assets/img/palmBack.png';
    }
}

class Door {
    constructor(ctx, posX, posY, keysRequired, opacity) {
        this.ctx = ctx;
        this.name = 'Door';
        this.width = 62;
        this.height = 74;
        this.position = {
            x: posX,
            y: posY
        }
        this.keysRequired = keysRequired;
        this.opacity = opacity;
        // Graphics
        this.doorImg = new Image();
        this.doorImg.src = './assets/img/door.png';
    }

    collidesWhitPlayer(player) {
        const collideX = player.position.x + player.width > this.position.x && player.position.x < this.position.x + this.width
        const collideY = player.position.y < this.position.y + this.height && player.position.y + player.height > this.position.y
        return collideX && collideY
    }

    draw() {
        this.ctx.drawImage(
            this.doorImg,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(83, 54, 244, ${this.opacity})`;
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        this.ctx.closePath();
    }
}

class SpawnZone {
    constructor(ctx, name, spawnPx, spawnPy, spawnAx, spawnAy, velocity, maxEnemy) {
        this.ctx = ctx;
        this.name = name; 
        this.spawnPosition = {
            x: spawnPx, 
            y: spawnPy
        } 
        this.spawnArea = {
            x: spawnAx,//Math.random() * ((448 - 64) + 64),
            y: spawnAy
        }
        this.velocity = velocity;
        this.maxEnemy = maxEnemy;
        this.enemies = [];
    }

}


