var tower, towerImage 
var door, doorImage, doorGroup
var climber, climberImage, climberGroup
var ghost, ghostImage
var invisibleBlock, invisibleBlockGroup
var gameState= "play"
var spooky

function preload(){
  towerImage= loadImage("tower.png")
  doorImage= loadImage("door.png")
  doorGroup= new Group();
  climberImage= loadImage("climber.png")
  climberGroup= new Group();
  ghostImage= loadImage("ghost-standing.png")
  spooky= loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600)
  
  tower=createSprite(300,300);
  tower.addImage("tower", towerImage);
  tower.velocityY= 1
  
  ghost=createSprite(200,200,50,50)
  ghost.addImage("ghost", ghostImage)
  ghost.scale=0.4
  
  invisibleBlockGroup= new Group();
  
  spooky.loop();
}

function draw(){
  background(0);
  
  if (gameState== "play"){
    
  if(tower.y>400){
    tower.y=300;
  }
  
  if(keyDown("space")){
      ghost.velocityY= -3
  }
  ghost.velocityY= ghost.velocityY+0.5
  
  
  if(keyDown("left")){
    ghost.x= ghost.x-3
  }
  
  if(keyDown("right")){
    ghost.x= ghost.x+3
  }
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0
  }
  
  spawnDoors();
      if(invisibleBlockGroup.isTouching(ghost)){
    ghost.destroy();  
    gameState= "end"
  }
  
  drawSprites();
  }
  
  if(gameState=="end"){
    textSize(30);
    fill("yellow");
    stroke("yellow")
    text("Game Over", 230, 250);
    
  }
}

function spawnDoors(){
  if(frameCount% 240===0){
    door= createSprite(200,-50)
    door.addImage("door", doorImage);

    climber= createSprite(200, 10);
    climber.addImage("climber", climberImage)

    invisibleBlock= createSprite(200, 15)
    invisibleBlock.width= climber.width
    invisibleBlock.height=2
    
    door.x= Math.round(random(120,400))
    door.velocityY= 1
    
    climber.x= door.x
    climber.velocityY=1
    
    
    invisibleBlock.x= door.x
    invisibleBlock.velocityY=1
    
    door.lifetime= 800
    climber.lifetime=800
    
    climberGroup.add(climber);
    doorGroup.add(door);
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth= door.depth
    ghost.depth= ghost.depth+1
    

  invisibleBlock.debug= true
  }
  
}

