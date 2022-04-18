class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('rocket2', './assets/rocket2.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');

        //Load sprite sheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 9
        });
        // Red spaceship
        this.load.spritesheet('spaceship2', './assets/spaceshipsheet.png', {
            frameWidth: 75,
            frameHeight: 32,
            startFrame: 0,
            endFrame: 3
        });
        // Small yellow spaceship
        this.load.spritesheet('spaceshipspecial', './assets/spaceshipspecialsheet.png', {
            frameWidth: 32,
            frameHeight: 16,
            startFrame: 0,
            endFrame: 3
        });
    }

    create() {

        // Background music
        this.bgm = this.sound.add('bgm_Odyssey');
        this.bgm.play();

        this.gameStartTime = game.settings.gameTimer;
        this.start = this.getTime();
        
        //place starfield
        this.starfield = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'starfield').setOrigin(0, 0);

        // Green UI Background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00ff00).setOrigin(0, 0);
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xffff0f).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xffff0f).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xffff0f).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xffff0f).setOrigin(0, 0);

        //Adding two rockets for two playermode
        this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket', 0, true).setOrigin(0.5, 0);
        this.p2Rocket = new Rocket(this, game.config.width / 3, game.config.height - borderUISize - borderPadding, 'rocket2', 0, false).setOrigin(0.5, 0);

        this.anims.create({
            key: 'moveship',
            frames: this.anims.generateFrameNumbers('spaceship2', {
                start: 0,
                end: 3,
                first: 0
            }),
            repeat: -1,
            frameRate: 6
        });

        this.anims.create({
            key: 'movespecialship',
            frames: this.anims.generateFrameNumbers('spaceshipspecial', {
                start: 0,
                end: 3,
                first: 0
            }),
            repeat: -1,
            frameRate: 6
        });

        // Add spaceships
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship2', 0, 30).setOrigin(0, 0);
        this.ship01.anims.play('moveship');
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship2', 0, 20).setOrigin(0, 0);
        this.ship02.anims.play('moveship');
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship2', 0, 10).setOrigin(0, 0);
        this.ship03.anims.play('moveship');

        this.ship04 = new SpaceshipSpecial(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceshipspecial', 0, 50).setOrigin(0, 0);
        this.ship04.anims.play('movespecialship');

        // define all keys
        // First player's movement/fire
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        // Second player's movement/fire
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP)
        // Restart Key
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });


        // initialize score
        this.p1Score = 0;
        this.p2Score = 0;

        // Display Score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreConfig = scoreConfig;

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);
        this.scoreRight = this.add.text(game.config.width - borderUISize - borderPadding - scoreConfig.fixedWidth, borderUISize + borderPadding * 2, this.p2Score, scoreConfig);
        this.timeLeft = this.add.text(game.config.width / 2, borderUISize + borderPadding * 2, this.p1Score, scoreConfig).setOrigin(0.5, 0);
        // Game Over flag
        this.gameOver = false;

        scoreConfig.fixedWidth = 0;
    }

    update() {

        // 60 Second play clock
        this.timeLeft.text = Math.round(game.settings.gameTimer / 1000);
        if (game.settings.gameTimer <= 0) {
            this.add.text(game.config.width / 2, game.config.height / 2, "Game Over", this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, "Press (R) to Restart or ← for Menu", this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        } else {
            game.settings.gameTimer -= this.getDeltaTime();
        }
        // check key input for restart or return to menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            game.settings.gameTimer = this.gameStartTime;
            this.scene.restart();
            this.bgm.stop();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            this.bgm.stop();
        }

        this.starfield.tilePositionX -= starSpeed;
        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.p2Rocket.update();             // update p2
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }
        
        // Collision Checking
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.shipExplode(this.p1Rocket, this.ship03);
            this.p1Rocket.reset();
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.shipExplode(this.p1Rocket, this.ship02);
            this.p1Rocket.reset();
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.shipExplode(this.p1Rocket, this.ship01);
            this.p1Rocket.reset();
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)){
            this.shipExplode(this.p1Rocket, this.ship04);
            this.p1Rocket.reset();
        }
        

        if(this.checkCollision(this.p2Rocket, this.ship03)){
            this.shipExplode(this.p2Rocket, this.ship03);
            this.p2Rocket.reset();
        }
        if(this.checkCollision(this.p2Rocket, this.ship02)){
            this.shipExplode(this.p2Rocket, this.ship02);
            this.p2Rocket.reset();
        }
        if(this.checkCollision(this.p2Rocket, this.ship01)){
            this.shipExplode(this.p2Rocket, this.ship01);
            this.p2Rocket.reset();
        }
        if(this.checkCollision(this.p2Rocket, this.ship04)){
            this.shipExplode(this.p2Rocket, this.ship04);
            this.p2Rocket.reset();
        }
    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }

    }

    shipExplode(rocket, ship) {
        // Temporarily hide ship
        ship.alpha = 0;
        // create explosion spirte at the ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        // add score and repaint it
        if (rocket.isPlayer1) {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        } else {
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
        }
        // Add some time if a specific spaceship is hit
        // If a spaceship that is hit is worth more points, then more time added
        game.settings.gameTimer += (170 * ship.points);

        this.sound.play('sfx_explosion');
    }

    getTime() {
        let d = new Date();
        return d.getTime();
    }

    getDeltaTime() {
        //subtract the start time from the time now
        let elapsed = this.getTime() - this.start;
        //reset the start time
        this.start = this.getTime();
        return elapsed;
    }
}