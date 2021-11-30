/* ------- Raycaster - the Game --------
*title work in progress

this is a game about an unnamed hero that tries to find objects in a maze with his lamp.
The lamp as a certain range of light and a lifespan when the lamp goes dark the player loses

#todo:
   * implementing a level system and editor
   * implementing light lifespan
   * implementing a start/end/gameover screen
   * finishing token
   * improve hero skin

#bugs:
   * leftwall dosn't work
   * fix collision detection

#ideas:
   * you can change the color of your light and every color has a different maze
   * Items that you can find:
            * increase the lifespan of your light
            * increase the range of your light
            * maybe different characters
            * a device that lets you change the color of your light
            * bounce feature - an item that increases how many times you light can bounce
            * balls that you can throw that emit light
   * ENEMYs:
            * a enemy that eat your light
            * a enemy that flies to the light (like a moth) and when it hits the player he dies
   * a special negative level ever 10 or so levels (Black light - White darkness)
*/

//getting all the stuff from the DOM
let canvas = document.querySelector("canvas");
let c = canvas.getContext('2d');
let lightRange = document.getElementById("LightRange");
let ElementShowWalls = document.getElementById("showWalls");
let ElementShowHitbox = document.getElementById("showHitbox");
let moveSpeed = document.getElementById("moveSpeed");

// creating some booleans to toggle stuff
let showWalls = false;
let showHitbox = false;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;

// setting some basic variables
let speed = 2;

// all my event listeners:

//debug controls:

ElementShowWalls.addEventListener('change',function (evt) {
    showWalls = ElementShowWalls.checked;
});

ElementShowHitbox.addEventListener('change',function (evt) {
    showHitbox = ElementShowHitbox.checked;
});


lightRange.addEventListener('input',function (evt) {
   let range = lightRange.value;
    player1.updateLightRange(range)
});

moveSpeed.addEventListener('input',function (evt) {
    speed = moveSpeed.value;
});


//mouse position:

canvas.addEventListener('mousemove', function(evt) {
    let mouse = new Vector2D();
    mouse = getMousePos(evt);
});


//keyboard controls:

document.addEventListener('keydown',function (evt) {
    switch (evt.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            moveForward = true;
        break;
        case 'ArrowDown':
        case 's':
        case 'S':
            moveBackward = true;
        break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            moveRight = true;
        break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            moveLeft = true;
        break;

    }
});
document.addEventListener('keyup',function (evt) {
    switch (evt.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            moveForward = false;
        break;
        case 'ArrowDown':
        case 's':
        case 'S':
            moveBackward = false;
        break;
        case 'ArrowRight':
        case 'd':
        case 'D':
            moveRight = false;
        break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
            moveLeft = false;
         break;

        }
    });



let walls = [];

let width = 888;
let height = 500;

let colwhite = ('rgb(255,255,255');
let colblack = ('rgb(0,0,0)');
//let colblue = ('rgb(42,42,255');

let player1 = new Player(width/2,height/2,colwhite);
player1.rotated(1);

//walls[0] =  new Boundary(500,100,500,300);
//walls[1] = new Boundary(0,0,width,height);


for (let idx = 0; idx < 4 ; ++idx) {
    //walls[idx] = new Boundary(500, 100, 500, 300);

    walls[idx] = new Boundary(Math.floor(Math.random()*width),Math.floor(Math.random()*height),Math.floor(Math.random()*width),Math.floor(Math.random()*height));
}
//walls[0] = new Boundary(500, 100, 500, 300);

//Outside borders

let offset = 0.1;

walls.push(new Boundary(offset,offset,width-offset,offset));
walls.push(new Boundary(width-offset,offset,width-offset,height-offset));
walls.push(new Boundary(width-offset,height-offset,offset,height-offset));
walls.push(new Boundary(offset,offset,offset,height-offset));

function setup() {
    canvas.width = width;
    canvas.height = height;
}


function draw() {
    requestAnimationFrame(draw);
    fillrect(0,0,canvas.width,canvas.height,colblack);

    if (showWalls) {
        for (let idx = 0; idx < walls.length; ++idx) {
            walls[idx].show();
        }
    }

    player1.show(walls);
    player1.collide(walls);

    if (moveForward){player1.moveForward(speed);}
    if (moveBackward){player1.moveForward(-speed);}
    if (moveLeft){player1.rotated(-5);}
    if (moveRight){player1.rotated(5);}


    //particle.show(degree);

    //particle.look(walls);
    //gradientfillRect.show();
    //console.log("right: " + particle.collideRight + " | left: " + particle.collideLeft + " | up: " + particle.collideUp + " | down: " + particle.collideDown);
}



setup();
draw();
