var BG, BGI
var block1, block2, block3
var mario
var ground
var img1, img2
var gameState = 0
var clubGroup, obstacleGroup, blockGroup
var score = 0
var Lives = 3
var enemy1, enemy2

function preload(){
BGI = loadImage("Images/Background.jpg")
block1 = loadImage("Images/tetrisBlocks/tile005.png")
block2 = loadImage("Images/tetrisBlocks/tile002.png")
block3 = loadImage("Images/tetrisBlocks/tile000.png")
img1 = loadAnimation("Images/Mario/1.png")
img2 = loadAnimation("Images/Mario/4.png", "Images/Mario/3.png", "Images/Mario/2.png")
enemy1 = loadAnimation("Images/marioEnemies/tile000.png", "Images/marioEnemies/tile001.png")
enemy2 = loadAnimation("Images/marioEnemies/tile005.png", "Images/marioEnemies/tile006.png")
enemy3 = loadAnimation("Images/marioEnemies/tile003.png", "Images/marioEnemies/tile004.png")
}

function setup(){
createCanvas(700, 380)
BG = createSprite(350, 190)
BG.scale = 0.7
BG.addImage(BGI)

mario = createSprite( 25, 310, 20, 45)
mario.addAnimation("idle", img1)
mario.addAnimation("active", img2)
mario.scale = 1.5
ground = createSprite(350, 342, 700, 10)
ground.visible = false

clubGroup = new Group()
obstacleGroup = new Group()
blockGroup = new Group()
}

function draw(){
background(0)
drawSprites()
if(gameState === 0){
  textSize(20)
  fill("red")
text("Click Spacebar To Play!", 250, 190)
if(keyDown("space")){
  gameState = 1
}
}
else if(gameState === 1){
  if(clubGroup.isTouching(mario)){
    clubGroup.setVelocityYEach(0)
    mario.velocityY = 0
    //clubGroup.collide(mario)
  }
  BG.velocityX = -2.5
mario.changeAnimation("active", img2)
if(BG.x < 140){
  BG.x = 350
}
mario.collide(ground)
blocks()
if(keyDown("UP_ARROW")){
  mario.velocityY = -7.5
}
mario.velocityY = mario.velocityY + 0.25
if(mario.y < 40){
  mario.velocityY = 0.5
}
fill("black")
text("Score: " + score, 10, 12)
text("Lives: " + Lives, 650, 12)

score = score + Math.round(getFrameRate() / 60.8)
enemies()
if(obstacleGroup.isTouching(mario) && Lives > 0){
Lives--
}
else if(obstacleGroup.isTouching(mario) && Lives <= 0){
  gameState = 2
  }
}
else if(gameState === 2){
  textSize(20)
  fill("yellow")
  text("Game Over", 280, 190)
  fill("orange")
  text("Click Spacebar To play again", 220, 230)

  BG.velocityX = 0
  clubGroup.setVelocityXEach(0)
  obstacleGroup.setVelocityXEach(0)
  blockGroup.setVelocityXEach(0)
  clubGroup.setLifetimeEach(-1)
  obstacleGroup.setLifetimeEach(-1)
  blockGroup.setLifetimeEach(-1)

  mario.addAnimation("idle", img1)
  mario.velocityY = 0
  mario.y = 310
  if(keyDown("space")){
    gameState = 1
    Lives = 3
    score = 0
    clubGroup.destroyEach()
    obstacleGroup.destroyEach()
    blockGroup.destroyEach()
  }
}
}

function blocks(){
if(frameCount % 60 === 0 ){
  var block
  var blockCollider
  var r = Math.round(random(1, 3))
  switch(r){
    case 1: var y = Math.round(random(85, 250))
    block = createSprite(710, y ,25, 25)
    block.addImage(block1)
    blockCollider = createSprite(733, y + 2, 25, 2)
    break
    case 2: var y = Math.round(random(85, 250))
    block = createSprite(710, y ,50, 25)
    block.addImage(block2)
    blockCollider = createSprite(710, y - 5, 50, 2)
    break
    case 3: var y = Math.round(random(85, 250))
    block = createSprite(710, y ,75, 25)
    block.addImage(block3)
    blockCollider = createSprite(710, y - 5, 75, 2)
    break
    default:break
  }
  block.velocityX = -4
  block.lifetime = 185
  blockCollider.velocityX = -4
  blockCollider.lifetime = 185
  blockCollider.visible = false
  clubGroup.add(blockCollider)
  blockGroup.add(block)
}
}
function enemies(){
  if(frameCount % 135 === 0 ){
    var enemy
    var r = Math.round(random(1, 3))
    switch(r){
      case 1:
      enemy = createSprite(710, 322, 25, 25)
      enemy.addAnimation("enemy1", enemy1)
      enemy.scale = 2
      break
      case 2:
      enemy = createSprite(710, 320, 25, 25)
      enemy.addAnimation("enemy2", enemy2)
      enemy.scale = 1.7
      break
      case 3: var y = Math.round(random(85, 250))
      enemy = createSprite(710, y ,25, 25)
      enemy.addAnimation("enemy3", enemy3)
      enemy.scale = 1.7
      break
      default:break
    }
    enemy.velocityX = -4
    enemy.lifetime = 185
 
    obstacleGroup.add(enemy)
  }
  }