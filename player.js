class Player{
    constructor(){
        this.index = null;
        this.name = null;
        this.lives = 10;
        this.distance = 0;
        this.startingX = 300;
    }

    setPlayerCount(count){
        database.ref("/").update({
            playerCount : count
        })
    }

    getPlayerCount(){
        database.ref("playerCount").on("value",function(data){
            playerC = data.val();
        })
    }

    updatePlayerDetails(){
        var path = "players/player"+ this.index;
        if(this.index===2){
            this.startingX = 1000;
        }
        database.ref(path).set({
            Name : this.name,
            Lives : this.lives,
            Distance : this.distance,
            startingX : this.startingX
        })
    }

    getAllPlayerDetails(){
        database.ref("players").on("value",function(data){
            allPlayers = data.val();

        })
    }

}