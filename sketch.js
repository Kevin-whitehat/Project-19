var cube;
var obstacle, obstaclesGroup;
var ground, groundImg, platform;
var gameState = "play";
var stars, starsGroup;
var gameOver, gameOverImg;


function preload() {
    gameOverImg = loadImage("game_over.jpg");
    groundImg = loadImage("ground.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    ground = createSprite(width / 2, height / 2, width * 3, height);
    //ground.addImage("ground", groundImg);
    ground.shapeColor = "BLACK"

    //ground.scale = 6;
    ground.velocityX = -4;

    platform = createSprite(width / 2, height / 2 + height / 4, width, 5);
    platform.shapeColor = "blue";

    cube = createSprite(width - width + 40, height / 2 + height / 4.4, 30, 30)
    cube.shapeColor = "LIGHTBLUE";

    obstaclesGroup = new Group();
    starsGroup = new Group();



}
function spawnStars() {
    if (frameCount % 10 == 0) {
        var starY = Math.round(random(10, height / 2.5));
        stars = createSprite(width + 10, starY, 5, 5)
        stars.shapeColor = "WHITE"
        stars.velocityX = -4;
        stars.lifetime = 800;
        starsGroup.add(stars);


    }
}

function spawnObstacles() {
    if (frameCount % 100 == 0) {
        var num = Math.round(random(40, 80));
        obstacle = createSprite(width + 10, platform.y - num / 2, 10, num);
        obstacle.velocityX = -4;
        obstacle.shapeColor = "red";
        obstaclesGroup.add(obstacle);
        obstaclesGroup.lifetime = 800;
    }
}

function draw() {
    if (gameState == "play") {
        cube.collide(platform);
        if (cube.isTouching(obstaclesGroup)) {
            gameState = "end";
        }

        if (keyDown("SPACE")) {
            cube.velocityY = -10;
        }
        cube.velocityY += 0.5;

        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }
        background("white");
        spawnStars();
        spawnObstacles();
        drawSprites();

    }
    else if (gameState == "end") {
        background("black");

        text("Press Space To Restart", width / 2 - 10, height / 2);
        textSize(30)
        if (keyDown("SPACE")) {
            reset();
        }
    }

}

function reset() {
    obstaclesGroup.destroyEach();
    starsGroup.destroyEach();
    ground.visible = true;
    cube.visible = true;
    cube.y = height / 2 + height / 4.4;
    gameState = "play";
}
