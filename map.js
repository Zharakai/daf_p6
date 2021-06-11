let map;
let currentPlayer;
let availableCellsAroundPlayer = [];

/**
 * @class
 * @param
 */
class Map {
    constructor(settings) {
        this.registerSettings(settings);
        this.boot();
    }

    registerSettings(userSettings) {
        const defaultSettings = {
            columnsNumber: 10,
            rowsNumber: 10,
            percentageDisabledCells: 15,
            weaponsCount: 5,
            el: document.querySelector("table"),
        };
        Object.assign(this, { ...defaultSettings, ...userSettings });
    }

    boot() {
        this.generateMap();
        this.generateWalls();
        this.generateWeapons();
        this.placePlayer(window.Game.players[0]);
        this.placePlayer(window.Game.players[1]);
        //this.checkPlayerPosition();
        this.printMap();
    }

    generateMap() {
        this.map = [];
        for (let y = 0; y < this.rowsNumber; y++) {
            this.map[y] = [];
            for (let x = 0; x < this.columnsNumber; x++) {
                this.map[y][x] = { x, y };
            }
        }
    }

    generateWalls() {
        const wallsToBuild = Math.floor((this.rowsNumber * this.columnsNumber) * (this.percentageDisabledCells / 100));
        for (let i = 0; i < wallsToBuild; i++) {
            const cell = this.getAvailableRandomCell();
            this.map[cell.y][cell.x].wall = true;
        }
    }

    getRandomPosition() {
        const x = this.getRandomNumberBetweenRange(0, this.rowsNumber - 1);
        const y = this.getRandomNumberBetweenRange(0, this.columnsNumber - 1);
        return { x, y };
    }

    getRandomCell() {
        const { x, y } = this.getRandomPosition();
        return this.map[y][x];
    }

    getAvailableRandomCell(iteration = 0) {
        const cell = this.getRandomCell();

        if (iteration > (this.rowsNumber * this.columnsNumber)) {
            throw new Error("Plus aucune case disponible");
        }

        if (cell.wall || cell.weapon || cell.player) {
            iteration++;
            return this.getAvailableRandomCell(iteration);
        }
        return cell;
    }

     getValidRandomSpawnCell(iteration = 0) {
        const cell = this.getAvailableRandomCell();
        // Check 

        if (iteration > (this.rowsNumber * this.columnsNumber)) {
            throw new Error("Plus aucune case disponible");
        }

        //this.checkPlayerAroundPos(cell);

        /*
        if (/*Check/Get around cell.x cell.y) {
            iteration++;
            return this.getValidRandomSpawnCell(iteration);

            
        }
        */
        return cell;
    }

    // getPlayerAroundPos() return player | false

    checkPlayerAroundPos(cell) {
        console.log(this.map[cell.y][cell.x]);

        //true | false
    }

    generateWeapons() {
        for (let i = 0; i < this.weaponsCount; i++) {
            const cell = this.getAvailableRandomCell();
            this.map[cell.y][cell.x].weapon = weapons[i];
        }
    }

    placePlayer(player) {
        const cell = this.getAvailableRandomCell(); //this.getValidRandomSpawnCell()
        player.position = { x: cell.x, y: cell.y };
        const spawnCell = this.getValidRandomSpawnCell();
        console.log(spawnCell);
        
        /*
        if (player.name === window.Game.players[1].name) {
            const playerZeroPosition = window.Game.players[0].position;
            console.log("2nd player");
            console.log( cell.x, cell.y);
            console.log(playerZeroPosition);
            if (playerZeroPosition.x === cell.x || playerZeroPosition.y === cell.y) {
                console.log("Joueurs sur la même ligne");
                //this.placePlayer(window.Game.players[0]);
                this.placePlayer(window.Game.players[1]);
                this.map[playerZeroPosition.y][playerZeroPosition.x].player = false;
                console.log(players);
                console.log(this.map);
                console.log(this.map[playerZeroPosition.y][playerZeroPosition.x]);
            }

            player.position = { x: cell.x, y: cell.y };
            this.map[cell.y][cell.x].player = player;
        } else {
            player.position = { x: cell.x, y: cell.y };
            this.map[cell.y][cell.x].player = player;
        }
        //console.log(player.name);
        //console.log(window.Game.players[1]);
        */
        
        this.map[cell.y][cell.x].player = player;
    }

    /*
    checkPlayerPosition() {
        // TODO: Check position display when replaced
        //const playerPosition = [];
        console.log(playerPosition);
        console.log(window.Game.players[0]);
        console.log(window.Game.players[1]);

        this.map.forEach((element, i) => {
            for (let j = 0; j < element.length; j++) {
                if (this.map[i][j].player) {
                    playerPosition.push(this.map[i][j]);
                }
            }
        });

        if ((playerPosition[0].x === playerPosition[1].x || playerPosition[0].y === playerPosition[1].y)) {
            this.map[playerPosition[1].y][playerPosition[1].x].player = false;

            if (playerPosition[0].player.name === players[0].name || playerPosition[1].player.name === players[0].name) {
                console.log("0 Replacé !");
                playerPosition = [];
                //availableCellsAroundPlayer = [];
                this.placePlayer(players[1]);
                this.checkPlayerPosition();
                //this.getAvailableCellsAroundPlayer(players[1]);
                //console.log(playerPosition);
                //console.log(window.Game);
            } else if (playerPosition[0].player.name === players[1].name || playerPosition[1].player.name === players[1].name) {
                console.log("1 Replacé !");
                playerPosition = [];
                //availableCellsAroundPlayer = [];
                this.placePlayer(players[0]);
                this.checkPlayerPosition();
                //this.getAvailableCellsAroundPlayer(players[0]);
                //console.log(playerPosition);
                //console.log(window.Game.players[0].position);
            }
        }
    }
    */

