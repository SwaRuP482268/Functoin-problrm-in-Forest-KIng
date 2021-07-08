var jack,jack_img,bg;
var ani1G,ani2G,treeG;

var gameState="serve";
var gameover,gameover_img;
var restart,restart_img;

var lives=5;


function preload(){
  bg=loadImage("Forest.png");
  jack_img=loadImage("Man walking👱‍♂️.png")
  tree1=loadImage("tree4.png");
  tree2=loadImage("tree5.png");
  tree3=loadImage("tree6.png");
  tree4=loadImage("tree7.png");
  cow=loadImage("Cow.png");
  pig=loadImage("Pig.png");
  sheep=loadImage("Sheep.png");
  tiger=loadImage("Tiger.png");
  lion=loadImage("lion2.png");
  restart_img=loadImage("restart.png");
  gameover_img=loadImage("gameOver.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  jack=createSprite(10,height-20,50,50);
  jack.velocityX=4;
  jack.addImage(jack_img);
  jack.scale=0.3;

  invisibleGround = createSprite(width/2,height-10,width,20);
  invisibleGround.visible = false;

  ani1G=new Group();
  ani2G=new Group();
  treeG=new Group();
  
  restart=createSprite(width/2,height/2,40,40);
  restart.addImage(restart_img);
  gameover=createSprite(width/2,height/2 -80,40,40);
  gameover.addImage(gameover_img);

}

function draw() {
  background(bg);  

  
if(gameState==="serve"){
    textSize(25);
    fill("blue");
    text("Click UP ARROW To Start ",width/2 -150,height/2);
    
    jack.x=10;
    jack.velocityX=0;
    jack.velocityY=0;
    gameover.visible=false;
    restart.visible=false;
  
    }
    else if(gameState==="play"){

     
      gamePlay();
      
    
      }
 else{
   jack.visible=false;
   ani1G.visible=false;
   ani2G.visible=false;
   gameover.visible=true;
   restart.visible=true;
   
   ani1G.destroyEach();
   ani2G.destroyEach();
   treeG.destroyEach();
   
  
  

   textSize(20);
   fill("yellow");
   text("You killed by Forest's wild animals 💢💥",width/2 -160,height/2 +60);

   if(mousePressedOver(restart)){
     Reset();
   }
 } 

  drawSprites();
}

function mousePressed() {
  if(gameState==="serve"){  
    gameState="play"
  }
}

function Tree(){
  if(frameCount % 200 === 0 ){
    var tree=createSprite(width-10,height-100,10,50);
    tree.velocityX=-4;
    
    var rand = Math.round(random(1,4))

    switch(rand){

        case 1:tree.addImage(tree1);
        break;
        case 2:tree.addImage(tree2);
        break;
        case 3:tree.addImage(tree3);
        break;
        case 4:tree.addImage(tree4);
        break;
        default:break;
    }

    tree.scale=0.6

    tree.collide(invisibleGround)
    treeG.add(tree);
}}

function Animals1(){
  if(frameCount % 500===0){
      var animals1=createSprite(width-10,height-150,10,50);
      animals1.velocityX=-4;

      var rand = Math.round(random(1,3))

      switch(rand){

            case 1:animals1.addImage(cow);
            break;
            case 2:animals1.addImage(pig);
            break;
            case 3:animals1.addImage(sheep);
            break;
            default:break;

      }

      animals1.scale=0.2

      animals1.collide(invisibleGround)
      ani1G.add(animals1);
    
  }
}

function Animals2(){
  if(frameCount % 100===0){
    var animals2=createSprite(width-10,height-150,10,50);
    animals2.velocityX=-4;

    var rand = Math.round(random(1,2))

    switch(rand){

          case 1:animals2.addImage(tiger);
          break;
          case 2:animals2.addImage(lion);
          break;
          
          default:break;

    }

    animals2.scale=0.22

    animals2.collide(invisibleGround)
    ani2G.add(animals2);
}}


function Reset(){

  gameState="serve"

  jack.visible=true;
 // ani1G.destroyEach();
  //ani2G.destroyEach();
  jack.x=10 ;

}

function liveOver(){
  
  lives=lives-1;

  if(lives >=1){
  
    gameState="serve";

  }
  else{
    gameState="end";
  }


}

function gamePlay(){
  if(gameState==="play"){
  if(jack.x > width-10){
    jack.x=10 ;
  }

  if(keyDown("space")){
    jack.velocityY=-6;
  }

  if(keyDown("w")){
    jack.x += 10
  }
  jack.velocityY = jack.velocityY + 0.8

  Tree();
  Animals1();
  Animals2();
  
  textSize(20)
  text("frame :"+frameCount,width/2,height/3)

  textSize(25);
  fill("yellow");
  text("Lives 🤎 :"+lives,width/4,height/4)

  if(jack.isTouching(ani2G)){

     liveOver();
      
  }

  gameover.visible=false;
  restart.visible=false;
  
 
  jack.collide(invisibleGround);

  
  
  
}}
