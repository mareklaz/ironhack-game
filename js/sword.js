
class Sword {
    constructor(ctx, x, y, direction) {
      this.ctx = ctx;
      this.width = 40;
      this.height = 40;
      this.position = {
        x: x,
        y: y
      }
      this.velocity = {
        x: 10,
      }
      this.direction = direction
      
      // Graphics
      this.leftSword = './assets/img/swordLeft.png'
      this.rightSword = './assets/img/swordRight.png'
      this.img = new Image()
      this.img.src = this.rightSword
      
    }
  
    move() {
      if (this.direction === "left") {
        this.velocity.x = -8
        this.img.src = this.leftSword
      } else if (this.direction === "right") {
        this.velocity.x = 8
        this.img.src = this.rightSword
      }
      this.position.x += this.velocity.x
  
    } 

    isVisible() {
        return this.position.x <= RIGHT_LIMIT - this.width && this.position.x >= LEFT_LIMIT
    }

    swordCollide(enemy) {
      const collideX = enemy.position.x + enemy.width > this.position.x && enemy.position.x < this.position.x + this.width
      const collideY = enemy.position.y < this.position.y + this.height && enemy.position.y + enemy.height > this.position.y
  
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