    checkPlayerPosition() {
        //console.log(playerPosition);
        //console.log(window.Game.players[0]);
        //console.log(window.Game.players[1]);
    }

    getAvailableCellsAroundPlayer(player) {
        availableCellsAroundPlayer = [];
        //console.log(player);
        for (let i = 1; i < 4; i++) {
            if (player.position.x + i <= 10 && (this.map[player.position.y][player.position.x + i].wall || this.map[player.position.y][player.position.x + i].player)) {
                break;
            } else if (player.position.x + i <= 10 && !!this.map[player.position.y][player.position.x + i].wall == false) {
                availableCellsAroundPlayer.push(this.map[player.position.y][player.position.x + i]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (player.position.y + i <= 10 && (this.map[player.position.y + i][player.position.x].wall || this.map[player.position.y + i][player.position.x].player)) {
                break;
            } else if (player.position.y + i <= 10 && !!this.map[player.position.y + i][player.position.x].wall == false) {
                availableCellsAroundPlayer.push(this.map[player.position.y + i][player.position.x]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (player.position.x - i >= 0 && (this.map[player.position.y][player.position.x - i].wall || this.map[player.position.y][player.position.x - i].player)) {
                break;
            } else if (player.position.x - i >= 0 && !!this.map[player.position.y][player.position.x - i].wall == false) {
                availableCellsAroundPlayer.push(this.map[player.position.y][player.position.x - i]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (player.position.y - i >= 0 && (this.map[player.position.y - i][player.position.x].wall || this.map[player.position.y - i][player.position.x].player)) {
                break;
            } else if (player.position.y - i >= 0 && !!this.map[player.position.y - i][player.position.x].wall == false) {
                availableCellsAroundPlayer.push(this.map[player.position.y - i][player.position.x]);
            }
        }
        return availableCellsAroundPlayer;
    }

    printMap() {
        map = this.map;
        const tbody = document.createElement("tbody");
        this.map.forEach((row, indexY) => {
            const tr = document.createElement("tr");
            tr.dataset.y = indexY;
            tbody.appendChild(tr);
            row.forEach((cell, indexX) => {
                const td = document.createElement("td");
                td.dataset.x = indexX;
                td.dataset.yx = `${indexY}-${indexX}`;

                if (cell.wall) {
                    td.classList.add("wall");
                }

                if (cell.weapon) {
                    td.classList.add("weapon");
                    $(td).append(`<img class="weapon weapon${cell.weapon.name}" src="${cell.weapon.picture}" alt="Arme ${cell.weapon.name}">`);
                }

                if (cell.player) {
                    td.classList.add("player");
                    $(td).append(`<img class="player player${cell.player.name}" src="${cell.player.picture}" alt="Joueur ${cell.player.name}">`);
                }

                tr.appendChild(td);
            });
        });
        this.el.appendChild(tbody);
    }

    printMove() {
        currentPlayer = window.Game.getCurrentPlayer();
        const currentPlayerWeapon = currentPlayer.weapon;
        const availableCellsAroundPlayer = this.getAvailableCellsAroundPlayer(currentPlayer);
        const tdAvailableAroundPlayer = [];

        //console.log(this.map);

        availableCellsAroundPlayer.forEach(availableCell => {
            tdAvailableAroundPlayer.push(`${availableCell.y}-${availableCell.x}`);
        });

        tdAvailableAroundPlayer.forEach(td => {
            $(`td[data-yx="${td}"]`).addClass('move');
        });

        return new Promise((resolve) => {
            $('.move').on('click', (element) => {
                // Define new coordinates
                let newCoordinates = [];
                newCoordinates = $(element.currentTarget).attr('data-yx').split('-');

                // Remove player of the DOM
                $(`td[data-yx = "${currentPlayer.position.y}-${currentPlayer.position.x}"]`).removeClass('player').empty();
                $('.move').off('click');
                $('.move').removeClass('move');

                // Remove the player of the old coordinates on the logic map
                this.map[currentPlayer.position.y][currentPlayer.position.x].player = false;

                // Apply new coordinates to the player
                currentPlayer.position.x = parseInt(newCoordinates[1]);
                currentPlayer.position.y = parseInt(newCoordinates[0]);

                // Place the player on the new coordinates on the logic map
                this.map[currentPlayer.position.y][currentPlayer.position.x].player = currentPlayer;

                // Display player on new coordinates
                element.currentTarget.classList.add("player");
                $(element.currentTarget).append(`<img class="player player${currentPlayer.name}" src="${currentPlayer.picture}" alt="Joueur ${currentPlayer.name}">`);

                //console.log($(this).el);
                //console.log(this.map[currentPlayer.position.y][currentPlayer.position.x].weapon);
                //console.log(currentPlayer);
                //console.log(currentPlayerWeapon);
                if (this.map[currentPlayer.position.y][currentPlayer.position.x].weapon) {
                    console.log("Weapon found !");

                    this.getWeaponAtPos(this.map[currentPlayer.position.y][currentPlayer.position.x]);

                    this.setWeaponAtPos(this.map[currentPlayer.position.y][currentPlayer.position.x], currentPlayerWeapon);
                }
                resolve();
            });
        });
    }

    getWeaponAtPos(position) {
        return this.map[position.y][position.x].weapon;

        //console.log(position.weapon);
        //console.log(currentPlayer);
        //this.map[pos]
    }

    setWeaponAtPos(position, weapon) {
        this.map[position.y][position.x].weapon = weapon;
        console.log(position, weapon);
    }

    getRandomNumberBetweenRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
