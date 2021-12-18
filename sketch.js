var trex ,trex_running, trex_collided;
var ground, ground_image;
var cloud, cloud_image ;
var obstacle, obstacle_image;
var obstacle_image1;
var obstacle_image2;
var obstacle_image3;
var obstacle_image4;
var obstacle_image5;
var obstaclegroup;
var cloudgroup;
var number;
var score = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameover_img;
var restart_img;
var gameover;
var restart;
var die;
var jump;
var checkpoint;
//preload function is to load images and sounds.It runs exactly once when the js loaded.
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png") ;
  ground_image = loadImage("ground2.png");
  cloud_image = loadImage("cloud.png")
  obstacle_image = loadImage("obstacle1.png")
  obstacle_image1 = loadImage("obstacle2.png")
  obstacle_image2 = loadImage("obstacle3.png")
  obstacle_image3 = loadImage("obstacle4.png")
  obstacle_image4 = loadImage("obstacle5.png")
  obstacle_image5 = loadImage("obstacle6.png")
  gameover_img = loadImage("gameOver.png")
  restart_img = loadImage("restart.png")
  trex_collided = loadImage("trex_collided.png")
  cloud_image = loadImage("cloud.png")
  die = loadSound("die.mp3")
  checkpoint = loadSound("checkpoint.mp3")
  jump = loadSound("jump.mp3")


}
  /*This is an entry point to the game and loads as soon as the js starts.
  It helps to make the background, coloring, and resizing.This also is called only once.*/
function setup(){
  createCanvas(windowWidth,windowHeight)
  obstaclegroup = new Group();
  cloudgroup = new Group();  
  

  trex = createSprite ( 100, height-80, 75, 75 );
  trex.scale = .6
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided)
  ground = createSprite(width/2, height-10, width, 5);
  ground.addImage ("ground", ground_image);
  gameover = createSprite (width/2, height/2-50, 25, 25);
  gameover.scale = .7
  gameover.addImage ("gameover", gameover_img);
  restart = createSprite (width/2, height/2, 25, 25);
  restart.scale = .6
  restart.addImage ("restart", restart_img);
  trex.setCollider("rectangle",0,0,40,60);
  //trex.debug = true;
}
/*This is a contionus function which only stops when the game stops.
It helps to write body of the game like animations and conditions and call other functions.*/

function draw(){
  background("orange")
  text("score:   "+score, 25, 25)
  if(gamestate == PLAY){
     ground.velocityX = -(6+score/100);
     restart.visible = false;
     gameover.visible = false;
     if(ground.x<0){
        ground.x = ground.width/2
       }
  score  = score+Math.round(getFrameRate()/60);
  //console.log(getFrameRate())
  if(score>0 && score%200 == 0){
    checkpoint.play();
  }
  if(touches.length>0&&(trex.y >= height-60)||keyDown ("space")&&(trex.y >= height-60)){
      trex.velocityY = -12;
      jump.play();
      touches = [];

    }
    if(obstaclegroup.isTouching(trex)){
      die.play();
      gamestate = END;
    }
    trex.velocityY = trex.velocityY+.8;
    drawClouds();
    drawObstacle();
    trex.collide(ground);
  }  
  
  else if(gamestate == END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstaclegroup.setVelocityXEach(0)
    cloudgroup.setVelocityXEach(0)
    restart.visible = true;
  gameover.visible = true;
  trex.changeAnimation("collided", trex_collided)
  cloudgroup.setLifetimeEach(-1);
  obstaclegroup.setLifetimeEach(-1);
  if(touches.length>0||mousePressedOver(restart)){
    gamestate = PLAY;
    touches = [];
    score = 0;
    ground.velocityX = 0;
    cloudgroup.setLifetimeEach(0);
    obstaclegroup.setLifetimeEach(0);
    obstaclegroup.destroyEach();
    cloudgroup.destroyEach();
    trex.changeAnimation("running", trex_running)
  }
  

  }
  drawSprites();
}
function drawClouds(){

  if(frameCount%60 == 0){
    cloud = createSprite(width+20, height-300, 25, 25);
    cloud.scale = -.7
    cloud.velocityX = -(6+score/100); 
    cloud.addImage ("cloud", cloud_image);
    cloud.y = Math.floor(Math.random() * 100 + 1);
    //console.log(cloud.depth);
    cloud.depth = trex.depth;
    cloud.lifetime = 300;
    trex.depth = trex.depth + 1;
    cloudgroup.add(cloud);
  }
    //console.log(trex.depth);
  
}

function drawObstacle(){
  if(frameCount%80 == 0){
    var obstacle = createSprite(800, height-30, 30, 30);
    obstacle.velocityX = ground.velocityX
    var randomnumber = Math.round(random(1,6));
    switch(randomnumber){
      case 1:obstacle.addImage ("obstacle", obstacle_image);
      break;
      case 2:obstacle.addImage ("obstacle", obstacle_image1);
      break;
      case 3:obstacle.addImage ("obstacle", obstacle_image2);
      break;
      case 4:obstacle.addImage ("obstacle", obstacle_image3);
      break;
      case 5:obstacle.addImage ("obstacle", obstacle_image4);
      break;
      case 6:obstacle.addImage ("obstacle", obstacle_image5);
      default:break;
 }
 obstacle.scale = .5;
 obstacle.lifetime = 300;
 obstaclegroup.add(obstacle);
  }

}