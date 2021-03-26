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
console.log(generateMap());

function getRandomPosition() {
    const x = getRandomNumberBetweenRange(0, squareMap.rowsNumber - 1);
    const y = getRandomNumberBetweenRange(0, squareMap.columnsNumber - 1);
    return {x, y};
}
//console.log(getRandomPosition());

function getRandomCell() {
    const {x, y} = getRandomPosition();
    //console.log(map[y][x]);
    return map[y][x];
}
//console.log(getRandomCell());

function getAvailableRandomCell(iteration = 0) {
    const cell = getRandomCell();
    if (iteration > (squareMap.rowsNumber * squareMap.columnsNumber)) {
        throw new Error('plus de case disponible');
    }
    //console.log(cell)
    if (cell.wall || cell.weapon || cell.player) {
        iteration++;
        return getAvailableRandomCell(iteration);
    }
    //console.log(cell);
    return cell;
}
//console.log(getAvailableRandomCell());

function generateWeapons(baseMap) {
    const map = baseMap;
    for (let i = 0; i < squareMap.weaponsCount; i++) {
        console.log("generateWeapons")
        const cell = getAvailableRandomCell();
        console.log(cell)
        map[cell.y][cell.x].weapon = true;
    }
    return map;
}

function generateWalls(baseMap) {
    const map = baseMap;
    const wallsToBuild = Math.floor((squareMap.rowsNumber * squareMap.columnsNumber) * (squareMap.percentageDisabledCells / 100));
    for (let i = 0; i < wallsToBuild; i++) {
        console.log("generateWalls")
        const cell = getAvailableRandomCell();
        console.log(cell);
        map[cell.y][cell.x].wall = true;
    }
    console.log(map);
    return map;
}

function placePlayer(player) {
    console.log("placePlayer")
    const cell = getAvailableRandomCell();
    console.log(cell)
    //console.log(map[cell.y][cell.x]);
    //player.position = map[cell.y][cell.x];
    //player.position = map[cell.y][cell.x];
    player.position = {x: cell.x, y: cell.y};
    //console.log(cell.y, cell.x);
    map[cell.y][cell.x].player = player;
    

    // create new function
    //console.log(map[cell.y - 1][cell.x]);
    //console.log(map[cell.y + 1][cell.x]);
    //console.log(map[cell.y][cell.x + 1]);
    //console.log(map[cell.y][cell.x - 1]);

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
    console.log(map);
}

function printMap(map) {
    const table = document.querySelector('table');
    const tbody = document.createElement('tbody');
    map.forEach((row, indexY) => {
        const tr = document.createElement('tr');
        tr.dataset.y = indexY;
        tbody.appendChild(tr);
        row.forEach((cell, indexX) => {
            const td = document.createElement('td');
            td.dataset.x = indexX;
            td.dataset.yx = `${indexY}-${indexX}`;
            
            if (cell.wall) {
                td.classList.add('wall');
            }
            
            if (cell.weapon) {
                td.classList.add('weapon');
            }

            if (cell.player) {
                td.classList.add('player');
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
console.log(players[0]);
placePlayer(players[1]);
console.log(players[1]);
printMap(map);


//squareMap.getRandomCell();
//squareMap.printMap();

//console.log(squareMap.generateMap());

//let map = squareMap.generateMap();
//map = generateWalls(map);
//map = generateWeapons(map);
//printMap(map);
