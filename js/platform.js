class Platform {
    constructor(ctx, name, x, y, width, height, spawnLoot = false, opacidad) {
        this.ctx = ctx
        this.name = name
        this.width = width
        this.height = height
        this.position = {
            x: x,
            y: y
        }
        this.spawnLoot = spawnLoot
        this.opacidad = opacidad
        // Graphics
        // this.img = new Image()
        // this.img.src = './assets/img/platform.png'
    }

    collidePlayer(player) {
        const collideX = player.position.x + player.width >= this.position.x && player.position.x  <= this.position.x + this.width;
        const collideY = player.position.y + player.height <= this.position.y && player.position.y + player.height + player.velocity.y >= this.position.y;
        return collideX && collideY
    }

    platformCollideEnemy(enemy) {
        const collideX = enemy.position.x + enemy.width >= this.position.x && enemy.position.x  <= this.position.x + this.width;
        const collideY = enemy.position.y + enemy.height <= this.position.y && enemy.position.y + enemy.height + enemy.velocity.y >= this.position.y;
        return collideX && collideY
    }

    draw() {
        // this.ctx.drawImage(
        //     this.img,
        //     this.position.x,
        //     this.position.y,
        //     this.width,
        //     this.height
        // )
        
        //let opacidad = opacidad// 0-1
        
        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(255, 53, 255, ${this.opacidad})`
        
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.ctx.closePath()
    }
}

class Door {
    constructor(ctx, x, y, width, height, opacidad) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.position = {
            x: x,
            y: y
        }
        this.opacidad = opacidad
        // Graphics
        // this.img = new Image()
        // this.img.src = './assets/img/platform.png'
    }

    doorCollide(player) {
        const collideX = player.position.x + player.width >= this.position.x && player.position.x  <= this.position.x + this.width;
        const collideY = player.position.y + player.height <= this.position.y && player.position.y + player.height + player.velocity.y >= this.position.y;
        return collideX && collideY
    }

    draw() {
        // this.ctx.drawImage(
        //     this.img,
        //     this.position.x,
        //     this.position.y,
        //     this.width,
        //     this.height
        // )
        
        //let opacidad = opacidad// 0-1
        this.ctx.beginPath();
        this.ctx.fillStyle = `rgba(0, 214, 255, ${this.opacidad})`
        this.ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
        this.ctx.closePath()
    }
}