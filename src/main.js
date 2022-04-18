/* 
Name: Nelson Pham
Project: Rocket Patrol Modification
Date: April 16, 2022
Time taken: 15 Hours
I just received help from the class discord for asking questions and reading answers
on certain code commands in JavaScript and Phaser and clarify any modification ideas I had.

Points BreakDown:
(5) Add Background Music
(5) Rocket Control After firing
(10) Replace UI borders with new ArtWork: UI Borders are changed to yellow border
(10) Display time remaining on top
(10) New animated spaceships(sprite)
(20) New spaceship with requirements
(20) New Artwork for in-game assets: Spaceships and rockets are changed with new artwork
(20) Time/Scoring mechanism that adds time on certain spaceship hits: Time increases a bit on successful hits
(30) Simultaneous two player mode: 2 players can play, one controls each rocket
TOTAL: 130 Points
*/

//Game Configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

// Set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let starSpeed = 2;

// Reserve keyboard bindings
let keyW, keyR, keyLEFT, keyRIGHT,
    keyUP, keyA, keyD;