var small, smallImage, coinSound, coinImage, back, backImage
var spaceShip, spaceShipImage


var PLAY = 1
var END = 0
var gameState = PLAY
var explosionIMG

var createBullet1
var bulletSound, explosionSound, coinSound
var score = 0
var spawnsmall1
var  coingroup1
var gameOver1
var gameOver
var gameoverSounds
var replay1
var restart












function preload(){

    smallImage = loadImage("small.png")
    coinImage = loadImage("coin.png")
    backImage = loadImage("back.png")
    
    spaceShipImage = loadImage("spaceShip.png")
    explosionIMG = loadImage("explosion.png")
    bulletSound = loadSound("fire.mp3")
    coinSound = loadSound("coin.mp3")
    explosionSound = loadSound("explosionSound.mp3")
    gameOver1 = loadImage("gameOver.png")
    gameoverSounds = loadSound("gameoverSound.mp3")
    replay1 = loadImage("replay.png")
    


}

function setup() {
    createCanvas(windowWidth,windowHeight)

    back = createSprite(width/2,height/2)
    back.scale = 4.2
    
    
    back.y = height/2
    
    back.addImage(backImage)
    ship = createSprite(width/2,height/2 + 200)
    ship.addImage("change",spaceShipImage)
    ship.addImage("change1",explosionIMG)
    ship.scale = 0.3
    
    createBullet1 = new Group()

    spawnsmall1 = new Group()
    coingroup1 = new Group()
    

    gameOver = createSprite(width/2, height/2)
    gameOver.addImage(gameOver1)

    restart = createSprite(width/2, height/2 + 100)
    restart.addImage(replay1)
    restart.scale = 0.5
}

function draw() {
    background("white")

    if(gameState === PLAY){
        back.velocityY = (4 + score /100)

        spawnsmall()
        coingroup()

        gameOver.visible = false
        restart.visible = false

        if(keyDown("space")){
            createBullet()
            bulletSound.play()
        }

        if(back.y > height/2 + 400 ){
            back.y = height/2
        }

        if(ship.collide(coingroup1)){
            coinSound.play()
            coingroup1.destroyEach()
            score += 1
        }
        ship.y = World.mouseY
        ship.x = World.mouseX
        
        if(ship.isTouching(spawnsmall1)){
            explosionSound.play()
            spawnsmall1.destroyEach()
            gameoverSounds.play()
            gameState = END
            
        }
        

        if(createBullet1.isTouching(spawnsmall1)){
            spawnsmall1.destroyEach()
        }
    }
    else if(gameState === END){
           
        back.velocityY = 0
        coingroup1.setVelocityYEach(0)
        
        ship.velocityY = 0
        ship.velocityX = 0
        ship.changeImage("change1",explosionIMG)
        gameOver.visible = true
        
        restart.visible = true
        if(mousePressedOver(restart)){
            reset()
        }
        
    }

    drawSprites()
    textSize(30)

    text("coins: " + score, 50,50)
    
}

function spawnsmall(){
    if(frameCount%60 == 0){

    
    small = createSprite(700,50)
    small.addImage(smallImage)
    small.scale = 0.5
    small.setCollider("circle", 0,0,50 )
    spawnsmall1.add(small)
    small.velocityY = (10 + score/100)
    small.x = Math.round(random(0,1000))
    }
    
}
    




function createBullet(){
    var bullet = createSprite(200,200,20,20)
    bullet.y = ship.y - 90
    bullet.x = ship.x 
    bullet.velocityY -= 10
    createBullet1.add(bullet)
}


function coingroup(){
    if(frameCount%60 == 0){

    
    coin = createSprite(50,200)
    coin.addImage(coinImage)
    coin.velocityY = 5
    coin.scale = 0.2
    
    coin.setCollider("circle", 0, 0, 50)
    coingroup1.add(coin)
    
    coin.x = Math.round(random(0,1000))
    }
}



function reset(){
    gameState = PLAY
    coingroup1.destroyEach()
    createBullet1.destroyEach()

    
    score = 0
    ship.changeImage("change", spaceShipImage)
    
}

//
//createBullet.destroyEach()
//spawnsmall.destroyEach()  
//ship.changeImage("change", spaceShip.png) 