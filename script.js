const k = kaplay({
    debug: true,
    global: false,
    scale: 1,
});


const playerSpeed = 350;

// var worldPosX = k.width() / 2 - 100;
// var worldPosY = k.height() / 2 - 100;

var worldPosX = 0;
var worldPosY = 0;


k.setBackground(255,255,255);

k.loadSprite("header", "images/header.png");
k.loadSprite("player", "images/player.png");
k.loadSprite("school", "images/school.jpg");
k.loadSprite("speechBubble", "images/speechbubble.png");

// Draw header
k.onDraw(() => {
    k.drawSprite({ // Header
        sprite: "header",
        pos: k.vec2(
            ((k.width() / 2)-207) - worldPosX,
            4                     - worldPosY
        )
    });
    // k.drawSprite({ // School
    //     sprite: "school",
    //     scale: 0.8,
    //     pos: k.vec2(
    //         ((k.width() / 2)-500) - worldPosX,
    //         -600                  - worldPosY
    //     )
    // });
});


const school = k.add([
    k.sprite("school"),
    k.scale(0.8),
    k.pos(k.width() / 2 - 500, -600),
    k.anchor("center"),
    k.area( { scale:1.2 } ),
    "school"
]);

k.onUpdate(() => {
    school.pos.x = k.width() / 2 - 500 - worldPosX;
    school.pos.y = -600 - worldPosY;
});



// Instantiate PLAYER
const player = k.add([
    k.sprite("player"),
    k.scale(0.5),
    k.pos(k.width() / 2, 1000),
    k.anchor("center"),
    k.area({ shape: new k.Rect(k.vec2(0,150), 100, 100) })
]);


// Debug coordinates text
const debugText = k.add([
    k.text("X: " + worldPosX + " Y: " + worldPosY, {
        size: 24,
        font: "arial",
        width: k.width()
    }),
    k.color(0,0,0),
    k.pos(10,10)
]);


var isIntro = true;
k.onUpdate(() => {
    // INTRO MODE
    // (Intro animation of PLAYER)
    if (isIntro) {
        if (player.pos.y > k.height() / 2 ) {
            player.move(0, -playerSpeed*2);
        } else {
            startIntro();
            isIntro = false;
            Movement();
        }
    } else { // NOT INTRO Mode
        debugText.text = "X: " + worldPosX + " Y: " + worldPosY;
    }
});


player.onCollide("school", () => {
    setSpeechBubble(
        "MOHAWK COLLEGE\n\n" +
        "Software Development (559)\n" +
        "Sept. 2020 - Current"
    );
});
player.onCollideEnd(() => {
    disableSpeechBubble();
});



var introText = null;
// Intro text
function startIntro() {
    introText = k.add([
        k.text(
            "I am a software developer with a passion for creating web applications and games." +
            "I hope you enjoy my portfolio!\n\n" +
            "(Use the ARROW KEYS to move around)", {
            width: 500,
            size: 24,
            font: "arial"
        }),
        k.color(0,0,0),
        k.pos(745,600)
    ]);
}




// PLAYER MOVEMENT
function Movement() {
    k.onKeyDown("left", () => {
        worldPosX -= playerSpeed * k.dt();
        k.destroy(introText);
    });
    k.onKeyDown("right", () => {
        worldPosX += playerSpeed * k.dt();
        k.destroy(introText);
    });
    k.onKeyDown("up", () => {
        worldPosY -= playerSpeed * k.dt();
        k.destroy(introText);
    });
    k.onKeyDown("down", () => {
        worldPosY += playerSpeed * k.dt();
        k.destroy(introText);
    });
}

const speechBubble = k.add([
    k.sprite("speechBubble"),
    k.scale(0.5),
    k.anchor("center"),
    k.pos(k.width()/2, (k.height()/2)-250),
]);
speechBubble.hidden = true;
const speechBubbleText = k.add([
    k.text("", {
        size: 24,
        font: "arial",
        width: 300
    }),
    k.color(0,0,0),
    k.pos(k.width()/2-140, 60)
]);

function setSpeechBubble(text) {
    speechBubble.hidden = false;
    speechBubbleText.text = text;
}
function disableSpeechBubble() {
    speechBubbleText.text = "";
    speechBubble.hidden = true;
}

// setSpeechBubble("Hello World! The Lazy Brown Fox Jumped Over The Red Fence");