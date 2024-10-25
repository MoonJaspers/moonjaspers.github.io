const k = kaplay({
    debug: true,
    global: false,
    scale: 1
    // background: 'white'
});

k.loadSprite("header", "images/header.png");

k.add([
    k.sprite("header")
])