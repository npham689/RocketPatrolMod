class SpaceshipSpecial extends Spaceship {
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame, pointValue);
    }

    update(){
        super.update();
        // Move new Spaceship to the left
        this.x -= this.moveSpeed;
    }
}