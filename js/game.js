class Game {
    constructor (ctx) {
        this.ctx = ctx
        this.intervalId = null
        
        // Background
        this.window = new Window(this.ctx)
        this.background = new Background(this.ctx)
        this.bigCloud = new BigClouds(this.ctx)
        this.waterReflect = new WaterReflect(this.ctx)
        this.smallCloud1 = []
        this.smallCloud1count = 0
        // Player
        this.player = new Player(this.ctx)
        this.sword = new Sword(this.ctx)
        this.weapon = new Weapon(this.ctx)
        // GUI
        this.coinPoints = new coinGUI(this.ctx)
        this.hpContainer = new healthBarContainerGUI(this.ctx)
        this.hpBar = new healthBarGUI(this.ctx)
        this.keyPoints = new keyGUI(this.ctx)
        // Sound
        this.mainTheme = new Audio()
        this.mainTheme.src = './assets/sound/game1.mp3'
        this.mainTheme.volume = 0.5
        this.youLose = new Audio()
        this.youLose.src = './assets/sound/youlose.mp3'
        
        // Enemies
        this.enemiesCounter = 0
        this.enemies = []
        
        // Level
        this.platform = [ // width, height, x, y
            new Platform(this.ctx, 350, 700),
            new Platform(this.ctx, 150, 500),
            new Platform(this.ctx, 950, 500),
            new Platform(this.ctx, 750, 700),
            new Platform(this.ctx, 550, 500),
        ]
        this.palmBack = [
            new PalmBack(this.ctx, 100, 740),
            new PalmBack(this.ctx, 40, 800),
            new PalmBack(this.ctx, 800, 790),
            new PalmBack(this.ctx, 1000, 600)
        ]
        // Treasures
        this.coinCounter = 0
        this.coins = []
        
        // this.coin = [
        //     new Coin(this.ctx, 230, 650),
        //     new Coin(this.ctx, 330, 650),
        //     new Coin(this.ctx, 230, 450),
        //     new Coin(this.ctx, 330, 450),
        //     new Coin(this.ctx, 500, 600),
        //     new Coin(this.ctx, 800, 600)
        // ]
        this.diamond = [
            new Diamond(this.ctx, 980, 450),
        ]
        this.potion = [
            new Potion(this.ctx, 980, 650)
        ]
        this.key = [
            new Key(this.ctx, 300, 300)
        ]

    }

    start() {
        
        this.intervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.cloudEngine()
            this.coinEngine()
            this.enemyEngine()
            this.mainTheme.play()
        }, 1000 / 60)
    }

    move() {
        this.checkCollision();
        this.bigCloud.move()
        this.player.move()
        this.enemies.forEach(element => {element.move()})
        this.smallCloud1.forEach(element => {element.move()})
    }

    cloudGenerator () {
        this.smallCloud1.push(new SmallCloud1(this.ctx))
    }

    cloudEngine() {
        this.smallCloud1count++;

        if (this.smallCloud1count % 800 === 0) {
            
            this.smallCloud1 = this.smallCloud1.filter(obs => obs.isVisible())
            this.cloudGenerator()
        }
    }

    draw() {
        // Background
        this.background.draw()
        this.smallCloud1.forEach(element => {element.draw()})
        this.bigCloud.draw()
        
        
        this.waterReflect.draw()
        this.palmBack.forEach(element => {element.draw()})
        this.window.draw()
        
        // Various Element
        this.platform.forEach(element => {element.draw()})
        this.coins.forEach(element => {element.draw()})
        this.potion.forEach(element => {element.draw()})
        this.diamond.forEach(element => {element.draw()})
        this.key.forEach(element => {element.draw()})
        // Level
        this.test()
        // Player & Enemies
        this.enemies.forEach(element => {element.draw()})
        this.player.draw()
        // GUI
        this.hpContainer.draw()
        this.hpBar.draw()
        this.coinPoints.draw()
        this.keyPoints.draw()
        
        // Test
    }

    // Random Spawn Coin
    randomSpawnCoin() {
        let randomX = Math.round(Math.random() * (100 - 1200) + 1200)
        this.coins.push(new Coin(this.ctx, randomX, FLOOR - 50))
    }

    coinEngine() {
        this.coinCounter++
        if(this.coins.length <= 10) {

            if (this.coinCounter % 800 === 0) {
                //console.log(this.coins)
                this.randomSpawnCoin()
            }
        }
    }
    // Random Spawn Enemey
    randomSpawnEnemy() {
        let randomSide = Math.round(Math.random())
        let randomPatrol = Math.round(Math.random())
        if(randomSide === 1) {
            let randomX = Math.round(Math.random() * (100 - 300) + 300)
            this.enemies.push(new Crab(this.ctx, randomX, 2, randomPatrol))
        } else if(randomSide === 0) {
            let randomX = Math.round(Math.random() * (900 - 1200) + 1200)
            this.enemies.push(new Crab(this.ctx, randomX, 2, randomPatrol))
        }
    }

    enemyEngine() {
        if(this.enemies.length <= 10) {
            this.enemiesCounter++;
            if (this.enemiesCounter % 100 === 0) {
                this.randomSpawnEnemy()
            }
        }
    }

    // Collisions & Triggers
    checkCollision() {
        this.platformTrigger()
        this.coinTrigger()
        this.diamondTrigger()
        this.potionTrigger()
        this.keyTrigger()
        this.enemyCollide()
        this.swordCollide()
        // Damage Check HP Bar
        this.damageHpBar()
        
    }

    platformTrigger() {
        let platformCollision = this.platform.find(platform => platform.collidePlayer(this.player))
        if(platformCollision) {
            this.player.velocity.y = 0
            this.player.maxY = platformCollision.position.y
            this.player.position.y = this.player.maxY - this.player.height
        } else {
            this.player.maxY = FLOOR
        }
        // Enemy
        let platformCol;
        let enemyCol = this.enemies.find(enemy => {
            platformCol = this.platform.find(platform => platform.platformCollideEnemy(enemy))
            return platformCol
        })
        //let platformCol = this.platform.find(platform => this.enemies.find(enemies => platform.platformCollideEnemy(enemies)))
        // console.log(enemyCol)
        // console.log(platformCol)

        if(enemyCol && platformCol) {
            enemyCol.velocity.y = 0
            enemyCol.maxY = platformCol.position.y
            enemyCol.position.y = enemyCol.maxY - enemyCol.height
            enemyCol.velocity.y = 0
            enemyCol.limits.left = platformCol.position.x
            enemyCol.limits.right = platformCol.position.x + platformCol.width
            

            // if(enemyCol.position.x + enemyCol.width >= platformCol.position.x + platformCol.width) {
            //     console.log('object');
            //     enemyCol.velocity.x *= -1
            //     //enemyCol.position.x = Math.round((platformCol.x + platformCol.width) - enemyCol.width)
            // }
            // if(enemyCol.position.x <= platformCol.position.x) {
            //     console.log('object');
            //     enemyCol.velocity.x *= -1
            //     //enemyCol.position.x = Math.round(platformCol.position.x)
            // }
        } 
        
    }

    coinTrigger() {
        let coisnCollision = this.coins.find(element => element.coinCollide(this.player))
        if(coisnCollision) {
            coisnCollision.coinSound.play()
            this.coinPoints.score += 20
            this.coins = this.coins.filter(element => element != coisnCollision)
        }
    }

    diamondTrigger() {
        let diamondCollision = this.diamond.find(element => element.diamondCollide(this.player))
        if(diamondCollision) {
            diamondCollision.diamondSound.play()
            this.coinPoints.score += 500
            this.diamond = this.diamond.filter(element => element != diamondCollision)
        }
    }

    potionTrigger() {
        let potionCollision = this.potion.find(element => element.potionCollide(this.player))
        if(this.player.health >= 100 && potionCollision) {

        } else if (this.player.health < 100 && potionCollision) {
            potionCollision.potionSound.play()
            this.player.health += potionCollision.restore
            this.potion = this.potion.filter(element => element != potionCollision)
        }
    }

    keyTrigger() {
        let keyTrigger = this.key.find(element => element.keyCollide(this.player))
        if(keyTrigger) {
            keyTrigger.diamondSound.play()
            this.keyPoints.keyN += 1
            this.key = this.key.filter(element => element != keyTrigger)
        }
    }

    enemyCollide() {
        let enemyCollision = this.enemies.some(enemy => enemy.enemyCollid(this.player))
        if(enemyCollision && !this.player.isInvincible) {
            this.enemies.some(enemy => enemy.soundAttack.play())
            this.player.health -= 50
            this.player.isInvincible = true
            setTimeout(() => {
                this.player.isInvincible = false
            }, 2000);
        }
    }
    
    swordCollide() {
        let enemyCollision = this.enemies.find(enemy => this.player.weapon.swords.some(sword => sword.swordCollide(enemy)))
        let swordCollision = this.player.weapon.swords.find(element => this.enemies.some(enemy => element.swordCollide(enemy)))

        if(enemyCollision) {
            this.enemies = this.enemies.filter(enemy => enemy != enemyCollision)
            this.coinPoints.score += 100
            this.player.weapon.swords =this.player.weapon.swords.filter(sword => sword != swordCollision)
            this.randomTreasure(enemyCollision.position.x, enemyCollision.position.y)
        }
    }

    damageHpBar() { 
        Math.floor(this.hpBar.width = (342 * this.player.health) / 100)
        console.log(this.player.health)
        // if(this.player.health < 0) {
        //     this.gameOver()
        // }
    }
    
    randomTreasure(posX, posY) {
        let randomNumber = Math.floor(Math.random()*100+1)
            // console.log(randomNumber)
        if (randomNumber <= 60) {
            // console.log('nada')
        } else if (randomNumber <= 85) {
            // console.log('moneda')
            this.coins.push(new Coin(this.ctx, posX, posY + 15))
        } else if (randomNumber <= 90) {
            // console.log('diamante')
            this.diamond.push(new Diamond(this.ctx, posX, posY + 15))
        } else if (randomNumber <= 95) {
            // console.log('pocion')
            this.potion.push(new Potion(this.ctx, posX, posY + 15))
        } else if (randomNumber <= 100) {
            // console.log('llave')
            this.key.push(new Key(this.ctx, posX, posY + 15))
        }
        
    }

    // Clear Function
    clear() {
        this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
        )
        this.coins = this.coins.filter((coin) => !coin.isObsolete)
    }

    gameOver() {
        
        this.youLose.play();
        this.mainTheme.src = './assets/sound/gameover.mp3';
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.ctx.font = '140px pixelFont';
        this.ctx.fillStyle = 'red';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 100);
        
    }  
    test() {
        this.ctx.font = "44px pixelFont";
        this.ctx.fillStyle = "#000";
        this.ctx.textAlign = "right";
        this.ctx.fillText('PEPITO', 600, 600);
    }

}