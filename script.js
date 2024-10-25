const k = kaplay({
    debug: true,
    global: false,
    scale: 4
    // background: 'white'
});

k.loadSprite("header", "images/header.png");

k.add([
    k.sprite("header")
])