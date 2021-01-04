var dinosaur;
var p1;
var road;
var p2;
var road_2;
var cloud;
var obstacle3;
var obstacle1;
var obstacle2;
var obstacle4;
var obstacle5;
var obstacle6;
var obstacle7;
var obstacle8;
var obstacle9;
var p2;
var gamestate="play";
var ob_group;
var cl_group;
var gameOver;
var restart;
var score=0;
var zero;
function preload() {
 p1=loadAnimation("trex1.png", "trex3.png","trex4.png");
 p2=loadAnimation("ground2.png");
 p3=loadAnimation("cloud.png");
 p4=loadAnimation("obstacle3.png");
 p05=loadAnimation("obstacle1.png");
 p6=loadAnimation("obstacle2.png");
 p7=loadAnimation("obstacle4.png");
 p8=loadAnimation("obstacle5.png");
 p9=loadAnimation("obstacle6.png");
 p10=loadAnimation("trex_collided.png");
 p11=loadAnimation("gameOver.png");
 p12=loadImage("restart.png");
 p13=loadSound("checkPoint.mp3") ;
  p14=loadSound("jump.mp3") ;
  p15=loadSound("die.mp3") ;
}
function setup() {
  createCanvas(400, 400);
  dinosaur = createSprite(100,200);
  dinosaur.addAnimation("a",p1);
  dinosaur.addAnimation("b",p10);
  dinosaur.scale=0.8;
  dinosaur.debug=false;
  dinosaur.setCollider("rectangle",0,0,40,70,20);
  // cloud=createSprite(400,10);
  // cloud.addAnimation("a",p3);
  // cloud.scale=0.6;
  // cloud.shapeColor="white";
  // cloud.velocityX=-4;
  road = createSprite(200,280,800,10);
  road.addAnimation("a",p2);
  //dinosaur.scale=0.8;
  road.velocityX=-6;
  road_2 = createSprite(200,294,800,10);
  //road_2.shapeColor=250;
  road_2.visible=false
  ob_group=new Group();
  cl_group=new Group();
    gameOver = createSprite(210,60);
   gameOver.addAnimation("c",p11);
     gameOver.scale=0.8;
    restart = createSprite(200,120);
   restart.addImage(p12);
    restart.scale=0.8;
   
}

function draw() {
  background(250);
  if(gamestate=="play"){
    restart.visible=false;
    gameOver.visible=false;
      if( dinosaur.y>251 && (keyDown("space"))){
    dinosaur.velocityY=-10;
        p14.play();
      }//end of dino move .
          if(road.x<=-4){// -1,0, 1,2, 200, 4000, 300,100
   road.x=200; 
          }//road repositioning.
        //adding gravity;
  dinosaur.velocityY=dinosaur.velocityY+0.4;
        dinosaur.collide(road_2);
     score_a();
   score=score+1;
   
     if(frameCount%55==0){
  cloud=createSprite(400,60);
  cloud.velocityX=-4;
  cloud.y=60;
  cloud.y=random(10,100);
  cloud.addAnimation("a",p3);
  cloud.scale=0.6;
  cloud.lifetime=120;
  cloud.depth=0.1;
  cl_group.add(cloud);
  }//end of cloud.
    // cl_group.add(cloud);
  if(frameCount%100==0){
  obstacle=createSprite(400,260);
  obstacle.velocityX=-4;
  //   obstacle.addAnimation("a",p4);
    obstacle.scale=0.6;
     obstacle.lifetime=120;
    var r=Math.round(random(1,6));
    switch(r){
        case 1:obstacle.addAnimation("a",p05); 
               //obstacle1=createSprite(400,260);
               break;
        case 2:obstacle.addAnimation("a",p6);
               //obstacle2=createSprite(400,260);
               break;
        case 3:obstacle.addAnimation("a",p4);
               //obstacle3=createSprite(400,260);
               break;
        case 4:obstacle.addAnimation("a",p7);
               //obstacle4=createSprite(400,260);
               break;
        case 5:obstacle.addAnimation("a",p8);
               //obstacle5=createSprite(400,260);
               break;
        case 6:obstacle.addAnimation("a",p9);
               //obstacle=createSprite(400,260);
               break;
        default:break;
    }//end of switch.
    //obstacle.depth=0.1;
    ob_group.add(obstacle);
   
  }//end of if obstacle .
   if(dinosaur.isTouching(ob_group)){
     p15.play();
    gamestate="over";
  }//end of obs touch.         
  }//end of play.
  if(gamestate=="over"){
    dinosaur.velocityY=0;
    road.velocityX=0;
    ob_group.setLifetimeEach(-1);
    ob_group.setVelocityXEach(0);
    cl_group.setLifetimeEach(-1);
    cl_group.setVelocityXEach(0);
    dinosaur.changeAnimation("b",p10);
        restart.visible=true;
    gameOver.visible=true;
     if(mousePressedOver(restart)==true){
     gamestate="play" 
     ob_group.destroyEach();
       cl_group.destroyEach();
       dinosaur.changeAnimation("a",p1);
       road.velocityX=-6;
       score=0;
    }
  }//end of gameover 
 text("score:"+score_a()+score,300,50);
  drawSprites();
}//end of function draw .
function score_a(){
  if(score>=0 && score<=9){
      return "0000";
    }
    if(score>=10 && score<=99){
      return "000";
    }
    if(score>=100 && score<=999){
      return "00";
    }
    if(score>=1000 && score<=9999){
      return "0";
    }
}
