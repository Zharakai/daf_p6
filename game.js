class Game {
    constructor() {
        this.map = map;
        //this.player();
        this.getAvailableCellsAroundPlayer();
        this.playerTurn();
        this.printMove();
    }
    // player turn 0 / 1
    //let playerTurn = 0;
    // this.player = [p0, p1]

    getAvailableCellsAroundPlayer() {
        for (let i = 1; i < 4; i++) {
            if (playerPosition[0].x + i <= 10 && (this.map[playerPosition[0].y][playerPosition[0].x + i].wall || this.map[playerPosition[0].y][playerPosition[0].x + i].player)) {
                break;
            } else if (playerPosition[0].x + i <= 10 && !!this.map[playerPosition[0].y][playerPosition[0].x + i].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y][playerPosition[0].x + i]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (playerPosition[0].y + i <= 10 && (this.map[playerPosition[0].y + i][playerPosition[0].x].wall || this.map[playerPosition[0].y + i][playerPosition[0].x].player)) {
                break;
            } else if (playerPosition[0].y + i <= 10 && !!this.map[playerPosition[0].y + i][playerPosition[0].x].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y + i][playerPosition[0].x]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (playerPosition[0].x - i >= 0 && (this.map[playerPosition[0].y][playerPosition[0].x - i].wall || this.map[playerPosition[0].y][playerPosition[0].x - i].player)) {
                break;
            } else if (playerPosition[0].x - i >= 0 && !!this.map[playerPosition[0].y][playerPosition[0].x - i].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y][playerPosition[0].x - i]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (playerPosition[0].y - i >= 0 && (this.map[playerPosition[0].y - i][playerPosition[0].x].wall || this.map[playerPosition[0].y - i][playerPosition[0].x].player)) {
                break;
            } else if (playerPosition[0].y - i >= 0 && !!this.map[playerPosition[0].y - i][playerPosition[0].x].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y - i][playerPosition[0].x]);
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
            console.log($(this));

            let newCoordinates = [];
            newCoordinates = $(this).attr('data-yx').split('-');
            
            //let y = $(this).attr('data-yx');
            //let x = $(this).attr('data-yx');
            
            console.log(newCoordinates);
            console.log(playerPosition[0].player);
            console.log(playerPosition[0].player.position);
            
            $('.move').removeClass('move');
        });
    }
}

const playGame = new Game();