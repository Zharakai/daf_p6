class Game {
    constructor() {
        this.map = map;

        this.getAvailableCellsAroundPlayer(playerPosition[0]);
        this.playerTurn();
        this.printMove();
        //this.player();
        
        //this.gameLoop();
        this.players = ["1", "2"];
        this.playerTurn = 0;
        this.getCurrentPlayer();
        console.log(this.getCurrentPlayer());
        this.switchCurrentPlayerTurn();
        console.log(this.switchCurrentPlayerTurn);
    }
    //switchPlayerTurn player turn 0 / 1 
    //let playerTurn = 0;
    // this.player = [p0, p1]

    getCurrentPlayer() {
        //console.log(this.players);
        return this.players[this.playerTurn];
    }

    switchCurrentPlayerTurn() {
        this.playerTurn = +!this.playerTurns;
        console.log(this.playerTurn);
    }

    getAvailableCellsAroundPlayer(playerPosition) {
        console.log(playerPosition);
        for (let i = 1; i < 4; i++) {
            if (playerPosition.x + i <= 10 && (this.map[playerPosition.y][playerPosition.x + i].wall || this.map[playerPosition.y][playerPosition.x + i].player)) {
                break;
            } else if (playerPosition.x + i <= 10 && !!this.map[playerPosition.y][playerPosition.x + i].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition.y][playerPosition.x + i]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (playerPosition.y + i <= 10 && (this.map[playerPosition.y + i][playerPosition.x].wall || this.map[playerPosition.y + i][playerPosition.x].player)) {
                break;
            } else if (playerPosition.y + i <= 10 && !!this.map[playerPosition.y + i][playerPosition.x].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition.y + i][playerPosition.x]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (playerPosition.x - i >= 0 && (this.map[playerPosition.y][playerPosition.x - i].wall || this.map[playerPosition.y][playerPosition.x - i].player)) {
                break;
            } else if (playerPosition.x - i >= 0 && !!this.map[playerPosition.y][playerPosition.x - i].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition.y][playerPosition.x - i]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (playerPosition.y - i >= 0 && (this.map[playerPosition.y - i][playerPosition.x].wall || this.map[playerPosition.y - i][playerPosition.x].player)) {
                break;
            } else if (playerPosition.y - i >= 0 && !!this.map[playerPosition.y - i][playerPosition.x].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition.y - i][playerPosition.x]);
            }
        }
    }
    
    playerTurn() {
        /*
        availableCellsAroundPlayerOne.forEach(availableCell => {
            tdAvailableAroundPlayerOne.push(`${availableCell.y}-${availableCell.x}`);
        });

        tdAvailableAroundPlayerOne.forEach(td => {
            $(`td[data-yx="${td}"]`).addClass('move');
        });

        console.log(players);
        console.log(availableCellsAroundPlayerOne);
        console.log(tdAvailableAroundPlayerOne);
        $('.move').on('click', function() {
            console.log($(this));
        });
        */
    }

    setPlayerPosition(player) {
        this.player = player;
    }

    printMove() {
        availableCellsAroundPlayerOne.forEach(availableCell => {
            tdAvailableAroundPlayerOne.push(`${availableCell.y}-${availableCell.x}`);
        });

        tdAvailableAroundPlayerOne.forEach(td => {
            $(`td[data-yx="${td}"]`).addClass('move');
        });

        //console.log(availableCellsAroundPlayerOne);
        //console.log(tdAvailableAroundPlayerOne);

        $('.move').on('click', function() {
            let newCoordinates = [];
            newCoordinates = $(this).attr('data-yx').split('-');

            if ($(this).hasClass("weapon")) {
                console.log("Weapon found !");
            }

            $(`td[data-yx = "${playerPosition[0].player.position.y}-${playerPosition[0].player.position.x}"]`).removeClass('player').empty();
            $('.move').removeClass('move');

            playerPosition[0].player.position.x = parseInt(newCoordinates[1]);
            playerPosition[0].player.position.y = parseInt(newCoordinates[0]);

            this.classList.add("player");
            $(this).append(`<img class="player player${playerPosition[0].player.name}" src="${playerPosition[0].player.picture}" alt="Joueur ${playerPosition[0].player.name}">`);
        });

        //console.log($(this));
        //let y = $(this).attr('data-yx');
        //let x = $(this).attr('data-yx');

        //console.log(playerPosition[0].player.position);
        //console.log(playerPosition[0].player);
        //console.log(newCoordinates);
    }

    /*
    gameloop() {
        while (!gameOver) {
          if (this.map.playersAside()) {
            //code combat
          } else {
            await this.map.displayAvailableMoveCells(); //affiche les cases sur lesquelles on peut se déplacer et mets en place l'eventlistener
            this.map.clearAvailableMoveCells();
          }
          this.switchPlayerTurn();
        }
    }
    */
}

// game.js
window.Game = this;
console.log(this);

const playGame = new Game();