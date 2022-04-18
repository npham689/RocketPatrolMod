// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, player1) {
        super(scene, x, y, texture, frame);
        // add object to the existing scene new
        scene.add.existing(this);
        this.isFiring = false; // Track the firing status
        this.moveSpeed = 2; // Pixel per frame
        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
        this.isPlayer1 = player1;
    }

    update() {
        // left/right movement
        let currentSpeed = this.moveSpeed;
        if (this.isFiring) {
            currentSpeed *= .5;
        }

        if (this.isPlayer1 == true) {
            if (keyA.isDown && this.x >= borderUISize + this.width) {
                this.x -= currentSpeed;
            }
            if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += currentSpeed;
            }

        } else {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= currentSpeed;
            }
            if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += currentSpeed;
            }
        }

        // fire button
        if (this.isPlayer1 == true) {
            if (Phaser.Input.Keyboard.JustDown(keyW) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play();
            }
        } else {

            if (Phaser.Input.Keyboard.JustDown(keyUP) && !this.isFiring) {
                this.isFiring = true;
                this.sfxRocket.play();
            }
        }

        // If Fired, more to rocket up
        if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
            this.y -= this.moveSpeed;
        }

        // Reset rocket on miss
        if (this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        }
    }

    // Reset rocket to the ground
    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}