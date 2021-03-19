let x = 0;
let y = 0;

/**
 * @function
 * @param {number} max 
 * @returns 
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

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
          percentageDisabledCells: 15
      };
      Object.assign(this, {...defaultSettings, ...userSettings})
    }

    generateMap() {
        for (let i = 0; i < squareMap.rowsNumber; i++) {
            const trElement = document.createElement("tr");
            trElement.id = `row-${i}`;
        
            $("#myTable").append(trElement);
        
            for (let j = 0; j < squareMap.columnsNumber; j++) {
                const tdElement = document.createElement("td");
                tdElement.id = `${x}-${y}`;
                //tdElement.innerHTML = tdElement.id
                
                $(`#row-${y}`).append(tdElement);
                x++; // Go to right
        
                // Go to the next line
                if ($(`#row-${y}`).children().length === squareMap.columnsNumber) {
                    y++;
                    x = 0;
                }
            }
        }
    }
}

const squareMap = new Map({
    columnsNumber: 11,
    rowsNumber: 11,
    percentageDisabledCells: 10
});

squareMap.generateMap();

const disabledBox = Math.floor((squareMap.columnsNumber*squareMap.rowsNumber) * (squareMap.percentageDisabledCells/100));
console.log(Math.floor((squareMap.columnsNumber*squareMap.rowsNumber)));

/**
 * Disabled cell
 * @loop
 */
for (let i = 0; i < disabledBox; i++) {
    $(`td#${getRandomInt(squareMap.columnsNumber)}-${getRandomInt(squareMap.rowsNumber)}`).addClass("disabledBox");
}

/*
let mapInObject = {};
let mapInArray = [];
let trArray = [];
let tdArray = [];

console.log(squareMap.rowsNumber);
for (let i = 0; i < squareMap.rowsNumber; i++) {
    trArray.push(`tr-${i}`);
    tdArray.push([]);
    //mapInObject.tr_1 = [];
    //console.log(mapInObject);
    Object.assign(mapInObject, {[i]: tdArray});
    mapInArray.push([]);
    mapInArray[i].push([]);
}

console.log(mapInObject);
console.log(trArray);
console.log(tdArray);
console.log(mapInArray);
*/

/**
 * Drop weapons
 */
/*
if (!($(`td#${getRandomInt(squareMap.columnsNumber)}-${getRandomInt(squareMap.rowsNumber)}`).hasClass("disabledBox"))) {
    $(`td#${getRandomInt(squareMap.columnsNumber)}-${getRandomInt(squareMap.rowsNumber)}`).append("<img class='goultard' src='./sprites/goultard.png'>");    
    console.log("true")
} else {
    console.log($(`td#${getRandomInt(squareMap.columnsNumber)}-${getRandomInt(squareMap.rowsNumber)}`))
}
*/

//console.log($("td").hasClass("disabledBox"));

const disabledBoxList = [];

for (let i = 0; i < $("td").length; i++) {
    if (!(document.getElementsByTagName("td")[i].className === "disabledBox")) {
        disabledBoxList.push($("td").eq(i));
    }
}

//console.log(disabledBoxList);