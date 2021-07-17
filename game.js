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

    getCurrentPlayerOpenent() {
        return this.players[+!this.playerTurn];
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
        // Return a promise to be able to use await on gameloop
        return new Promise((resolve, reject) => {
            const attackButton = $('.attackButton');
            const defendButton = $('.defendButton');

            currentPlayer.shield = 0;

            let shieldPointsPlayer;
            if (this.playerTurn === 0) {
                shieldPointsPlayer = $('.shieldPointsPlayerOne');
            } else if (this.playerTurn === 1) {
                shieldPointsPlayer = $('.shieldPointsPlayerTwo');
            }
            shieldPointsPlayer.html(`${currentPlayer.shield} %`);

            attackButton.off('click').on('click', () => {
                const shieldPoints = this.getCurrentPlayerOpenent().shield / 100;
                const damage = currentPlayer.weapon.damage - (currentPlayer.weapon.damage * shieldPoints);

                if (this.playerTurn === 0) {
                    this.players[1].health -= damage
                    $('.lifePointsPlayerTwo').html(`${this.players[1].health}`);
                } else if (this.playerTurn === 1) {
                    this.players[0].health -= damage
                    $('.lifePointsPlayerOne').html(`${this.players[0].health}`);
                }

                resolve(); // For gameloop => round is over
            })

            defendButton.off('click').on('click', () => {
                currentPlayer.shield = 50;
                shieldPointsPlayer.html(`${currentPlayer.shield} %`);

                resolve(); // For gameloop => round is over
            })
        });
    }

    isGameOver() {
        //currentPlayer = this.getCurrentPlayer();
        
        this.players.forEach((player) => {
            if (player.health <= 0) {
                //alert("Partie terminée !");
                console.log(currentPlayer);
                console.log("Partie terminée");
                $('.gameContainer').html(`
                    <div class="winnerPresentation">
                        <img class="player player${currentPlayer.name}" src="${currentPlayer.picture}" alt="Joueur ${currentPlayer.name}">
                        <span>Partie terminée, le ${currentPlayer.name} a gagné !</span>
                    <div>`);
                $('.gameContainer').css('height', '97vh');
                $('img.player').css('transform', 'initial').css('position', 'initial');
                $('.winnerPresentation').css('display', 'flex').css('flex-direction', 'column').css('align-items', 'center');
                return true;
            }
        });

        return false;
    }
    
    async gameLoop() {
        while (!this.isGameOver()) {
            //console.log(!this.isGameOver());
            currentPlayer = this.getCurrentPlayer();

            //console.log(this.playerTurn);
            if (this.playerTurn === 0) {
                $('.playerCardTwo').css('background-color', 'rgb(189, 220, 255)');
                $('.playerCardOne').css('background-color', 'rgba(240, 196, 196, 0.6)');
            } else if (this.playerTurn === 1) {
                $('.playerCardOne').css('background-color', 'rgb(189, 220, 255)');
                $('.playerCardTwo').css('background-color', 'rgba(240, 196, 196, 0.6)');
            }

            if (this.checkPlayersAside(map[currentPlayer.position.y][currentPlayer.position.x])) {
                this.createFightVisual();
                await this.askAction();
            } else {
                await this.map.printMove();

                if (weaponFound.length > 0) {
                    Player.setWeapon(weaponFound[0]);
                    weaponFound = [];

                    let damagePointsPlayer;
                    if (this.playerTurn === 0) {
                        damagePointsPlayer = $('.damagePointsPlayerOne');
                    } else if (this.playerTurn === 1) {
                        damagePointsPlayer = $('.damagePointsPlayerTwo');
                    }
                    damagePointsPlayer.html(`${currentPlayer.weapon.damage}`);
                }
            }
            
          this.switchCurrentPlayerTurn();
        }
    }
}

const playGame = new Game();
