const k = kaplay({
    debug: true,
    global: false,
    scale: 1,
});

// Associate array of AREAS VISITED
var areasVisited = [
    { name: 'school', value: false },
    { name: 'dotnet', value: false },
    { name: 'java', value: false },
    { name: 'python', value: false },
    { name: 'pettrakr', value: false },
    { name: 'zombiefortress', value: false },
    { name: 'terraingeneration', value: false },
    { name: 'resume', value: false },
    { name: '', value: false },
];




const playerSpeed = 350;

// var worldPosX = k.width() / 2 - 100;
// var worldPosY = k.height() / 2 - 100;

var worldPosX = 0;
var worldPosY = 0;


k.setBackground(255,255,255);

k.loadSprite("header", "images/header.png");
k.loadSprite("player", "images/player.png");
k.loadSprite("school", "images/school.jpg");
// languages
k.loadSprite("dotnet", "images/languages/dotnet.png");
k.loadSprite("java", "images/languages/java.png");
k.loadSprite("python", "images/languages/python.png");
// projects
k.loadSprite("pettrakr", "images/projects/pettrakr.png");
k.loadSprite("zombiefortress", "images/projects/zombiefortress.jpg");
k.loadSprite("terraingeneration", "images/projects/terraingeneration.jpg");
// resume
k.loadSprite("resume", "images/resume.png");

k.loadSprite("speechBubble", "images/speechbubble.png");

// Draw header
k.onDraw(() => {
    k.drawSprite({ // Header
        sprite: "header",
        pos: k.vec2(
            ((k.width() / 2)-207), //- worldPosX,
            4                     //- worldPosY
        )
    });
});

// EDUCATION
const school = k.add([
    k.sprite("school"),
    k.scale(0.8),
    k.pos(k.width() / 2 - 500, -600),
    k.anchor("center"),
    k.area( { scale:1.2 } ),
    "school"
]);

// SKILLS
// .Net
const dotnet = k.add([
    k.sprite("dotnet"),
    k.scale(0.5),
    k.pos(-100,100),
    k.anchor("center"),
    k.area( { scale:1.2 } ),
    "dotnet"
]);
// Java
const java = k.add([
    k.sprite("java"),
    k.scale(0.1),
    k.pos(-200,300),
    k.anchor("center"),
    k.area( { scale:1.2 } ),
    "java"
]);
// .Net
const python = k.add([
    k.sprite("python"),
    k.scale(0.2),
    k.pos(-50,500),
    k.anchor("center"),
    k.area( { scale:1.2 } ),
    "python"
]);

// PROJECTS
// PetTrakr
const pettrakr = k.add([
    k.sprite("pettrakr"),
    k.scale(0.7),
    k.pos(k.width() + 400,50),
    k.anchor("center"),
    k.area( { scale:1.2 } ),
    "pettrakr"
]);
// Zombie Fortress
const zombiefortress = k.add([
    k.sprite("zombiefortress"),
    k.scale(0.2),
    k.pos(k.width() + 200,350),
    k.anchor("center"),
    k.area( { scale:1.2 } ),
    "zombiefortress"
]);
// Terrain Generation Prototype
const terraingeneration = k.add([
    k.sprite("terraingeneration"),
    k.scale(0.5),
    k.pos(k.width() + 350,750),
    k.anchor("center"),
    k.area( { scale:1.2 } ),
    "terraingeneration"
]);

// RESUME
const resume = k.add([
    k.sprite("resume"),
    k.scale(0.5),
    k.pos(k.width()/2 + 100, k.height() + 250),
    k.anchor("center"),
    k.area( { scale:1.2 } ),
    "resume"
]);




// Instantiate PLAYER
const player = k.add([
    k.sprite("player"),
    k.scale(0.5),
    k.pos(k.width() / 2, 1000),
    k.anchor("center"),
    k.area({ shape: new k.Rect(k.vec2(0,150), 100, 100) })
]);

// Areas Visited Counter Text
const debugText = player.add([
    k.text("", {
        size: 68,
        font: "arial",
        width: k.width()
    }),
    k.color(0,0,0),
    k.pos(-k.width() + 25, -k.height() + 25)
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
        // Lock camera on player from now on
        k.camPos(player.worldPos());



        // Update areasVisitedText
        var counter = 0;
        for (let i = 0; i < areasVisited.length; i++) { 
            if (areasVisited[i].value == true) {
                counter++;
            }
        }
        debugText.text = "Areas Visited: " + counter + "/" + areasVisited.length;
        // debugText.pos = k.vec2(player.pos.x - 300, player.pos.y - 300);
    }

    // Update player's world position
    school.pos.x = k.width() / 2 - 500;
    school.pos.y = -600;


});


