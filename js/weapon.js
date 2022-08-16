class Weapon {
    constructor(shooter) {
      this.ctx = shooter.ctx;
      this.shooter = shooter;
      this.swords = [];
      this.isShooting = false;
      this.direction = "right";

      // Sound
      this.swordSound = new Audio();
      this.swordSound.src = './assets/audio/knife.mp3';
      this.swordSound.volume = 0.2;
    }
  
    shoot() {
      if(!this.isShooting) {
        this.isShooting = true;
        this.swordSound.play();
        this.swords.push(new Sword(this.ctx, this.shooter.position.x, this.shooter.position.y + 15, this.direction));
        setTimeout(() => {
          this.isShooting = false;
        }, 1000);
      }
    }
  
    draw() {
      this.swords.forEach(sword => sword.draw());
    }
  
    move() {
      this.swords.forEach(sword => sword.move());
    }

    clearSwords() {
      this.swords = this.swords.filter((sword) => sword.isVisible());
    }
    
  }