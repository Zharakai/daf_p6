
class Map {
    constructor(rowsNumber, columnsNumber) {
        this.rowsNumber = rowsNumber;
        this.columnsNumber = columnsNumber;
    }
}

const squareMap = new Map(10, 10);

let x = 0;
let y = 0;

for (let i = 0; i < squareMap.rowsNumber; i++) {
    const trElement = document.createElement('tr');
    trElement.id = `row-${i}`;

    $('#myTable').append(trElement);

    for (let j = 0; j < squareMap.columnsNumber; j++) {
        const tdElement = document.createElement('td');
        tdElement.id = `${x}-${y}`;
        //tdElement.innerHTML = tdElement.id
        
        $(`#row-${y}`).append(tdElement);
        x++ // Go to right

        // Go to the next line
        if ($(`#row-${y}`).children().length === squareMap.columnsNumber) {
            y++;
            x = 0;
        }
    }
}
