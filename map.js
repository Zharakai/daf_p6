/**
 * @class
 * @param
 */
 class Map {
    constructor(settings) {
        this.registerSettings(settings);
    }
  
    registerSettings(userSettings) {
      const defaultSettings = {
          columnsNumber: 10,
          rowsNumber: 10,
          percentageDisabledCells: 15,
          weaponsCount : 5
      };
      Object.assign(this, {...defaultSettings, ...userSettings});
    }
}

const squareMap = new Map({
    columnsNumber: 11,
    rowsNumber: 11,
    percentageDisabledCells: 10,
    weaponsCount : 4
});

function getRandomNumberBetweenRange(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateMap() {
    let map = [];
    for (let y = 0; y < squareMap.rowsNumber; y++) {
        map[y] = [];
        for (let x = 0; x < squareMap.columnsNumber; x++) {
            map[y][x] = {x, y};
        }
    }
    return map;
}

function getRandomPosition() {
    const x = getRandomNumberBetweenRange(0, squareMap.rowsNumber - 1);
    const y = getRandomNumberBetweenRange(0, squareMap.columnsNumber - 1);
    return {x, y};
}

function getRandomCell() {
    const {x, y} = getRandomPosition();
    return map[y][x];
}

function getAvailableRandomCell(iteration = 0) {
    const cell = getRandomCell();

    if (iteration > (squareMap.rowsNumber * squareMap.columnsNumber)) {
        throw new Error("Plus aucune case disponible");
    }

    if (cell.wall || cell.weapon || cell.player) {
        iteration++;
        return getAvailableRandomCell(iteration);
    }
    return cell;
}

function generateWeapons(baseMap) {
    const map = baseMap;
    for (let i = 0; i < squareMap.weaponsCount; i++) {
        const cell = getAvailableRandomCell();
        map[cell.y][cell.x].weapon = true;
    }
    return map;
}

function generateWalls(baseMap) {
    const map = baseMap;
    const wallsToBuild = Math.floor((squareMap.rowsNumber * squareMap.columnsNumber) * (squareMap.percentageDisabledCells / 100));
    for (let i = 0; i < wallsToBuild; i++) {
        const cell = getAvailableRandomCell();
        map[cell.y][cell.x].wall = true;
    }
    return map;
}

function placePlayer(player) {
    const cell = getAvailableRandomCell();
    player.position = {x: cell.x, y: cell.y};
    map[cell.y][cell.x].player = player;

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

function checkSiblingsCells() {
    const cell = players[0].position;

    console.log(map);

    players.forEach(function(player, i) {
        //console.log(players);
        const playerPosY = player.position.y;
        const playerPosX = player.position.x;

        console.log(map[playerPosY][playerPosX]);
    });

    /*
    // create new function
    if (cell.y < 10 && cell.x < 10 || cell.y > 0 && cell.x > 0) {
        console.log(map[cell.y][cell.x]);
        console.log(map[cell.y - 1][cell.x]);
        console.log(map[cell.y + 1][cell.x]);
        console.log(map[cell.y][cell.x + 1]);
        console.log(map[cell.y][cell.x - 1]);
    } else {
        console.log("Hors map");
    }
    */
    
    //console.log(players[0].position.y);
    //console.log(map[cell.y - 1][cell.x]);
    //console.log(map[cell.y - 1][cell.x - 1]);
    //console.log(map[cell.y + 1][cell.x]);
    //console.log(map[cell.y + 1][cell.x + 1]);
    //console.log(map[cell.y][cell.x + 1]);
    //console.log(map[cell.y][cell.x - 1]);
}

function printMap(map) {
    const table = document.querySelector("table");
    const tbody = document.createElement("tbody");
    map.forEach((row, indexY) => {
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
    table.appendChild(tbody);
}

let map = generateMap();
map = generateWalls(map);
map = generateWeapons(map);

placePlayer(players[0]);
placePlayer(players[1]);

checkSiblingsCells();
printMap(map);

//squareMap.getRandomCell();
//squareMap.printMap();

//console.log(squareMap.generateMap());

//let map = squareMap.generateMap();
//map = generateWalls(map);
//map = generateWeapons(map);
//printMap(map);
