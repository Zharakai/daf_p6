class Game {
    constructor() {
        this.boot();
    }

    boot() {
        window.Game = this;

        this.players = [
            new Player("Iop", corbalame, "./sprites/iop.png", 100, 0, ""), 
            new Player("Steamer", corbalame, "./sprites/steamer.png", 100, 0, "")
        ];

        this.playerTurn = 0;
        
        this.map = new Map({
            columnsNumber: 11,
            rowsNumber: 11,
            percentageDisabledCells: 10,
            weaponsCount: 4,
            el: document.querySelector("table#myTable"),
        });
        
        this.gameLoop();
    }

    getCurrentPlayer() {
        return this.players[this.playerTurn];
    }

    switchCurrentPlayerTurn() {
        this.playerTurn = +!this.playerTurn;
    }

    /*
    checkPlayersAside(cell) {
        return !!(
            map[cell.y - 1]?.[cell.x]?.player || 
            map[cell.y]?.[cell.x - 1]?.player ||
            map[cell.y + 1]?.[cell.x]?.player ||
            map[cell.y]?.[cell.x + 1]?.player)
    }
    */
    
    async gameLoop() {
        while (true) {
          //if (this.map.playersAside()) {
            //code combat
          //} else {
            /*
            if (this.checkPlayersAside(map[currentPlayer.position.y][currentPlayer.position.x])) {
                alert("Combat ! 1 VS 1");
            }
            */
            await this.map.printMove();
            //this.map.clearAvailableMoveCells();
            // newPos
            if (weaponFound.length > 0) {
                //this.getCurrentPlayer().Player.setWeapon(weaponFound[0]);
                Player.setWeapon(weaponFound[0]);
                weaponFound = [];
            }

            console.log(map[currentPlayer.position.y][currentPlayer.position.x]);
            console.log(currentPlayer);
            
            /*
            if (this.checkPlayersAside(map[currentPlayer.position.y][currentPlayer.position.x])) {
                alert("Combat ! 1 VS 1");
            }
            */
            //console.log(this.map.map);
            //console.log(this.getCurrentPlayer().weapon);
            //console.log(Player.setWeapon(this.getCurrentPlayer().weapon));
            //console.log(this.getWeaponAtPos(this.map[currentPlayer.position.y][currentPlayer.position.x]));
            //this.getWeaponAtPos(this.map[currentPlayer.position.y][currentPlayer.position.x]);
            // 
            // this.setWeaponAtPos(this.map[currentPlayer.position.y][currentPlayer.position.x], currentPlayerWeapon);
          //}
          // switchWeapon
          this.switchCurrentPlayerTurn();
        }
    }
}

const playGame = new Game();
