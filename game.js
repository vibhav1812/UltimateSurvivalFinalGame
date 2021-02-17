class Game{
    constructor(){
    }

    readGameState(){
        database.ref("gameState").on("value",function(data){
            gameS = data.val();
        })
    }

    writeGameState(state){
        database.ref("/").update({
            gameState : state 
        })
    }

    async start(){
        if(gameS === 0){
            player = new Player();
            player.getPlayerCount();
          
            var tempPC = await database.ref("playerCount").once("value");
            if(tempPC.exists()){
                playerC = tempPC.val();
                player.getPlayerCount();
            }

            form = new Form();
            form.display();
        }
        bg = createSprite(width/2,height/2,width,height);
        bg.addImage(bgImg);

        bg.scale = 1.5
        bg.y = bg.height/2;
        astro1 = createSprite(300,700,10,10);
        astro1.addImage(astroImg);
        astro1.scale = 0.1
        astro2 = createSprite(1000,700,10,10);
        astro2.addImage(astroImg);
        astro2.scale = 0.1
        astro = [astro1,astro2]
    }

    play(){
        form.hide();
        player.getAllPlayerDetails();
        var startingX;
        if(allPlayers){
            bg.velocityY = -2;

                if(bg.y<0){
                 bg.y = bg.height/2;
                }   

                var y=550;
                var x; 
                var i = 0
                for(var plr in allPlayers){
                    x = allPlayers[plr].startingX-allPlayers[plr].Distance;
                    console.log(allPlayers+"for");
                    //console.log(x);
                    astro[i].x = x 
                    astro[i].y = y
                   // console.log(astro[i])
                   
                    i=i+1
                }
                drawSprites();

                fill("red");
                stroke("black");
                strokeWeight(3);
                if(allPlayers.player1.Lives>0){
                    rect(100,40,allPlayers.player1.Lives*10,20);
                }
                else{
                    this.writeGameState(2);
                    textSize(50);
                    text(allPlayers.player2.Name+" Won",650,500);
                    this.destroy()
                }

                if(allPlayers.player2.Lives>0){
                    rect(100,100,allPlayers.player2.Lives*10,20);
                }
                else{
                    this.writeGameState(2);
                    textSize(50);
                    text(allPlayers.player1.Name+" Won", 650,400);
                    this.destroy();
                }

                fill("white");
                textSize(15)
                text(allPlayers.player1.Name+" health",100,35);
                text(allPlayers.player2.Name+" health",100,95);

            if(keyDown("LEFT_ARROW") && player.index!=null){
                player.distance = player.distance+10;
                player.updatePlayerDetails();
            }

            if(keyDown("RIGHT_ARROW")  && player.index!=null){
                player.distance = player.distance-10;
                player.updatePlayerDetails();
            }

            if(frameCount%100 === 0){
                var obstacle1 = createSprite(round(random(200,1250)),-190,50,50);
                obstacle1.velocityY = 7;
                obstacle1.addImage(bigObstacleImg)
                obstacle1.scale = 0.3;
                obstacle1.lifetime = 200;
                obstacle1.setCollider("circle",0,0,400);
                bigGroup.add(obstacle1);
              }
          
          
         
              if(frameCount%25 === 0){
                var obstacle2 = createSprite(round(random(200,1250)),-150,50,50);
                obstacle2.velocityY = 15;
                obstacle2.addImage(smallObstacleImg)
                obstacle2.scale = 0.1;
                obstacle2.lifetime = 200;
                obstacle2.setCollider("circle",0,100,300);
                smallGroup.add(obstacle2);
                
                }
              }
            
          
        
              if(frameCount%150 === 0){
                var obstacle3 = createSprite(round(random(200,1250)),-150,50,50);
                obstacle3.velocityY = 12;
                obstacle3.addImage(fireImg)
                obstacle3.scale = 0.2;
                obstacle3.lifetime = 200;
                obstacle3.setCollider("rectangle",0,0,550,1000)
                fireGroup.add(obstacle3);
              }
            
              

          if (player.index !== null) {
              for(var i=0; i<smallGroup.length; i++ ){
                 if(smallGroup.get(i).isTouching(astro)){
                  smallGroup.get(i).destroy();
                  player.lives = player.lives-1
                  player.updatePlayerDetails();
                 }
              }
              for(var j=0; j<bigGroup.length; j++ ){
                if(bigGroup.get(j).isTouching(astro)){
                 bigGroup.get(j).destroy();
                 player.lives = player.lives-2
                 player.updatePlayerDetails();
                }
             }
             for(var k=0; k<fireGroup.length; k++ ){
                if(fireGroup.get(k).isTouching(astro)){
                 fireGroup.get(k).destroy();
                 player.lives = player.lives-3
                 player.updatePlayerDetails();
                }
             }
          }
           

              
        }


        destroy(){
            fireGroup.destroyEach();
            smallGroup.destroyEach();
            bigGroup.destroyEach();
        }
    }

