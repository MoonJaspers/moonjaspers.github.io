const k = kaplay({
    debug: true,
    global: false,
    scale: 1,
});


const playerSpeed = 250;

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

// header.pos.x = (k.width() / 2)-207;

const player = k.add([
    k.sprite("player"),
    k.scale(0.5),
    k.pos(k.width() / 2 - 100, k.height() / 2 - 100)
]);



// PLAYER MOVEMENT
k.onKeyDown("left", () => {
    worldPosX -= playerSpeed * k.dt();
});
k.onKeyDown("right", () => {
    worldPosX += playerSpeed * k.dt();
});
k.onKeyDown("up", () => {
    worldPosY -= playerSpeed * k.dt();
});
k.onKeyDown("down", () => {
    worldPosY += playerSpeed * k.dt();
});



// Update every sprite position based on world/camera position
k.onUpdate(() => {
    
});