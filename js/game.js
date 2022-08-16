class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.intervalId = null;
        
        this.player = new Player(this.ctx);        
        this.sword = new Sword(this.ctx);
        this.weapon = new Weapon(this.ctx);

        this.level = 0;
        this.platforms = [
            [
                new Platform(this.ctx, 'Platform 1', 64, 512, 384, 128, 0),
                new Platform(this.ctx, 'Platform 2', 896, 512, 322, 128, 0),
                new Platform(this.ctx, 'Platform 3', 256, 320, 192, 64, 0),
                new Platform(this.ctx, 'Platform 4', 640, 320, 256, 64, 0),
                new Platform(this.ctx, 'Platform 5', 576, 576, 64, 64, 0),
                new Platform(this.ctx, 'Platform 6', 640, 512, 64, 192, 0),
                new Platform(this.ctx, 'Palm Platform 1', 167, 384, 46, 5, 0),
                new Platform(this.ctx, 'Palm Platform 1', 489, 704, 46, 5, 0),
                new Platform(this.ctx, 'Palm Platform 1', 809, 704, 46, 5, 0),
                new Platform(this.ctx, 'Palm Platform 1', 720, 566, 46, 5, 0),
                new Platform(this.ctx, 'Palm Platform 1', 961, 320, 46, 5, 0),
                new Platform(this.ctx, 'Palm Platform 1', 1058, 384, 46, 5, 0),
            ],
            [
                new Platform(this.ctx, 'Platform 1', 128, 256, 192, 64, 0),
                new Platform(this.ctx, 'Platform 2', 384, 448, 192, 64, 0),
                new Platform(this.ctx, 'Platform 3', 128, 640, 192, 64, 0),
                new Platform(this.ctx, 'Platform 3', 704, 320, 320, 64, 0),
                new Platform(this.ctx, 'Platform 3', 704, 576, 320, 64, 0),
                new Platform(this.ctx, 'Palm Platform 1', 450, 320, 46, 5, 0),
                new Platform(this.ctx, 'Palm Platform 2', 258, 512, 46, 5, 0),
                new Platform(this.ctx, 'Palm Platform 3', 514, 640, 46, 5, 0),
                new Platform(this.ctx, 'Palm Platform 4', 410, 704, 46, 5, 0),
                new Platform(this.ctx, 'Palm Platform 5', 1096, 704, 46, 5, 0),
                new Platform(this.ctx, 'Palm Platform 6', 1142, 514, 46, 5, 0),
                new Platform(this.ctx, 'Palm Platform 6', 1142, 320, 46, 5, 0),
            ],
        ]
        // Zone  q
        this.spawnCounter = 0;
        this.nameCounter = 0;
        this.zones = [
            [
                {name: 'L1 - zone 1', spawnCoor: {x: 320, y: 448}, velocity: 1, maxEnemy: 0, enemies: []},
                {name: 'L1 - zone 2', spawnCoor: {x: 384, y: 230}, velocity: -1, maxEnemy: 0, enemies: []},
                {name: 'L1 - zone 3', spawnCoor: {x: 700, y: 200}, velocity: -1, maxEnemy: 0, enemies: []},
                {name: 'L1 - zone 4', spawnCoor: {x: 1140, y: 400 }, velocity: -1, maxEnemy: 0, enemies: []},
                {name: 'L1 - zone 5', spawnCoor: {x: 640, y: 768 }, velocity: 1, maxEnemy: 1, enemies: []},
                {name: 'L1 - zone 6', spawnCoor: {x: 1088, y: 768 }, velocity: -1, maxEnemy: 1, enemies: []},
            ],
            [
                {name: 'L2 - zone 1', spawnCoor: {x: 350, y: 768}, velocity: 1, maxEnemy: 1, enemies: []},
                {name: 'L2 - zone 2', spawnCoor: {x: 1000, y: 768}, velocity: -1, maxEnemy: 1, enemies: []},
                {name: 'L2 - zone 3', spawnCoor: {x: 768, y: 256}, velocity: 1, maxEnemy: 0, enemies: []},
                {name: 'L2 - zone 4', spawnCoor: {x: 380 , y: 350}, velocity: 1, maxEnemy: 0, enemies: []},
                {name: 'L2 - zone 5', spawnCoor: {x: 768 , y: 500}, velocity: 1, maxEnemy: 0, enemies: []},
                {name: 'L2 - zone 6', spawnCoor: {x: 150 , y: 130}, velocity: -1, maxEnemy: 0, enemies: []},
            ]
        ]

        this.levelTreasures = [
            [],
            [],
        ]
        
        this.palmsFront = [
            [
                new Palm(this.ctx, 'Palm 1', 704, 566),
                new Palm(this.ctx, 'Palm 1', 945, 320),
                new Palm(this.ctx, 'Palm 1', 1042, 384),
                new Palm(this.ctx, 'Palm 1', 793, 704),
                new Palm(this.ctx, 'Palm 1', 473, 704),
                new Palm(this.ctx, 'Palm 1', 151, 384),
            ],
            [
                new Palm(this.ctx, 'Palm 1', 434, 320),
                new Palm(this.ctx, 'Palm 2', 242, 512),
                new Palm(this.ctx, 'Palm 3', 394, 704),
                new Palm(this.ctx, 'Palm 4', 498, 640),
                new Palm(this.ctx, 'Palm 5', 1080, 704),
                new Palm(this.ctx, 'Palm 6', 1126, 514),
                new Palm(this.ctx, 'Palm 7', 1126, 320),
            ]
        ]
        this.palmsBack = [
            [
                new PalmBack(this.ctx, 'Palm Back 1', 281, 217),
                new PalmBack(this.ctx, 'Palm Back 2', 196, 732),
                new PalmBack(this.ctx, 'Palm Back 3', 518, 732),
                new PalmBack(this.ctx, 'Palm Back 4', 690, 192),
                new PalmBack(this.ctx, 'Palm Back 5', 242, 704),
            ],
            [
                new PalmBack(this.ctx, 'Palm Back 1', 114, 512),
                new PalmBack(this.ctx, 'Palm Back 1', 882, 192),
            ]
        ]

        this.graphicsLevels = [
            {
                platformSrc: './assets/img/level1-platform.png',
                frontSrc: './assets/img/level1-front.png',
                backSrc: './assets/img/level1-back.png',
                backgroundSrc: './assets/img/background.png',
                windowSrc: './assets/img/level1-window.png',
                door: new Door(this.ctx, 128, 758, 10, 0),
            },
            {
                platformSrc: './assets/img/level2-platform.png',
                frontSrc: './assets/img/level2-front.png',
                backSrc: './assets/img/level2-back.png',
                backgroundSrc: './assets/img/background.png',
                windowSrc: './assets/img/level2-window.png',
                door: new Door(this.ctx, 834, 502, 10, 0),
            },
        ]

        this.levelKeys = [1, 1, 1]
        this.activeSpawn = true;

        this.platformPrint = new PlatformPrint(this.ctx, this.graphicsLevels[this.level].platformSrc);
        this.frontPrint = new FrontPrint(this.ctx, this.graphicsLevels[this.level].frontSrc);
        this.backPrint = new BackPrint(this.ctx, this.graphicsLevels[this.level].backSrc);
        this.background = new BackgroundPrint(this.ctx, this.graphicsLevels[this.level].backgroundSrc);
        this.windowFrame = new WindowFrame(this.ctx, this.graphicsLevels[this.level].windowSrc);
        this.door = this.graphicsLevels[this.level].door;
        this.waterReflect = new WaterReflect(this.ctx);
        this.bigCloud = new BigClouds(this.ctx);
        this.smallClouds = [];
        this.smallCloudsCount = 0;
        
        // Gui
        this.scoreGUI = new ScoreGUI(this.ctx);
        this.healthBar = new HealthBar(this.ctx);
        this.healthContainer = new HealthBarContainerGUI(this.ctx);
        this.keyGUI = new KeyGUI(this.ctx);
        this.levelGUI = new LevelGUI(this.ctx);
        this.keyDoorsGUI = new KeyDoorsGUI(this.ctx);

        // Sound
        this.mainTheme = new Audio()
        this.mainTheme.src = './assets/audio/main.mp3'
        this.mainTheme.volume = 0.5
        this.youLose = new Audio()
        this.youLose.src = './assets/audio/youlose.mp3'
        this.youWin = new Audio()
        this.youWin.src = './assets/audio/youwin.mp3'
    }

    start() {
        this.intervalId = setInterval(() => {
            this.clear();
            this.guiComponent();
            this.checkCollisions();
            this.draw();
            this.move();
            this.spawnCheck();
            this.endGame();
            this.mainTheme.play();
        }, 1000 / 60)
        if(this.endgameActive) {
            this.endGame();
            this.mainTheme.play();
        }
    }

    spawnCheck() {
        const spawTime = 400;
        if(this.activeSpawn) {
            this.zones[this.level].forEach(zone => {
                if(zone.enemies.length === 0) {
                    zone.enemies.push(new Crab(this.ctx, 'Crab ' + this.nameCounter, zone.spawnCoor.x, zone.spawnCoor.y, zone.velocity * 2, true));
                    this.nameCounter++;
                }
                this.activeSpawn = false;
        });
            
        } else {
            this.spawnCounter++;
            if (this.spawnCounter % spawTime === 0) {
                this.spawnCounter = 0;
                this.zones[this.level].forEach(zone => {
                    if(zone.enemies.length <= zone.maxEnemy) {
                        zone.enemies.push(new Crab(this.ctx, 'Crab ' + this.nameCounter, zone.spawnCoor.x, zone.spawnCoor.y, zone.velocity * 2, true));
                        this.nameCounter++;
                    }
                });
            }
        }
    }
    
    move() {
        this.player.move();
        this.zones[this.level].forEach(zone => zone.enemies.forEach(enemy => enemy.move()));
        this.bigCloud.move();
        this.smallClouds.forEach(cloud => cloud.move());
    }

    guiComponent() {
        this.levelGUI.level = this.level;
        this.healthBar.health = this.player.health;
        this.keyGUI.keyReq = this.levelKeys[this.level];
        this.scoreGUI.score = this.player.score;
        this.keyGUI.keyNum = this.player.keys;
    }

    // Collisions
    checkCollisions() {
        this.platformCollision();
        this.enemyCollision();
        this.doorCollision();
        this.swordCollision();
        this.itemCollision();
    }

    itemCollision() {
        let itemCollision = this.levelTreasures[this.level].find(element => element.itemCollide(this.player))
        if(itemCollision) {
            itemCollision.treasureSound.play();
            itemCollision.itemAdd(this.player);
            this.levelTreasures[this.level] = this.levelTreasures[this.level].filter(item => item != itemCollision);
        }
    }
    
    platformCollision() {
        // Player & Platform Collision
        let playerCollidesPlatform = this.platforms[this.level].find(platform => platform.collidesPlayer(this.player));
        if(playerCollidesPlatform) {
            this.player.velocity.y = 0;
            this.player.maxY = playerCollidesPlatform.position.y;
            this.player.position.y = this.player.maxY - this.player.height;
        } else {
            this.player.maxY = FLOOR;
        }
        // Enemy & Platform Collision
        let enemyCollidesPlatform;
        let platformCollided;
        this.zones[this.level].find(zone => enemyCollidesPlatform = zone.enemies.find(enemy => {
        platformCollided = this.platforms[this.level].find(platform => platform.collidesEnemy(enemy))
            return platformCollided;
        }))
        if(enemyCollidesPlatform && platformCollided) {
            enemyCollidesPlatform.velocity.y = 0;
            enemyCollidesPlatform.maxY = platformCollided.position.y;
            enemyCollidesPlatform.position.y = enemyCollidesPlatform.maxY - enemyCollidesPlatform.height;
            enemyCollidesPlatform.velocity.y = 0;
            enemyCollidesPlatform.limits.left = platformCollided.position.x;
            enemyCollidesPlatform.limits.right = platformCollided.position.x + platformCollided.width;
        } 
    }

    enemyCollision() {
        let enemyCollidePlayer;
        this.zones[this.level].find(zone => {return enemyCollidePlayer = zone.enemies.find(enemy => enemy.collidesWhitPlayer(this.player))})
        if(enemyCollidePlayer && !this.player.isInvincible) {
            this.player.isInvincible = true;
            this.player.health -= enemyCollidePlayer.damage;
            enemyCollidePlayer.soundAttack.play()
            this.player.rightSprite = this.player.rightSpriteDamage;
            this.player.leftSprite = this.player.leftSpriteDamage;
            setTimeout(() => {
                this.player.rightSprite = this.player.rightSpriteNormal;
                this.player.leftSprite = this.player.leftSpriteNormal;
                this.player.isInvincible = false;
            }, 1000);
        }
    }

    doorCollision() {        
        if(this.door.collidesWhitPlayer(this.player) && this.player.keys === this.levelKeys[this.level]) {
            this.level++
            this.platformPrint = new PlatformPrint(this.ctx, this.graphicsLevels[this.level].platformSrc);
            this.frontPrint = new FrontPrint(this.ctx, this.graphicsLevels[this.level].frontSrc);
            this.backPrint = new BackPrint(this.ctx, this.graphicsLevels[this.level].backSrc);
            this.background = new BackgroundPrint(this.ctx, this.graphicsLevels[this.level].backgroundSrc);
            this.windowFrame = new WindowFrame(this.ctx, this.graphicsLevels[this.level].windowSrc);
            this.door = this.graphicsLevels[this.level].door;
            this.waterReflect = new WaterReflect(this.ctx);
            this.bigCloud = new BigClouds(this.ctx);
            this.smallClouds = [];
            this.smallCloudsCount = 0;
            this.player.keys = 0;
            this.activeSpawn = true;
        } else if (this.door.collidesWhitPlayer(this.player) && this.player.keys < this.levelKeys[this.level]) {
            console.log("You don't have enough keys to access");
            this.keyDoorsGUI.active = true;
        }
        this.keyDoorsGUI.active = false;
    }
    
    swordCollision() {
        let swordCollision;
        let enemyCollision;

        this.zones[this.level].find(zone => enemyCollision = zone.enemies.find(enemy => swordCollision = this.player.weapon.swords.find(sword => sword.swordCollide(enemy))));

        if(enemyCollision) {
            this.zones[this.level].forEach(zone => zone.enemies = zone.enemies.filter(enemy => enemy != enemyCollision));
            this.player.score += 200;
            this.player.weapon.swords = this.player.weapon.swords.filter(sword => sword != swordCollision);
            this.randomLoot(enemyCollision.position.x, enemyCollision.position.y + 20);
        }
    }

    randomLoot (posX, posY) {
        
        // const itemArray = [Coin, Coin, Coin, Coin, Coin, Potion, Potion, Emerald, Diamond, Key];
        const itemArray = [Coin, Potion, Emerald, Diamond, Key];

        const generate = () => {
            const randomNum = Math.floor(Math.random() * itemArray.length);
            this.levelTreasures[this.level].push(new itemArray[randomNum](this.ctx, posX, posY))
        };
        return generate();
    }

    // Draw
    draw() {
        // Background
        this.background.draw();
        this.smallClouds.forEach(cloud => cloud.draw());
        this.cloudEngine();
        this.bigCloud.draw();
        this.waterReflect.draw();
        this.backPrint.draw();
        this.platformPrint.draw();
        this.platforms[this.level].forEach(platform => platform.draw());
        this.palmsBack[this.level].forEach(palm => palm.draw());
        this.door.draw();
        // Treasures
        this.levelTreasures[this.level].forEach(element => element.draw())
        // Game
        this.zones[this.level].forEach(zone => zone.enemies.forEach(enemy => enemy.draw()));
        this.player.draw();
        // Front
        this.frontPrint.draw();
        this.palmsFront[this.level].forEach(palm => palm.draw());
        // Window
        this.windowFrame.draw();
        this.healthContainer.draw();
        this.healthBar.draw();
        this.scoreGUI.draw();
        this.keyGUI.draw();
        this.levelGUI.draw();
        this.keyDoorsGUI.isActive()
    }

    cloudEngine() {
        this.smallCloudsCount++;
        if (this.smallCloudsCount % 800 === 0) {
            this.smallClouds = this.smallClouds.filter(cloud => cloud.isVisible())
            this.smallClouds.push(new SmallClouds(this.ctx))
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);      
        this.levelTreasures[this.level] = this.levelTreasures[this.level].filter(item => !item.isObsolete)
    }

    endGame() {         
        if(this.player.health <= 0) {
            setTimeout(() => {
                restartBtn.style.display = 'block'
                this.gameOver()
            }, 100);
            
        }
        if(this.door.collidesWhitPlayer(this.player) && this.player.keys === this.levelKeys[this.level] && this.level === 1) {
            setTimeout(() => {
                restartBtn.style.display = 'block'
                this.gameEnd()
            }, 100);   
        }
    }

    gameOver() {
        this.youLose.play();
        this.mainTheme.src = './assets/audio/gameover.mp3';
        this.mainTheme.play();
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.ctx.font = '140px pixelFont';
        this.ctx.fillStyle = '#ba2a2a';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Over', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 100);
    }

    gameEnd() {
        this.youWin.play();
        this.mainTheme.src = './assets/audio/endgame.mp3';
        this.mainTheme.play();
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.ctx.font = '64px pixelFont';
        this.ctx.fillStyle = '#33323d';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Thanks for playing', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
        this.ctx.font = '36px pixelFont';
        this.ctx.fillStyle = '#33323d';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Creted by: Marek Laz # Ironhack 2022', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 400); 
    }  

}