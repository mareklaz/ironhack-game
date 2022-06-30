class Game {
    constructor (ctx) {
        this.ctx = ctx
        this.intervalId = null
        
        // Background
        this.window = new Window(this.ctx)
        this.background = new Background(this.ctx)
        this.bigCloud = new BigClouds(this.ctx)
        this.waterReflect = new WaterReflect(this.ctx)
        // Player
        this.player = new Player(this.ctx)
        this.sword = new Sword(this.ctx)
        this.weapon = new Weapon(this.ctx)
        // GUI
        this.coinPoints = new coinGUI(this.ctx)
        this.hpContainer = new healthBarContainerGUI(this.ctx)
        this.hpBar = new healthBarGUI(this.ctx)

        // Sound
        this.mainTheme = new Audio()
        this.mainTheme.src = './assets/sound/game1.mp3'
        this.mainTheme.volume = 0.5
        
        // Enemies
        this.enemyCrab = [
            new Crab(this.ctx, 900, 2),
            new Crab(this.ctx, 200, 4)
        ]
        // Level
        this.platform = [ // width, height, x, y
            new Platform(this.ctx, 192, 64, 200, 700),
            new Platform(this.ctx, 192, 64, 200, 500),
            new Platform(this.ctx, 192, 64, 900, 500),
            new Platform(this.ctx, 192, 64, 900, 700),
            new Platform(this.ctx, 192, 64, 550, 700),
        ]
        // Treasures
        this.coin = [
            new Coin(this.ctx, 230, 650),
            new Coin(this.ctx, 330, 650),
            new Coin(this.ctx, 230, 450),
            new Coin(this.ctx, 330, 450),
            new Coin(this.ctx, 200, 850),
            new Coin(this.ctx, 300, 850),
            new Coin(this.ctx, 400, 850),
            new Coin(this.ctx, 500, 850),
            new Coin(this.ctx, 500, 600),
            new Coin(this.ctx, 800, 600)
        ]
        this.diamond = [
            new Diamond(this.ctx, 980, 450),
        ]
        this.potion = [
            new Potion(this.ctx, 980, 650)
        ]

    }

    start() {
        
        this.intervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.mainTheme.play()
        }, 1000 / 60)
    }

    move() {
        this.checkCollision();
        this.bigCloud.move()
        this.player.move()
        this.enemyCrab.forEach(element => {element.move()})
    }

    draw() {
        // Background
        this.background.draw()
        this.bigCloud.draw()
        this.window.draw()
        this.waterReflect.draw()
        // Various Element
        this.platform.forEach(element => {element.draw()})
        this.coin.forEach(element => {element.draw()})
        this.potion.forEach(element => {element.draw()})
        this.diamond.forEach(element => {element.draw()})
        // Player & Enemies
        this.enemyCrab.forEach(element => {element.draw()})
        this.player.draw()
        // GUI
        this.hpContainer.draw()
        this.hpBar.draw()
        this.coinPoints.draw()
        // Test
    }

    // Collisions & Triggers
    checkCollision() {
        this.platformTrigger()
        this.coinTrigger()
        this.diamondTrigger()
        this.potionTrigger()
        this.enemyCollide()
        this.swordCollide()
        // Damage Check HP Bar
        this.damageHpBar()
        
    }

    platformTrigger() {
        let platformCollision = this.platform.find(element => element.collide(this.player))
        if(platformCollision) {
            this.player.velocity.y = 0
            this.player.maxY = platformCollision.position.y
            this.player.position.y = this.player.maxY - this.player.height
        } else {
            this.player.maxY = FLOOR
        }
    }

    coinTrigger() {
        let coinCollision = this.coin.find(element => element.coinCollide(this.player))
        if(coinCollision) {
            coinCollision.coinSound.play()
            this.coinPoints.score += 10
            this.coin = this.coin.filter(element => element != coinCollision)
        }
    }

    diamondTrigger() {
        let diamondCollision = this.diamond.find(element => element.diamondCollide(this.player))
        if(diamondCollision) {
            diamondCollision.diamondSound.play()
            this.coinPoints.score += 100
            this.diamond = this.diamond.filter(element => element != diamondCollision)
        }
    }

    potionTrigger() {
        let potionCollision = this.potion.find(element => element.potionCollide(this.player))
        if(this.player.health >= 100 && potionCollision) {

        } else if (this.player.health < 100 && potionCollision) {
            potionCollision.potionSound.play()
            this.player.health +=  potionCollision.restore - this.player.health
            this.potion = this.potion.filter(element => element != potionCollision)
        }
    }

    enemyCollide() {
        let enemyCollision = this.enemyCrab.some(element => element.crabCollide(this.player))
        if(enemyCollision && !this.player.isInvincible) {
            this.enemyCrab.some(crab => crab.soundAttack.play())
            this.player.health -= 5
            this.player.isInvincible = true
            setTimeout(() => {
                this.player.isInvincible = false
            }, 2000);
        }
    }
    
    // PENDIENTE DE REVISION
    swordCollide() {
        let enemyCollision = this.weapon.swords.find(element => this.enemyCrab.some(crab => element.swordCollide(crab)))
        if(enemyCollision) {
            console.log('impacto')
            this.enemyCrab = this.enemyCrab.filter(element => element != enemyCollision)
        }
    }

    damageHpBar() {
        Math.floor(this.hpBar.width = (342 * this.player.health) / 100)
    }
    

    // Clear Function
    clear() {
        this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
        )
    }

}