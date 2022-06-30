class Platform {
    constructor(ctx, width, height, x, y) {
        this.ctx = ctx
        this.width = width
        this.height = height
        this.position = {
            x: x,
            y: y
        }
        // Graphics
        this.img = new Image()
        this.img.src = '/assets/img/platform.png'
    }

    collide(player) {
        const collideX = player.position.x + player.width >= this.position.x && player.position.x  <= this.position.x + this.width;
        const collideY = player.position.y + player.height <= this.position.y && player.position.y + player.height + player.velocity.y >= this.position.y;
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