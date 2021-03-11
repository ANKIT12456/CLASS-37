class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef=await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount=playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }

  play(){
    form.hide();
    textSize(25);
    text("GAME START",200,100);

    Player.getPlayersInfo();

    if(allplayers !== undefined){
      var player_pos=130;
      for(var i in allplayers){
        if(i ==="player"+player.index){
          fill("red");
        }
        else{
          fill("green");
        }
        player_pos+=30;
        textSize(20);
        text(allplayers[i].name+ " : "+allplayers[i].distance,120,player_pos);
      }
    }
    if(keyIsDown(UP_ARROW) && player.index!==null){
      player.distance+=25;
      player.update(player.distance);
    }
  }
}
