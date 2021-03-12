/**
 * @function
 * @param {Int} max 
 * @returns 
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/**
 * @class
 * @param
 */

/*
class Map {
    constructor(rowsNumber, columnsNumber) {
        this.rowsNumber = rowsNumber;
        this.columnsNumber = columnsNumber;
    }
}
const squareMap = new Map(10, 10); // add percent 0.1
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
}

const squareMap = new Map({
    columnsNumber: 11,
    rowsNumber: 11,
    percentageDisabledCells: 10
});
console.log(squareMap);
const disabledBox = Math.floor((squareMap.columnsNumber*squareMap.rowsNumber) / squareMap.percentageDisabledCells);

let x = 0;
let y = 0;

/**
 * Generate map
 * @loop
 */
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

/**
 * Disabled cell
 * @loop
 */
for (let i = 0; i < disabledBox; i++) {
    $(`td#${getRandomInt(squareMap.columnsNumber)}-${getRandomInt(squareMap.rowsNumber)}`).addClass("disabledBox");
}

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

console.log(disabledBoxList);