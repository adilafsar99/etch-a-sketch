const createGrid = function (numOfSquares = 16) {
    let rows = numOfSquares;
    let columns = numOfSquares;
    const grid = document.querySelector('.grid');
    for (i = 1; i <= rows; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (j = 1; j <= columns; j++) {
            let column = document.createElement('div');
            column.classList.add('column');
            row.appendChild(column);
        }
        grid.appendChild(row)
    }
}

createGrid()

const toggleGridLines = function (event) {
    const columns = document.querySelectorAll('.column');
    columns.forEach(column => column.classList.toggle('showGrid'));
}

const toggleButton = document.querySelector('#toggle-button');
toggleButton.addEventListener('click', toggleGridLines)