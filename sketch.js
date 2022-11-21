var monkey, monkey_running, ground, backdrop, backdrop2, backdroup_Image, bananaImage, stoneImage, score, energy, banana, stone, gameState, monkey_collided;

var bananaGroup;
var stoneGroup;

var backdrop0;

function preload(){
    monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  backdrop_Image = loadAnimation("jungle.jpg");
  
  monkey_collided = loadAnimation("Monkey_01.png")
  
  bananaImage = loadAnimation("banana.png");
  stoneImage = loadAnimation("stone.png");
     
}

function setup() {
  createCanvas(displayWidth, displayHeight - displayHeight/6);
  
  gameState = "play";
  
  bananaGroup = new Group();
  stoneGroup = new Group();

  backdrop0 = createSprite(0,displayHeight/2,20,20);
  backdrop0.addAnimation("bg", backdrop_Image);
  backdrop0.scale = 2.5;
  
  backdrop = createSprite(0,displayHeight/2,20,20);
  backdrop.addAnimation("bg", backdrop_Image);
  backdrop.scale = 2.5;
  
  backdrop2 = createSprite(0,displayHeight/2,20,20);
  backdrop2.addAnimation("bg", backdrop_Image);
  backdrop2.scale = 2.5;
  
  monkey = createSprite(displayWidth/20,displayHeight*0.8,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.13;
  
  ground = createSprite(200,displayHeight*0.8,displayWidth,5);
  ground.visible = false;
  
  score = 0;
  energy = 1000;
 
}

function draw() {
  
  background(0);
  
  if(gameState === "play"){

    camera.x = camera.x + 10;
    monkey.x = camera.x - displayWidth/2.1;
    ground.x = monkey.x;
    backdrop.x = camera.x;
    camera.y = monkey.y - displayHeight/3;

  monkey.scale = monkey.scale - 0.00005;
  
  monkey.collide(ground);
  
  backdropf();
  groundf();
  
  spawnFood();
  spawnStone();
  
  scoref();
  energyf();
  collision();
  
  jump();
    
    if(energy <= 0|| monkey.scale <=0){
      gameState = "end";
      
    }
    
    drawSprites();
  
  fill(255);
  textSize(20);
  text("Survival Time: " + score, camera.x + displayWidth/3,camera.y - displayHeight*0.3);
  text("Energy: " + energy, camera.x + displayWidth/3, camera.y - displayHeight * 0.25);
      
    
  }
  
  if(gameState === "end"){
  
  end(); 
  
  
  drawSprites();
  
    fill(255);
    textSize(20);
    text("Press R to Restart", camera.x, displayHeight/2);
    
    if(keyDown("r")){
      gameState = "play";
      score = 0;
      energy = 1000;
      monkey.visible = true;
    }

  }
}

function backdropf(){
  backdrop.velocityX = -5
  backdrop2.x = backdrop.x + displayWidth/2;
  backdrop0.x = backdrop.x - displayWidth*1.5;
  
  if(backdrop.x < 0){
    backdrop.x = backdrop.width / 2 + displayWidth;
  }
  
}

function groundf(){
  //ground.velocityX = 0;
  ground.x = ground.width/2;
}

function spawnFood(){

  if(frameCount % 160 === 0){
    
    banana = createSprite(camera.x + displayWidth/2,200,20,20);
    banana.y = Math.round(random(displayHeight/7.68, displayHeight/3.34));
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.05;
    
    console.log(banana.y);
    
    //banana.velocityX = -(10 + score/100);
    
    banana.lifetime = banana.x/banana.velocityX;
    
    bananaGroup.add(banana);
  }
  
}

function spawnStone(){
  
  if(frameCount % 170 === 0){
    
    stone = createSprite(camera.x + displayWidth/2,displayHeight*0.78,20,20);
    stone.addAnimation("stone", stoneImage);
    //stone.velocityX = -7
    stone.scale = 0.1;  
    
    stone.lifetime = stone.x/stone.velocityX;
    
    stoneGroup.add(stone);
    
  }
  
}

function jump(){
  
  if(keyDown("space") && monkey.y >= displayHeight*0.4){
      monkey.velocityY = -25;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8;
  
  
}

function scoref(){
  
  if(frameCount % 10 === 0){
  score = score + 1;
  }
}

function energyf(){
  
  if(frameCount % 25 === 0){
    energy = energy - 1;
  }
  
  if(bananaGroup.collide(monkey)){
    bananaGroup.destroyEach();
    energy = energy + 30;
    monkey.scale = monkey.scale + 0.01;
  }
}

function collision(){
                     
  if(stoneGroup.collide(monkey)){
     
    //stone.velocityX = -7;
    stoneGroup.destroyEach();
    energy = energy - 300;
    
  }
}

function end(){
  
  if(energy <= 0 | monkey.scale <=0.0002){
    monkey.velocityY = 0;
    ground.velocityX = 0;
    
    stoneGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    stoneGroup.destroyEach();
    bananaGroup.destroyEach();
    score = 0
    energy = 0;
    
    stoneGroup.setVelocityXEach = 0;
    bananaGroup.setVelocityXEach = 0;
    
    backdrop.velocityX = 0;
    
    monkey.visible = false;
  }
  
}
  
  