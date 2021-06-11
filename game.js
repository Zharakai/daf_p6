class Game {
    constructor() {
        this.boot();
    }
    boot(){
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
    
    async gameLoop() {
        while (true) {
          //if (this.map.playersAside()) {
            //code combat
          //} else {
            await this.map.printMove();
            //this.map.clearAvailableMoveCells();
            // newPos
            //
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
