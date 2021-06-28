var backgroundImage;
var earth,earthImage;
var fighter,fighterImage;
var shoot,shootImag,shootGroup;
var meteorite,meteoriteIMG,meteoriteGroup;
var gameState;
var PLAY = 0;
var END = 1;
var LOAD = 2;
var play,playAnimation;
var load,loadingAnimation;
var save,saveAnimation;

function preload(){
backgroundImage = loadImage("spacebg.jpg");
earthImage = loadImage("Earth.png");
fighterImage = loadImage("fighter.png");
shootImage = loadImage("shooter.png");
meteoriteIMG = loadImage("meteorite.png");
playAnimation = loadAnimation("play.gif");
loadingAnimation = loadImage("load.jpg");
saveAnimation = loadAnimation("logo.gif");
}



function setup() {
  createCanvas(1200,600);

  earth = createSprite(-100, 300);
  earth.addImage(earthImage);
  earth.scale = 1.5;

  load = createSprite(600,300);
  load.addImage(loadingAnimation);

  play = createSprite(600,400);
  play.addAnimation("1",playAnimation);

  save = createSprite(600,300);
  save.addAnimation("1",saveAnimation);
  save.scale = 1.5;


  fighter = createSprite(350,300);
  fighter.addImage(fighterImage);
  fighter.scale = 0.7;
  fighter.visible = false;




meteoriteGroup = new Group();
shootGroup = new Group();
gameState = LOAD;
}




function draw() {
  background(backgroundImage);
  
  if(gameState === LOAD){
    if(mousePressedOver(play)){
      gameState = PLAY;
      fighter.visible = true;
      save.visible = false;
      load.visible = false;
      play.visible = false;
    }
    
  }


  if(gameState === PLAY){

  var edges = createEdgeSprites();
   
  fighter.collide(edges);
  fighter.y = mouseY;

if(shootGroup.isTouching(meteoriteGroup)){
  meteoriteGroup[0].destroy();
  shootGroup[0].destroy();
}

if(meteoriteGroup.isTouching(fighter)){
  gameState = END;
}

if(meteoriteGroup.isTouching(earth)){
  gameState = END;
}

meteorites();

}

else if(gameState === END){
  meteoriteGroup.destroyEach();
  shootGroup.destroyEach();
earth.destroy();
fighter.destroy();
textStyle(ITALIC);
textSize(50);
stroke("white");
fill("white");
text("You Lost",600,300);




}














  drawSprites();
}

function meteorites(){
  if(frameCount%120===0){
    var rand = Math.round(random(50,550));

    meteorite = createSprite(1200,rand);
    meteorite.addImage(meteoriteIMG);
    meteorite.scale = 0.6;
    meteorite.velocityX = -4;

   




meteoriteGroup.add(meteorite);
  }
 


}

function mouseClicked(){
  if(gameState === PLAY){
  shoot = createSprite(fighter.x+50,fighter.y+30);
  shoot.addImage(shootImage);
  shoot.velocityX = 4;
  shoot.scale = 0.6;
  shoot.lifetime = 200;

shootGroup.add(shoot);
  }

}