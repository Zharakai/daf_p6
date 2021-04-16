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
            this.map[cell.y][cell.x].weapon = true;
        }
    }

    placePlayer(player) {
        const cell = this.getAvailableRandomCell(); // delete
        //const emptyCellSiblings = this.getAvailableRandomCellWithoutSiblings()
        //console.log(emptyCellSiblings);
        // getAvailableRandomCellWithoutSiblings
        player.position = { x: cell.x, y: cell.y };
        this.map[cell.y][cell.x].player = player;
    }

    checkPlayerPosition() {
        const playerPosition = [];

        this.map.forEach((element, i) => {
            for (let j = 0; j < element.length; j++) {
                if (this.map[i][j].player) {
                    playerPosition.push(this.map[i][j]);
                }
            }
        });

        console.log(playerPosition);
        console.log(playerPosition[0]);
        console.log(playerPosition[1]);

        if ((playerPosition[0].x === playerPosition[1].x || playerPosition[0].y === playerPosition[1].y))
            /*(playerPosition[0].x > playerPosition[1].x || playerPosition[0].y > playerPosition[1].x))*/ {
            console.log("It's not good !");
            //console.log("New placement !");
            console.log(this.map[playerPosition[1].y][playerPosition[1].x].player = false);
            //this.placePlayer(players[1]);
            console.log(playerPosition[0].player.name);
            console.log(this.map);
            if (playerPosition[0].player.name === players[0].name) {
                console.log("Il ne reste plus qu'un Iop.");
                this.placePlayer(players[1]);
                this.checkPlayerPosition();
            } else if (playerPosition[0].player.name === players[1].name) {
                console.log("Il ne reste plus qu'un Steamer.");
                this.placePlayer(players[0]);
                this.checkPlayerPosition();
            }
        }
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
                }

                if (cell.player) {
                    td.classList.add("player");
                }

                tr.appendChild(td);
            });
        });
        this.el.appendChild(tbody);
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
