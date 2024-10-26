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


// Draw header
k.onDraw(() => {
    k.drawSprite({
        sprite: "header",
        pos: k.vec2(
            ((k.width() / 2)-207) - worldPosX,
            4                     - worldPosY
        )
    });
});



// Instantiate PLAYER
const player = k.add([
    k.sprite("player"),
    k.scale(0.5),
    // k.pos(k.width() / 2 - 100, k.height() / 2 - 100)
    k.pos(k.width() / 2 - 100, 1000)
]);


var isIntro = true;
k.onUpdate(() => {
    // Intro animation of PLAYER
    if (isIntro) {
        if (player.pos.y > k.height() / 2 - 100) {
            player.move(0, -playerSpeed*2);
        } else {
            startIntro();
            isIntro = false;
            Movement();
        }
    }
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
        console.log("hi");
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
