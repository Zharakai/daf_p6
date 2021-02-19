const rowsNumber = 10;
const columnsNumber = 10;

let x = 0;
let y = 0;

for (let i = 0; i < rowsNumber; i++) {
    const trElement = document.createElement('tr');
    trElement.id = `row-${i}`;

    document.getElementById('myTable').appendChild(trElement);

    for (let j = 0; j < columnsNumber; j++) {
        const tdElement = document.createElement('td');
        tdElement.id = `${x}-${y}`;
        tdElement.innerHTML = tdElement.id
        
        document.getElementById(`row-${y}`).appendChild(tdElement);
        x++ // Go to right

        // Go to the next line
        if (document.getElementById(`row-${y}`).children.length === columnsNumber) {
            y++;
            x = 0;
        }
    }
}
