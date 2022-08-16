class Player {
    constructor (ctx) {
        this.ctx = ctx;
        this.width = 44;
        this.height = 56;
        this.position = {
            x: CANVAS_WIDTH / 2,
            y: 430
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.gravity = 0.6;
        this.actions = {
            left: false,
            right: false,
            jump: false,
            shoot: false
        }
        this.maxY = FLOOR;
        this.maxX = 0;

        // In Game
        this.health = 100;
        this.invencible = false;
        this.keys = 0;
        this.score = 0;

        // Weapon
        this.weapon = new Weapon(this);
        this.sword = new Sword(this.ctx);
        
        // Graphics
        this.rightSpriteNormal = './assets/img/playerRight.png';
        this.rightSpriteDamage = './assets/img/playerRightDamage.png';
        this.rightSprite = this.rightSpriteNormal;
        this.leftSpriteNormal = './assets/img/playerLeft.png';
        this.leftSpriteDamage = './assets/img/playerLeftDamage.png';
        this.leftSprite = this.leftSpriteNormal;
        this.img = new Image();
        this.img.src = this.rightSprite;
        this.img.frames = 12;
        this.img.frameIndex = 6;
        this.tick = 0;

        // Sound
        this.jumpSound = new Audio()
        this.jumpSound.src = './assets/audio/jump1.mp3'

        // Others
        this.setListener();
    }

    move() {
        this.playerActions();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if(this.position.y + this.height + this.velocity.y <= this.maxY) {
            this.velocity.y += this.gravity;
        } else {
            this.velocity.y = 0;
        }
        this.weapon.move();
    }

    setListener() {
        document.onkeydown = event => this.getInput(event.key, true);
        document.onkeyup = event => this.getInput(event.key, false);
    }

    getInput(key, state) {
        switch (key) {
        case 'A':
        case 'a':
            this.actions.left = state;
            break;
        case 'D':
        case 'd':
            this.actions.right = state;
            break;
        case ' ': // Space
            this.actions.jump = state;
            break;
        case 'Q':
        case 'q':
        case 'Shift':
            this.actions.shoot = state;
            break;
        } 
    }

    playerActions() {
        this.isOnFloor();
        this.checkPlayerLimits();
        if(this.actions.left) {
            this.velocity.x = -5;
            this.img.src = this.leftSprite;
            this.weapon.direction = "left";
        } else if (this.actions.right) {
            this.velocity.x = 5;
            this.img.src = this.rightSprite;
            this.weapon.direction = "right";
        } else {
            this.velocity.x = 0;
        }

        if(this.actions.jump && !this.isJumping()) {
            this.velocity.y -= 15;
            this.jumpSound.play();
        }
        if (this.actions.shoot) {
            this.weapon.shoot();
        }
    }

    isOnFloor() {
        if (this.position.y + this.height >= this.maxY) {
            this.velocity.y = 0;
            this.position.y = Math.round(this.maxY - this.height);
        }
    }

    isJumping() {
        return this.position.y < Math.round(this.maxY - this.height);
    }

    checkPlayerLimits() {
        if(this.position.x + this.width >= RIGHT_LIMIT) {
            this.velocity.x = 0;
            this.position.x = Math.round(RIGHT_LIMIT - this.width);
        }
        if(this.position.x <= LEFT_LIMIT) {
            this.velocity.x = 0;
            this.position.x = Math.round(LEFT_LIMIT);
        }
        if(this.position.y <= TOP_LIMIT / 2) {
            this.velocity.y *= -0.1;
            this.position.y = Math.round(TOP_LIMIT / 2);
        }
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.animate();
        this.weapon.draw();
        this.weapon.clearSwords();
    }

    // Animations

    animate() {
        if (this.actions.right || this.actions.left) {
            this.animationMove();
        } else {
            this.animationIdle();
        }
        if(this.isJumping()) {
            this.animationJump();
        }
    }

    animationIdle() {
        this.tick++;
        
        if (this.tick > 3) {
            this.tick = 0;
            this.img.frameIndex++;
        }
        if (this.img.frameIndex >= 5) {
            this.img.frameIndex = 0;
        }
    }

    animationMove() {
        this.tick++;
        
        if (this.tick > 3) {
            this.tick = 0;
            if (this.actions.right || this.actions.left) {
                this.img.frameIndex++;
            } else {
            this.img.frameIndex= 6;
            }
        }
        if (this.img.frameIndex >= 11) {
            this.img.frameIndex = 6;
        }
    }

    animationJump() {
        this.img.frameIndex = 11;
    }
}