var form
var playerC, player, gameS = 0;
var gameObj
var database
var astroImg, bgImg, bg , smallObstacleImg, bigObstacleImg, fireImg
var astro,astro1, astro2;
var allPlayers
var smallGroup, bigGroup, fireGroup;


function preload(){
  astroImg = loadImage("images/1.png");
  bgImg = loadImage("images/5.jpg");
  bigObstacleImg = loadImage("images/4.png");
  smallObstacleImg = loadImage("images/2.png");
  fireImg = loadImage("images/3.png")
  
}

function setup() {
  createCanvas(displayWidth,displayHeight-120);
  database = firebase.database();

  gameObj = new Game();
  gameObj.start();
  gameObj.readGameState();

  smallGroup = createGroup();
  fireGroup = createGroup();
  bigGroup = createGroup();


}

function draw(){
  if(playerC === 2){
    gameObj.writeGameState(1)
  }

  if(gameS === 1){
    gameObj.play()
  
  }

  
  }

  