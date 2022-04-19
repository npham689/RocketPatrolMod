class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('bgm_Odyssey', './assets/InterplanetaryOdyssey.mp3');
    }

    create() {

        let menuConfig = {
            fontFamily: 'Helvetica',
            fontSize: '20px',
            backgroundColor: '#00FF00',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        }

        // Show menu text
        menuConfig.fontSize = '30px';
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize * 2 - borderPadding * 2, "Rocket Patrol Mod", menuConfig).setOrigin(0.5);

        menuConfig.fontSize = '20px';
        this.add.text(game.config.width / 2, game.config.height / 2 - borderUISize - borderPadding, "Player 1: Use (A) and (D) to move & (W) to fire", menuConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2, "Player 2: Use ←→ arrows to move & (↑) arrow to fire", menuConfig).setOrigin(0.5);


        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width / 2, game.config.height / 2 + borderUISize + borderPadding, "Press ← for Novice and → for Expert", menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // Novice mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // Expert mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_select');
            this.scene.start('playScene');
        }
    }
}
