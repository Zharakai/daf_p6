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

    
    checkPlayersAside(cell) {
        return !!(
            map[cell.y - 1]?.[cell.x]?.player || 
            map[cell.y]?.[cell.x - 1]?.player ||
            map[cell.y + 1]?.[cell.x]?.player ||
            map[cell.y]?.[cell.x + 1]?.player)
    }

    createFightVisual() {
        if ($('.versusContainer').children().length < 1) {
            $('.versusContainer').append('<img class="versus" src="./sprites/vs.png" alt="Logo versus">');
        }

        if ($('.buttonsPlay').children().length < 1) {
            $('.buttonsPlay').append("<button class='attackButton'>Attaquer</button><button class='defendButton'>Défendre</button>");
        }
    }

    askAction() {
        // need to return promise to be able to use await on gameloop
        return new Promise((resolve, reject) => {
            const attackButton = $('.attackButton');
            const defendButton = $('.defendButton');

            attackButton.off('click').on('click', () => {
                // code ...
                console.log("Attack");
                const damage = currentPlayer.weapon.damage;
                console.log(damage);
                console.log(this.playerTurn);
                if (this.playerTurn === 0) {
                    this.players[1].health -= damage
                    console.log(this.players[1]);
                } else if (this.playerTurn === 1) {
                    this.players[0].health -= damage
                    console.log(this.players[0]);
                }
                resolve(); // tells gameloop that this round is over;
            })

            defendButton.off('click').on('click', () => {
                // code ...
                console.log("Defend");
                currentPlayer.shield = 50;
                resolve(); // tells gameloop that this round is over;
            })
        });
    }
    
    async gameLoop() {
        while (true) {
            currentPlayer = this.getCurrentPlayer();

            if (this.checkPlayersAside(map[currentPlayer.position.y][currentPlayer.position.x])) {
                console.log(currentPlayer);
                this.createFightVisual();
                await this.askAction();
            } else {
                await this.map.printMove();
                //this.map.clearAvailableMoveCells();
                // newPos
                if (weaponFound.length > 0) {
                    //this.getCurrentPlayer().Player.setWeapon(weaponFound[0]);
                    Player.setWeapon(weaponFound[0]);
                    weaponFound = [];
                }
            }
            
          this.switchCurrentPlayerTurn();
        }

    }
}

const playGame = new Game();
