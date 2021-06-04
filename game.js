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

        console.log(window.Game);
        
        this.gameLoop();
    }

    getCurrentPlayer() {
        //console.log(this.players[this.playerTurn]);
        return this.players[this.playerTurn];
    }

    switchCurrentPlayerTurn() {
        this.playerTurn = +!this.playerTurn;
        //console.log(this.playerTurn);
    }

    /*
    getAvailableCellsAroundPlayer(player) { //map.js
        // TODO: move to map.js
        const availableCellsAroundPlayer = [];
        //console.log(player.position);
        console.log(player);
        for (let i = 1; i < 4; i++) {
            if (player.position.x + i <= 10 && (this.map.map[player.position.y][player.position.x + i].wall || this.map.map[player.position.y][player.position.x + i].player)) {
                break;
            } else if (player.position.x + i <= 10 && !!this.map.map[player.position.y][player.position.x + i].wall == false) {
                availableCellsAroundPlayer.push(this.map.map[player.position.y][player.position.x + i]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (player.position.y + i <= 10 && (this.map.map[player.position.y + i][player.position.x].wall || this.map.map[player.position.y + i][player.position.x].player)) {
                break;
            } else if (player.position.y + i <= 10 && !!this.map.map[player.position.y + i][player.position.x].wall == false) {
                availableCellsAroundPlayer.push(this.map.map[player.position.y + i][player.position.x]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (player.position.x - i >= 0 && (this.map.map[player.position.y][player.position.x - i].wall || this.map.map[player.position.y][player.position.x - i].player)) {
                break;
            } else if (player.position.x - i >= 0 && !!this.map.map[player.position.y][player.position.x - i].wall == false) {
                availableCellsAroundPlayer.push(this.map.map[player.position.y][player.position.x - i]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (player.position.y - i >= 0 && (this.map.map[player.position.y - i][player.position.x].wall || this.map.map[player.position.y - i][player.position.x].player)) {
                break;
            } else if (player.position.y - i >= 0 && !!this.map.map[player.position.y - i][player.position.x].wall == false) {
                availableCellsAroundPlayer.push(this.map.map[player.position.y - i][player.position.x]);
            }
        }

        return availableCellsAroundPlayer;
    }

    printMove() { //map.js
        // TODO: move to map.js
        const availableCellsAroundPlayer = this.getAvailableCellsAroundPlayer(this.getCurrentPlayer());
        const tdAvailableAroundPlayer = [];

        availableCellsAroundPlayer.forEach(availableCell => {
            tdAvailableAroundPlayer.push(`${availableCell.y}-${availableCell.x}`);
        });

        tdAvailableAroundPlayer.forEach(td => {
            $(`td[data-yx="${td}"]`).addClass('move');
        });

        //console.log(availableCellsAroundPlayer);
        //console.log(tdAvailableAroundPlayer);

        return new Promise((resolve) => {
            $('.move').on('click', (element) => {
                //console.log(element);
                let newCoordinates = [];
                newCoordinates = $(element.currentTarget).attr('data-yx').split('-');

                if ($(this).hasClass("weapon")) {
                    console.log("Weapon found !");
                }

                $(`td[data-yx = "${this.getCurrentPlayer().position.y}-${this.getCurrentPlayer().position.x}"]`).removeClass('player').empty();
                $('.move').off('click');
                $('.move').removeClass('move');

                this.getCurrentPlayer().position.x = parseInt(newCoordinates[1]);
                this.getCurrentPlayer().position.y = parseInt(newCoordinates[0]);

                element.currentTarget.classList.add("player");
                $(element.currentTarget).append(`<img class="player player${this.getCurrentPlayer().name}" src="${this.getCurrentPlayer().picture}" alt="Joueur ${this.getCurrentPlayer().name}">`);

                //this.switchCurrentPlayerTurn();
                console.log(players);

                resolve();
            });
        });
    }
    */
    
    async gameLoop() {
        while (true) {
          //if (this.map.playersAside()) {
            //code combat
          //} else {
            await this.map.printMove(); //this.map.displayAvailableMoveCells(); //affiche les cases sur lesquelles on peut se déplacer et mets en place l'eventlistener
            //this.map.clearAvailableMoveCells();
          //}
          // switchWeapon
          this.switchCurrentPlayerTurn();
        }
    }
}

const playGame = new Game();
