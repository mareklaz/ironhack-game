class Game {
    constructor (ctx) {
        this.ctx = ctx
        this.intervalId = null
        
        // Background
        this.window = new Window(this.ctx)
        this.background = new Background(this.ctx)
        this.bigCloud = new BigClouds(this.ctx)
        this.waterReflect = new WaterReflect(this.ctx)
        this.smallCloud = []
        this.smallCloudcount = 0

        this.platformsPrint = new PlatformPrint(this.ctx)
        this.backLevelPrint = new BackLevelPrint(this.ctx)
        this.frontLevelPrint = new FrontLevelPrint(this.ctx)
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
        this.door = new Door (this.ctx, 110, 286, 82, 98, 0)
        this.platform = [ // x, y, width, height
            new Platform(this.ctx, 'plataforma1', 64, 384, 448, 128, true, 0),
            new Platform(this.ctx, 'plataforma2', 704, 384, 192, 128, true, 0),
            new Platform(this.ctx, 'plataforma3', 192, 640, 192, 64, true, 0),
            new Platform(this.ctx, 'plataforma4', 512, 640, 192, 64, true, 0),
            new Platform(this.ctx, 'plataforma5', 896, 640, 192, 64, true, 0),
            new Platform(this.ctx, 'plataforma6', 206, 768, 46, 5, false, 0),
            new Platform(this.ctx, 'plataforma7', 580, 498, 46, 5, false, 0),
            new Platform(this.ctx, 'plataforma8', 1097, 384, 46, 5, false, 0),
            new Platform(this.ctx, 'plataforma9', 770, 716, 46, 5, false, 0),
        ]

        // Treasures
        this.timeSpawn = 0
        this.coinCounter = 0
        this.coins = []
        this.diamonds = []
        this.potions = []
        this.esmeralds = []
        this.keys = []

    }

    start() {
        
        this.intervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.cloudEngine()
            this.enemyEngine()
            this.treasureEngine()
            this.mainTheme.play()
        }, 1000 / 60)
    }

    move() {
        this.checkCollision();
        this.bigCloud.move()
        this.player.move()
        this.enemies.forEach(element => {element.move()})
        this.smallCloud.forEach(element => {element.move()})
    }

    
    draw() {
        // Background
        this.background.draw()
        this.smallCloud.forEach(element => {element.draw()})
        this.bigCloud.draw()
        this.waterReflect.draw()
        this.backLevelPrint.draw()
        this.platformsPrint.draw()
        

        // Various Element
        this.platform.forEach(element => {element.draw()})
        this.coins.forEach(element => {element.draw()})
        this.potions.forEach(element => {element.draw()})
        this.diamonds.forEach(element => {element.draw()})
        this.keys.forEach(element => {element.draw()})
        this.esmeralds.forEach(element => {element.draw()})
        // Level

        // Player & Enemies
        this.enemies.forEach(element => {element.draw()})
        this.player.draw()
        this.frontLevelPrint.draw()
        // GUI
        this.window.draw()
        this.hpContainer.draw()
        this.hpBar.draw()
        this.coinPoints.draw()
        this.keyPoints.draw()
        
        // Test
        this.door.draw()
    }

    

    // Engine & Generators 
    cloudEngine() {
        this.smallCloudcount++;

        if (this.smallCloudcount % 800 === 0) {
            
            this.smallCloud = this.smallCloud.filter(obs => obs.isVisible())
            this.smallCloud.push(new SmallCloud1(this.ctx))
        }
    }

    randomSpawnEnemy() {
        
    }

    enemyEngine() {
        const location1 = {positionX: 128, positionY: 256, velocity: 1, patrol: false,}
        const location2 = {positionX: 128, positionY: 256, velocity: -1, patrol: true,}
        const location3 = {positionX: 768, positionY: 256, velocity: 1, patrol: true}
        const location4 = {positionX: 768, positionY: 256, velocity: -1, patrol: false}
        const location5 = {positionX: 256, positionY: 550, velocity: 1, patrol: true}
        const location6 = {positionX: 906, positionY: 550, velocity: 1, patrol: true}
        const location7 = {positionX: 128, positionY: 768, velocity: 1, patrol: false}
        const location8 = {positionX: 1152, positionY: 768, velocity: -1, patrol: false}

        let spawLocation = [location1, location2, location3, location4, location5, location6, location7, location8]
        let spawnRandomNumber = Math.round(Math.random() * spawLocation.length)
        
        if(this.enemies.length <= 10) {
            this.enemiesCounter++;
            if (this.enemiesCounter % 50 === 0) {
                let randomEnemey = Math.round(Math.random())
                // let randomPatrol = Math.round(Math.random())
                
                if(randomEnemey === 1) {
                    this.enemies.push(new Shark(this.ctx, spawLocation[spawnRandomNumber].positionX, spawLocation[spawnRandomNumber].positionY, 2 * spawLocation[spawnRandomNumber].velocity, spawLocation[spawnRandomNumber].patrol))
                } else if(randomEnemey === 0) {
                    this.enemies.push(new Crab(this.ctx, spawLocation[spawnRandomNumber].positionX, spawLocation[spawnRandomNumber].positionY, 2 * spawLocation[spawnRandomNumber].velocity, spawLocation[spawnRandomNumber].patrol))
                }
                
            }
        }
    }

    treasureEngine() {

        const coin = {id: 1, arr: this.coins, treasure: Coin}
        const diamond = {id: 2, arr: this.diamonds, treasure: Diamond}
        const potion = {id: 3, arr: this.potions, treasure: Potion}
        const key = {id: 4, arr: this.keys, treasure: Key}
        const esmerald = {id: 5, arr: this.esmeralds, treasure: Esmerald}

        const treasureList = [coin, coin, coin, coin, coin, coin, coin, coin, coin, esmerald, esmerald, diamond, diamond, potion, key]
        let numeroTesoroAleatorio = Math.round(Math.random() * treasureList.length)

        let numeroPlataformaAleatorio = Math.round(Math.random() * this.platform.length)
        const plataformaSelecionada = this.platform[numeroPlataformaAleatorio]
        
        if (plataformaSelecionada.spawnLoot) {
            let numero = Math.round((Math.random() * plataformaSelecionada.width)) // 0 - 192
            const positionX = (plataformaSelecionada.position.x) + (numero)
            const positionY = plataformaSelecionada.position.y - 50
            this.timeSpawn++
            if (this.timeSpawn % 100 === 0) {
                if(treasureList[numeroTesoroAleatorio].arr.length <= 5) {
                    treasureList[numeroTesoroAleatorio].arr.push(new treasureList[numeroTesoroAleatorio].treasure(this.ctx, positionX, positionY)) 
                }
            }
        } else {
            
        }
    }

    // Collisions & Triggers
    checkCollision() {
        this.platformTrigger()
        this.coinsTrigger()
        this.diamondsTrigger()
        this.potionsTrigger()
        this.keysTrigger()
        this.esmeraldsTrigger()
        this.enemiesCollide()
        this.swordCollide()
        this.doorTrigger()
        // Damage Check HP Bar
        this.damageHpBar()
        
    }

    platformTrigger() {
        // Player
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

        if(enemyCol && platformCol) {
            enemyCol.velocity.y = 0
            enemyCol.maxY = platformCol.position.y
            enemyCol.position.y = enemyCol.maxY - enemyCol.height
            enemyCol.velocity.y = 0
            enemyCol.limits.left = platformCol.position.x
            enemyCol.limits.right = platformCol.position.x + platformCol.width

        } 
        
    }

    doorTrigger() {
        const doorCollision = this.door.doorCollide(this.player)
        if(doorCollision) {
            console.log('colisionando')
            
        }
        this.ctx.font = '26px pixelFont';
        this.ctx.fillStyle = '#eed878';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`${this.keyPoints.keyN}/10`, 151, 240);
    }

    esmeraldsTrigger() {
        let esmeraldCollision = this.esmeralds.find(esmerald => esmerald.esmeraldCollide(this.player))
        if(esmeraldCollision) {
            esmeraldCollision.esmeraldSound.play()
            this.coinPoints.score += 100
            this.esmeralds = this.esmeralds.filter(esmerald => esmerald != esmeraldCollision)
        }
    }

    coinsTrigger() {
        let coinsCollision = this.coins.find(coin => coin.coinCollide(this.player))
        if(coinsCollision) {
            coinsCollision.coinSound.play()
            this.coinPoints.score += 20
            this.coins = this.coins.filter(coin => coin != coinsCollision)
        }
    }

    diamondsTrigger() {
        let diamondsCollision = this.diamonds.find(diamond => diamond.diamondCollide(this.player))
        if(diamondsCollision) {
            diamondsCollision.diamondSound.play()
            this.coinPoints.score += 500
            this.diamonds = this.diamonds.filter(diamond => diamond != diamondsCollision)
        }
    }

    potionsTrigger() {
        let potionsCollision = this.potions.find(potion => potion.potionCollide(this.player))
        if (this.player.health < 100 && potionsCollision) {
            potionsCollision.potionSound.play()
            this.player.health += potionsCollision.restore
            this.potions = this.potions.filter(potion => potion != potionsCollision)
        }
    }

    keysTrigger() {
        let keyCollision = this.keys.find(key => key.keyCollide(this.player))
        if(keyCollision) {
            keyCollision.diamondSound.play()
            this.keyPoints.keyN += 1
            this.keys = this.keys.filter(key => key != keyCollision)
        }
    }

    enemiesCollide() {
        let enemyCollision = this.enemies.find(enemy => enemy.enemyCollid(this.player))
        if(enemyCollision && !this.player.isInvincible) {
            this.enemies.some(enemy => enemy.soundAttack.play())
            this.player.health -= enemyCollision.damage
            this.player.isInvincible = true
            this.player.rightSprite = this.player.rightSpriteDamage
            this.player.leftSprite = this.player.leftSpriteDamage

            setTimeout(() => {
                this.player.rightSprite = this.player.rightSpriteNormal
                this.player.leftSprite = this.player.leftSpriteNormal
                this.player.isInvincible = false
            }, 2000);
        }
    }
    
    swordCollide() {
        let enemyCollision = this.enemies.find(enemy => this.player.weapon.swords.some(sword => sword.swordCollide(enemy)))
        let swordCollision = this.player.weapon.swords.find(element => this.enemies.some(enemy => element.swordCollide(enemy)))

        if(enemyCollision) {
            this.enemies = this.enemies.filter(enemy => enemy != enemyCollision)
            this.coinPoints.score += 200
            this.player.weapon.swords =this.player.weapon.swords.filter(sword => sword != swordCollision)
            this.randomLoot(enemyCollision.position.x, enemyCollision.position.y)
        }
    }

    damageHpBar() { 
        Math.floor(this.hpBar.width = (342 * this.player.health) / 100)
        
        if(this.player.health <= 0) {
            this.hpBar.width = 0
            setTimeout(() => {
                restartBtn.style.display = 'block'
                this.gameOver()
            }, 100);
            
        }
    }
    
    randomLoot (posX, posY) {
        let randomNumber = Math.floor(Math.random()*100+1)
            // console.log(randomNumber)
        if (randomNumber < 60) {
            // console.log('nada')
        } else if (randomNumber <= 60) {
            // console.log('moneda')
            this.coins.push(new Coin(this.ctx, posX, posY))
        } else if (randomNumber <= 70) {
            // console.log('diamante')
            this.esmeralds.push(new Esmerald(this.ctx, posX, posY))
        } else if (randomNumber <= 85) {
            // console.log('pocion')
            this.diamonds.push(new Diamond(this.ctx, posX, posY))
        } else if (randomNumber <= 90) {
            // console.log('llave')
            this.potions.push(new Potion(this.ctx, posX, posY))
        } else if (randomNumber <= 95) {
            // console.log('llave')
            this.keys.push(new Key(this.ctx, posX, posY))
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
        this.diamonds = this.diamonds.filter((diamond) => !diamond.isObsolete)
        this.potions = this.potions.filter((potion) => !potion.isObsolete)
        this.keys = this.keys.filter((key) => !key.isObsolete)
        this.esmeralds = this.esmeralds.filter((esmerald) => !esmerald.isObsolete)
    }

    gameOver() {
        
        this.youLose.play();
        this.mainTheme.src = './assets/sound/gameover.mp3';
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.ctx.font = '140px pixelFont';
        this.ctx.fillStyle = '#ba2a2a';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 100);
        
    }  

}