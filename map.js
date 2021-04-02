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
          weaponsCount : 5,
          el: document.querySelector('table'),
      };
      Object.assign(this, {...defaultSettings, ...userSettings});
    }

    boot() {
        this.generateMap();
        this.generateWalls();
        this.generateWeapons();
        this.placePlayer(players[0]);
        this.placePlayer(players[1]);
        this.checkSiblingsCells();
        this.printMap();
    }

    generateMap() {
        this.map = [];
        for (let y = 0; y < this.rowsNumber; y++) {
            this.map[y] = [];
            for (let x = 0; x < this.columnsNumber; x++) {
                this.map[y][x] = {x, y};
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
        return {x, y};
    }

    getRandomCell() {
        const {x, y} = this.getRandomPosition();
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
        const cell = this.getAvailableRandomCell();
        player.position = {x: cell.x, y: cell.y};
        this.map[cell.y][cell.x].player = player;

        /*
        if (cell.y-1 !== -1 || 
            cell.y+1 !== squareMap.columnsNumber-1 ||
            cell.x-1 !== -1 ||
            cell.x+1 !== squareMap.rowsNumber-1) {
                console.log(map[cell.y - 1][cell.x]);
                console.log(map[cell.y + 1][cell.x]);
                console.log(map[cell.y][cell.x + 1]);
                console.log(map[cell.y][cell.x - 1]);
        }
        */
    }

    checkSiblingsCells() {
        //const cell = players[0].position;
        //let cellOccupied = [];

        console.log(this.map);

        players.forEach((player, i) => {
            //console.log(players);
            const playerPosY = player.position.y;
            const playerPosX = player.position.x;

            //console.log(!!(map[playerPosY][playerPosX].player));
            console.log(this.map[playerPosY][playerPosX]);

            console.log(this.rowsNumber);
            
            if (playerPosY === (this.rowsNumber - 1) && playerPosX === 0 || 
                playerPosY === (this.rowsNumber - 1) && playerPosX === (this.columnsNumber - 1) || 
                playerPosY === 0 && playerPosX === 0 || 
                playerPosY === 0 && playerPosX === (this.columnsNumber - 1)) {
                    console.log("Player in square end");
            } else if (
                playerPosY === 10 && playerPosX > 0 && playerPosX < (this.columnsNumber - 1) || 
                playerPosX === 0 && playerPosY > 0 && playerPosY < (this.rowsNumber - 1) || 
                playerPosY === 0 && playerPosX > 0 && playerPosX < (this.columnsNumber - 1) || 
                playerPosX === 10 && playerPosY > 0 && playerPosY < (this.rowsNumber - 1)) {
                    console.log("Player in outlines cells");
            } else if (playerPosY < (this.rowsNumber - 1) && playerPosY > 0 && playerPosX < (this.columnsNumber - 1)  && playerPosX > 0) {
                console.log("Player in inner cells");
            }

            if (
                playerPosY <= (this.rowsNumber - 1) && 
                playerPosY >= 0 && 
                playerPosX <= (this.columnsNumber - 1) && 
                playerPosX >= 0 &&
                playerPosY + 1 <= (this.rowsNumber - 1) &&
                playerPosY - 1 >= 0 &&
                playerPosX + 1 <= (this.columnsNumber - 1) &&
                playerPosX - 1 >= 0) {
                console.log(this.map[playerPosY - 1][playerPosX]);
                console.log(this.map[playerPosY + 1][playerPosX]);
                console.log(this.map[playerPosY][playerPosX + 1]);
                console.log(this.map[playerPosY][playerPosX - 1]);
                console.log(this.map[playerPosY - 1][playerPosX - 1]);
                console.log(this.map[playerPosY - 1][playerPosX + 1]);
                console.log(this.map[playerPosY + 1][playerPosX - 1]);
                console.log(this.map[playerPosY + 1][playerPosX + 1]);
            }
            
            /*
            if (playerPosY === 10 && playerPosX === 0) {          // Square end
                console.log(this.map[playerPosY - 1][playerPosX]);
                console.log(this.map[playerPosY][playerPosX + 1]);
                console.log(this.map[playerPosY - 1][playerPosX + 1]);
                
                if (!!(this.map[playerPosY - 1][playerPosX].player) || !!(this.map[playerPosY][playerPosX + 1].player) || !!(this.map[playerPosY - 1][playerPosX + 1]).player) {
                    console.log('Cellule voisine occupée');
                }
                
            } else if (playerPosY === 10 && playerPosX === 10) {  // Square end
                console.log(this.map[playerPosY - 1][playerPosX]);
                console.log(this.map[playerPosY - 1][playerPosX - 1]);
                console.log(this.map[playerPosY][playerPosX - 1]);
            } else if (playerPosY === 0 && playerPosX === 0) {    // Square end
                console.log(this.map[playerPosY + 1][playerPosX]);
                console.log(this.map[playerPosY][playerPosX + 1]);
                console.log(this.map[playerPosY + 1][playerPosX + 1]);
            } else if (playerPosY === 0 && playerPosX === 10) {   // Square end
                console.log(this.map[playerPosY + 1][playerPosX]);
                console.log(this.map[playerPosY][playerPosX - 1]);
                console.log(this.map[playerPosY + 1][playerPosX - 1]);
            } else if (playerPosY === 10 && playerPosX > 0 && playerPosX < 10) { // Outlines
                console.log(this.map[playerPosY][playerPosX + 1]);
                console.log(this.map[playerPosY][playerPosX - 1]);
                console.log(this.map[playerPosY - 1][playerPosX]);
                console.log(this.map[playerPosY - 1][playerPosX + 1]);
                console.log(this.map[playerPosY - 1][playerPosX - 1]);
            } else if (playerPosX === 0 && playerPosY > 0 && playerPosY < 10) { // Outlines
                console.log(this.map[playerPosY][playerPosX + 1]);
                console.log(this.map[playerPosY - 1][playerPosX]);
                console.log(this.map[playerPosY - 1][playerPosX + 1]);
                console.log(this.map[playerPosY + 1][playerPosX + 1]);
                console.log(this.map[playerPosY + 1][playerPosX]);
            } else if (playerPosY === 0 && playerPosX > 0 && playerPosX < 10) { // Outlines
                console.log(this.map[playerPosY][playerPosX + 1]);
                console.log(this.map[playerPosY][playerPosX - 1]);
                console.log(this.map[playerPosY + 1][playerPosX]);
                console.log(this.map[playerPosY + 1][playerPosX + 1]);
                console.log(this.map[playerPosY + 1][playerPosX - 1]);
            } else if (playerPosX === 10 && playerPosY > 0 && playerPosY < 10) { // Outlines
                console.log(this.map[playerPosY][playerPosX - 1]);
                console.log(this.map[playerPosY - 1][playerPosX]);
                console.log(this.map[playerPosY + 1][playerPosX]);
                console.log(this.map[playerPosY + 1][playerPosX - 1]);
                console.log(this.map[playerPosY - 1][playerPosX - 1]);
            } else if (playerPosY < 10 && playerPosY > 0 && playerPosX < 10  && playerPosX > 0) { // Inner cells
                console.log(this.map[playerPosY - 1][playerPosX]);
                console.log(this.map[playerPosY + 1][playerPosX]);
                console.log(this.map[playerPosY][playerPosX + 1]);
                console.log(this.map[playerPosY][playerPosX - 1]);
                console.log(this.map[playerPosY - 1][playerPosX - 1]);
                console.log(this.map[playerPosY - 1][playerPosX + 1]);
                console.log(this.map[playerPosY + 1][playerPosX - 1]);
                console.log(this.map[playerPosY + 1][playerPosX + 1]);

                if (
                    !!(this.map[playerPosY - 1][playerPosX].player) || 
                    !!(this.map[playerPosY][playerPosX + 1].player) || 
                    !!(this.map[playerPosY - 1][playerPosX + 1]).player || 
                    !!(this.map[playerPosY + 1][playerPosX]).player ||
                    !!(this.map[playerPosY][playerPosX - 1].player) ||
                    !!(this.map[playerPosY - 1][playerPosX - 1].player) ||
                    !!(this.map[playerPosY + 1][playerPosX - 1].player) ||
                    !!(this.map[playerPosY + 1][playerPosX + 1].player)) {
                    console.log('Cellule voisine occupée');
                }

            }
            */
        });
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
    weaponsCount : 4,
    el: document.querySelector("table#myTable"),
});



//squareMap.getRandomCell();
//squareMap.printMap();

//console.log(squareMap.generateMap());

//let map = squareMap.generateMap();
//map = generateWalls(map);
//map = generateWeapons(map);
//printMap(map);
