let map;

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
        console.log(window.Game);
        this.placePlayer(window.Game.players[0]);
        this.placePlayer(window.Game.players[1]);
        this.checkPlayerPosition();
        //this.getAvailableCellsAroundPlayer();
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

    generateWeapons() {
        for (let i = 0; i < this.weaponsCount; i++) {
            const cell = this.getAvailableRandomCell();
            this.map[cell.y][cell.x].weapon = weapons[i];
        }
    }

    placePlayer(player) {
        const cell = this.getAvailableRandomCell();
        player.position = { x: cell.x, y: cell.y };
        this.map[cell.y][cell.x].player = player;
    }

    checkPlayerPosition() {
        //const playerPosition = [];

        this.map.forEach((element, i) => {
            for (let j = 0; j < element.length; j++) {
                if (this.map[i][j].player) {
                    playerPosition.push(this.map[i][j]);
                }
            }
        });

        if ((playerPosition[0].x === playerPosition[1].x || playerPosition[0].y === playerPosition[1].y)) {
            this.map[playerPosition[1].y][playerPosition[1].x].player = false;

            if (playerPosition[0].player.name === players[0].name) {
                //console.log("0 Replacé !");
                playerPosition = [];
                availableCellsAroundPlayerOne = [];
                this.placePlayer(players[1]);
                this.checkPlayerPosition();
            } else if (playerPosition[0].player.name === players[1].name) {
                //console.log("1 Replacé !");
                playerPosition = [];
                availableCellsAroundPlayerOne = [];
                this.placePlayer(players[0]);
                this.checkPlayerPosition();
            }
        }
    }

    /*
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
    */

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

                /*
                if (cell.player && cell.player.name == playerPosition[0].player.name) {

                    availableCellsAroundPlayerOne.forEach(availableCell => {
                        tdAvailableAroundPlayerOne.push(`${availableCell.y}-${availableCell.x}`);
                    });
                }
                */
                tr.appendChild(td);
            });
        });
        this.el.appendChild(tbody);

        /*
        tdAvailableAroundPlayerOne.forEach(td => {
            $(`td[data-yx="${td}"]`).addClass('move');
        });
        */
    }

    getRandomNumberBetweenRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

// map.js
//const currentPlayer = window.Game.getCurrentPlayer();
//console.log(currentPlayer);

/*
const squareMap = new Map({
    columnsNumber: 11,
    rowsNumber: 11,
    percentageDisabledCells: 10,
    weaponsCount: 4,
    el: document.querySelector("table#myTable"),
});
*/
