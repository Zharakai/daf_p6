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
        this.placePlayer(players[0]);
        this.placePlayer(players[1]);
        this.checkPlayerPosition();
        this.getAvailableCellsAroundPlayer()
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

    getAvailableCellsAroundPlayer() {
        //console.log(playerPosition);

        console.log(playerPosition[0]);
        console.log(playerPosition[0].player.name);
        console.log(playerPosition[0].x, playerPosition[0].y);

        for (let i = 1; i < 4; i++) {

            /*
            if (playerPosition[0].x + i < 10 && !!this.map[playerPosition[0].y][playerPosition[0].x + i].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y][playerPosition[0].x + i]);
            } else 
            if (playerPosition[0].y + i < 10 && !!this.map[playerPosition[0].y + i][playerPosition[0].x].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y + i][playerPosition[0].x]);
            } else
            if (playerPosition[0].x - i > 0 && !!this.map[playerPosition[0].y][playerPosition[0].x - i].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y][playerPosition[0].x - i]);
            } else
            if (playerPosition[0].y - i > 0 && !!this.map[playerPosition[0].y - i][playerPosition[0].x].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y - i][playerPosition[0].x]);
            }
            */

            /*
            if (playerPosition[0].x + i > 10 || 
                playerPosition[0].y + i > 10 ||
                playerPosition[0].x - i < 0 ||
                playerPosition[0].y - i < 0) {
                return;
            } else 
            if (this.map[playerPosition[0].y][playerPosition[0].x + i].wall ||
                this.map[playerPosition[0].y + i][playerPosition[0].x].wall ||
                this.map[playerPosition[0].y][playerPosition[0].x - i].wall ||
                this.map[playerPosition[0].y - i][playerPosition[0].x].wall) {
                return
            } else {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y][playerPosition[0].x + i]);
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y + i][playerPosition[0].x]);
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y][playerPosition[0].x - i]);
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y - i][playerPosition[0].x]);
            }
            */

            /*
            if (playerPosition[0].x + i > 10 || this.map[playerPosition[0].y][playerPosition[0].x + i].wall) {
                return;
            } else 
            if (playerPosition[0].y + i > 10 || this.map[playerPosition[0].y + i][playerPosition[0].x].wall) {
                return;
            } else
            if (playerPosition[0].x - i > 10 || this.map[playerPosition[0].y][playerPosition[0].x - i].wall) {
                return;
            } else
            if (playerPosition[0].y - i > 10 || this.map[playerPosition[0].y - i][playerPosition[0].x].wall) {
                return;
            } else {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y][playerPosition[0].x + i]);
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y + i][playerPosition[0].x]);
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y][playerPosition[0].x - i]);
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y - i][playerPosition[0].x]);
            }
            */
        }

        for (let i = 1; i < 4; i++) {
            
            if (playerPosition[0].x + i <= 10 && this.map[playerPosition[0].y][playerPosition[0].x + i].wall) {
                break;
            } else if (playerPosition[0].x + i <= 10 && !!this.map[playerPosition[0].y][playerPosition[0].x + i].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y][playerPosition[0].x + i]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (playerPosition[0].y + i <= 10 && this.map[playerPosition[0].y + i][playerPosition[0].x].wall) {
                break;
            } else if (playerPosition[0].y + i <= 10 && !!this.map[playerPosition[0].y + i][playerPosition[0].x].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y + i][playerPosition[0].x]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (playerPosition[0].x - i >= 0 && this.map[playerPosition[0].y][playerPosition[0].x - i].wall) {
                break;
            } else if (playerPosition[0].x - i >= 0 && !!this.map[playerPosition[0].y][playerPosition[0].x - i].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y][playerPosition[0].x - i]);
            }
        }

        for (let i = 1; i < 4; i++) {
            if (playerPosition[0].y - i >= 0 && this.map[playerPosition[0].y - i][playerPosition[0].x].wall) {
                break;
            } else if (playerPosition[0].y - i >= 0 && !!this.map[playerPosition[0].y - i][playerPosition[0].x].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y - i][playerPosition[0].x]);
            }
        }

        /*
        if (playerPosition[0].x > 2 && playerPosition[0].y > 2 && playerPosition[0].x < 8 && playerPosition[0].y < 8) {

            console.log(!!this.map[playerPosition[0].y][playerPosition[0].x + 1].wall);
            if (!!this.map[playerPosition[0].y][playerPosition[0].x + 1].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y][playerPosition[0].x + 1]);
            }

            console.log(!!this.map[playerPosition[0].y + 1][playerPosition[0].x].wall);
            if (!!this.map[playerPosition[0].y + 1][playerPosition[0].x].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y + 1][playerPosition[0].x]);
            }

            console.log(!!this.map[playerPosition[0].y][playerPosition[0].x - 1].wall);
            if (!!this.map[playerPosition[0].y][playerPosition[0].x - 1].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y][playerPosition[0].x - 1]);
            }

            console.log(!!this.map[playerPosition[0].y - 1][playerPosition[0].x].wall);
            if (!!this.map[playerPosition[0].y - 1][playerPosition[0].x].wall == false) {
                availableCellsAroundPlayerOne.push(this.map[playerPosition[0].y - 1][playerPosition[0].x]);
            }
            //console.log(this.map[playerPosition[0].y][playerPosition[0].x + 1].player);
        }
        */

        for (let i = 0; i < playerPosition.length; i++) {
            //console.log(this.map[playerPosition[i].y][playerPosition[i].x]);
            //console.log(playerPosition[i]);
            //console.log(playerPosition[i].x);
            //console.log(playerPosition[i].y);

            if (playerPosition[i].x > 2 && playerPosition[i].y > 2 && playerPosition[i].x < 9 && playerPosition[i].y < 9) {
                //console.log(this.map[playerPosition[i].y][playerPosition[i].x]);

                for (let j = 1; j < 3; j++) {
                    /*
                    console.log(this.map[playerPosition[i].y][playerPosition[i].x + j]);
                    console.log(this.map[playerPosition[i].y + j][playerPosition[i].x]);
                    console.log(this.map[playerPosition[i].y][playerPosition[i].x - j]);
                    console.log(this.map[playerPosition[i].y - j][playerPosition[i].x]);
                    console.log(this.map[playerPosition[i].y + 1][playerPosition[i].x + j]);
                    console.log(this.map[playerPosition[i].y + 2][playerPosition[i].x + j]);
                    console.log(this.map[playerPosition[i].y + j][playerPosition[i].x + 1]);
                    console.log(this.map[playerPosition[i].y + j][playerPosition[i].x + 2]);
                    console.log(this.map[playerPosition[i].y - 1][playerPosition[i].x + j]);
                    console.log(this.map[playerPosition[i].y - 2][playerPosition[i].x + j]);
                    console.log(this.map[playerPosition[i].y + j][playerPosition[i].x - 1]);
                    console.log(this.map[playerPosition[i].y + j][playerPosition[i].x - 2]);
                    */

                    //$(`td[data-yx="${this.map[playerPosition[i].y]}-${this.map[playerPosition[i].x + j]}"]`).addClass('move');
                    //console.log($('td[data-yx="1-6"]'));

                    //availableCellsAroundPlayer.push($(this.map[playerPosition[i].y][playerPosition[i].x + 1]));
                }

                /*
                console.log(this.map[playerPosition[i].y][playerPosition[i].x + 1]);
                console.log(this.map[playerPosition[i].y][playerPosition[i].x - 1]);
                console.log(this.map[playerPosition[i].y + 1][playerPosition[i].x]);
                console.log(this.map[playerPosition[i].y - 1][playerPosition[i].x]);
                console.log(this.map[playerPosition[i].y + 1][playerPosition[i].x + 1]);
                console.log(this.map[playerPosition[i].y + 1][playerPosition[i].x - 1]);
                console.log(this.map[playerPosition[i].y - 1][playerPosition[i].x + 1]);
                console.log(this.map[playerPosition[i].y][playerPosition[i].x + 2]);
                console.log(this.map[playerPosition[i].y][playerPosition[i].x - 2]);
                console.log(this.map[playerPosition[i].y + 2][playerPosition[i].x]);
                console.log(this.map[playerPosition[i].y - 2][playerPosition[i].x]);
                console.log(this.map[playerPosition[i].y + 2][playerPosition[i].x + 2]);
                console.log(this.map[playerPosition[i].y + 2][playerPosition[i].x - 2]);
                console.log(this.map[playerPosition[i].y - 2][playerPosition[i].x + 2]);
                console.log(this.map[playerPosition[i].y][playerPosition[i].x + 3]);
                console.log(this.map[playerPosition[i].y][playerPosition[i].x - 3]);
                console.log(this.map[playerPosition[i].y + 3][playerPosition[i].x]);
                console.log(this.map[playerPosition[i].y - 3][playerPosition[i].x]);
                console.log(this.map[playerPosition[i].y + 3][playerPosition[i].x + 3]);
                console.log(this.map[playerPosition[i].y + 3][playerPosition[i].x - 3]);
                console.log(this.map[playerPosition[i].y - 3][playerPosition[i].x + 3]);
                */

                /*
                console.log(this.map[playerPosition[i].y][playerPosition[i].x + 1].wall);
                console.log(this.map[playerPosition[i].y][playerPosition[i].x - 1].wall);
                console.log(this.map[playerPosition[i].y + 1][playerPosition[i].x].wall);
                console.log(this.map[playerPosition[i].y - 1][playerPosition[i].x].wall);
                */
                //console.log(this.map[playerPosition[i].y + 1][playerPosition[i].x + 1]);
                //console.log(this.map[playerPosition[i].y][playerPosition[i].x + 1]);
            }
        }
        //console.log(availableCellsAroundPlayerOne);
    }

    printMap() {
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

                    //console.log(availableCellsAroundPlayerOne);

                    //getAvailableCellsAroundPlayer();
                }

                if (cell.player && cell.player.name == playerPosition[0].player.name) {
                    console.log(availableCellsAroundPlayerOne);

                    availableCellsAroundPlayerOne.forEach(availableCell => {
                        console.log(availableCell);
                        console.log(availableCell.x);
                        console.log(availableCell.y);
                        console.log($(td));

                        tdAvailableAroundPlayerOne.push(`${availableCell.y}-${availableCell.x}`);
                        //console.log($(td`[data-yx="${availableCell.y}-${availableCell.x}"]`));
                        //$(`td[data-yx="${availableCell.y}-${availableCell.x}"]`).addClass('move');
                    });

                    /*
                    if (cell.player.name == playerPosition[0].player.name)
                    console.log(cell.player);
                    console.log(cell.player.name);
                    console.log(playerPosition[0].player.name);
                    */
                }

                /*
                if (cell.player.name == playerPosition[0].player.name) {
                    console.log(availableCellsAroundPlayerOne);
                }
                */

                tr.appendChild(td);
            });
        });
        this.el.appendChild(tbody);

        console.log(tdAvailableAroundPlayerOne);
        tdAvailableAroundPlayerOne.forEach(td => {
            $(`td[data-yx="${td}"]`).addClass('move');
        });

        //console.log(this.map);
        //console.log($('td'));
    }

    getRandomNumberBetweenRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

const squareMap = new Map({
    columnsNumber: 11,
    rowsNumber: 11,
    percentageDisabledCells: 10,
    weaponsCount: 4,
    el: document.querySelector("table#myTable"),
});
