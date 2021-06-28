var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud;
var obstacle;
var score = 0;
var gameOver; 
var restart;
 

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
cloud_image = loadImage ("cloud.png");
  groundImage = loadImage("ground2.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage ("obstacle4.png")
  obstacle5 = loadImage ("obstacle5.png")
  obstacle6 = loadImage ("obstacle6.png")
  gameOverImage = loadImage ("gameOver.png")
  restartImage = loadImage("restart.png")
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound ("checkPoint.mp3")
}

function setup() {
createCanvas(1500, 600);
invisableGround = createSprite(200,558,400,10)
invisableGround.visible = false;
//create a trex sprite
trex = createSprite(50,160,20,50);
trex.addAnimation("running", trex_running);
trex.addAnimation("collided",trex_collided)
trex.scale = 0.5;
gameOver = createSprite(750,300)
gameOver.addImage(gameOverImage)
  gameOver.scale = 0.5
restart = createSprite(750,340)
restart.addImage(restartImage)
restart.scale = 0.5
//create a ground sprite
ground = createSprite(200,550,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width /2;
ground.velocityX = -4;
obstaclesGroup = new Group()
cloudsGroup = new Group()
trex.setCollider("circle",0,0,40)
}

function draw() {
background(180);
text("score-"+ score,1200,50)
if(gameState === PLAY){
gameOver.visible = false;
restart.visible = false;
score = score + Math.round (getFrameRate()/60)
  console.log(trex.y)
//jump when the space button is pressed
if (keyDown("space")&& trex.y >= 533) {
  trex.velocityY = -10;
  jumpSound.play()
}
  ground.velocityX = -(4+3*score/100)
spawnCloud()
spawnObstacle()
trex.velocityY = trex.velocityY + 0.8
if(score>0 && score%100 === 0 ){
  checkPointSound.play()
}
if (ground.x < 0) {
  ground.x = ground.width / 2;
}
if(obstaclesGroup.isTouching(trex)){
  
  gameState = END;
  dieSound.play()
}
}
  else if(gameState === END){
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    trex.velocityY = 0;
    trex.changeAnimation("collided",trex_collided)
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }
  
trex.collide(invisableGround);
  if(mousePressedOver(restart)){
    console.log("restart")
  reset()
  }
drawSprites();
}
function reset(){
  gameState = PLAY
  gameOver.visible = false
  restart.visible = false
  obstaclesGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("running",trex_running)
  score = 0
}
function spawnCloud()
{
 if(frameCount%100 === 0 ){
  cloud = createSprite(600,400,40,10)
  cloud.addImage("cloud",cloud_image)
   cloud.y = Math.round (random(200,400))
  cloud.scale = 0.5
  cloud.velocityX = -3
   cloud.depth = trex.depth
   trex.depth = trex.depth + 1
   cloud.lifetime = 250
   cloudsGroup.add(cloud)
 }
 }
function spawnObstacle(){
  if(frameCount%100 === 0){
  obstacle = createSprite(600,530,10,40)
  obstacle.velocityX = -(6+score/100)
  var rand = Math.round(random(1,6))
  switch(rand){
    case 1: obstacle.addImage(obstacle1)
            break;
    case 2: obstacle.addImage(obstacle2)
            break;
    case 3: obstacle.addImage(obstacle3)
            break;
    case 4: obstacle.addImage(obstacle4)
            break;
    case 5: obstacle.addImage(obstacle5)
            break;
    case 6: obstacle.addImage(obstacle6)
            break;
    default:break;
  }
    obstacle.scale = 0.5
    obstacle.lifeTime = 300;
    obstaclesGroup.add(obstacle)
  } 
}