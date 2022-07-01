class Platform {
    constructor(ctx, x, y) {
        this.ctx = ctx
        this.width = 192
        this.height = 64
        this.position = {
            x: x,
            y: y
        }
        // Graphics
        this.img = new Image()
        this.img.src = './assets/img/platform.png'
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
        this.ctx.drawImage(
            this.img,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
    }
}