player.onCollide("school", () => {
    setSpeechBubble(
        "MOHAWK COLLEGE\n\n" +
        "Software Development (559)\n" +
        "Sept. 2020 - Current"
    );
    updateAreaVisited(areasVisited, "school", true);
});
player.onCollide("dotnet", () => {
    setSpeechBubble("Confidently experienced in .NET\n\n" + 
        "I am very familiar in this language as I have spent the most time working with it" +
        " and have created many projects in .NET");
    updateAreaVisited(areasVisited, "dotnet", true);
});
player.onCollide("java", () => {
    setSpeechBubble("Familiar with Java\n\n" + 
        "I have created a few projects in Java and have a good understanding of the language. " +
        "It's very similar to .NET, which I am most fluent in, so Java was easy to pick up."
    );
    updateAreaVisited(areasVisited, "java", true);
});
player.onCollide("python", () => {
    setSpeechBubble("Experienced in Python\n\n" +
        "Python is my first language and is what got me into programming. " +
        "I value its simplicity and readability, and have used it to create many prototypes " +
        "for my past projects."
    );
    updateAreaVisited(areasVisited, "python", true);
});
player.onCollide("pettrakr", () => {
    setSpeechBubble("PetTrakr\n\n" +
        "PetTrakr is an android application that I created to help pet owners keep track of their pets"
    );
    updateAreaVisited(areasVisited, "pettrakr", true);
});
player.onCollide("zombiefortress", () => {
    setSpeechBubble("Zombie Fortress\n\n" +
        "Zombie Fortress is a 2D top-down shooter game that I created in Unity. " +
        "Build a fortress and defend against waves of zombies!"
    );
    updateAreaVisited(areasVisited, "zombiefortress", true);
});
player.onCollide("terraingeneration", () => {
    setSpeechBubble("Terrain Generation Prototype\n\n" +
        "This is a prototype I created to test out procedural terrain generation using the Unity Engine. " +
        "It uses perlin noise to generate a 2D terrain."
    );
    updateAreaVisited(areasVisited, "terraingeneration", true);
});
player.onCollide("resume", () => {
    showResume();
    updateAreaVisited(areasVisited, "resume", true);
});
player.onCollideEnd(() => {
    disableSpeechBubble();
});


function showResume() {
    window.open("images/jeromegoyena2024Resume.pdf", "_blank");
}


// Update the value of an area in the areasVisited array
function updateAreaVisited(array, name, value) {
    const item = array.find(item => item.name === name);
    if (item) {
        item.value = value;
    } else {
        console.log("Area not found in areasVisited array");
    }
}


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
        player.move(-playerSpeed,0);
        k.destroy(introText);
    });
    k.onKeyDown("right", () => {
        player.move(playerSpeed,0);
        k.destroy(introText);
    });
    k.onKeyDown("up", () => {
        player.move(0,-playerSpeed);
        k.destroy(introText);
    });
    k.onKeyDown("down", () => {
        player.move(0,playerSpeed);
        k.destroy(introText);
    });
}

const speechBubble = k.add([
    k.sprite("speechBubble"),
    k.scale(0.5),
    k.anchor("center"),
    // k.pos(k.width()/2, (k.height()/2)-250),
]);
speechBubble.hidden = true;
const speechBubbleText = k.add([
    k.text("", {
        size: 20,
        font: "arial",
        width: 280
    }),
    k.color(0,0,0),
    k.pos(k.width()/2-140, 60)
]);

function setSpeechBubble(text) {
    speechBubble.hidden = false;
    speechBubbleText.text = text;
    speechBubble.pos = k.vec2(player.pos.x, player.pos.y - 160);
    speechBubbleText.pos = k.vec2(player.pos.x - 140, player.pos.y - 300);
}
function disableSpeechBubble() {
    speechBubbleText.text = "";
    speechBubble.hidden = true;
}

// setSpeechBubble("Hello World! The Lazy Brown Fox Jumped Over The Red Fence");