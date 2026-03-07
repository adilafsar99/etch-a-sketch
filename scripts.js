const createGrid = function (numOfSquares = 16) {
    let rows = numOfSquares;
    let columns = numOfSquares;
    const grid = document.querySelector('.grid');
    grid.replaceChildren();
    for (i = 1; i <= rows; i++) {
        let row = document.createElement('div');
        row.classList.add('row');
        for (j = 1; j <= columns; j++) {
            let column = document.createElement('div');
            column.classList.add('column');
            if (show_grid) {
                column.classList.add('showGrid');
            }
            column.addEventListener('mouseover', fillSolid);
            row.appendChild(column);
        }
        grid.appendChild(row)
    }
}

const toggleGridLines = function (event) {
    const columns = document.querySelectorAll('.column');
    columns.forEach(column => column.classList.toggle('showGrid'));
    if (show_grid) {
        show_grid = false;
    }
    else {
        show_grid = true;
    }
}

const adjustGrid = function (event) {
    let numOfSquares = event.target.value;
    createGrid(numOfSquares);
}

const fillSolid = function (event) {
    if (event.buttons === 1) {
        const column = event.target;
        if (column.classList.contains('filled')) {
            if (column.style.opacity < 1) {
                let opacity = +column.style.opacity;
                opacity += 0.2;
                column.style.opacity = opacity;
            }
        }
        else {
            column.classList.add('filled');
        }
    }
}

let show_grid = false;

const toggleButton = document.querySelector('#toggle-button');
toggleButton.addEventListener('click', toggleGridLines);
const slider = document.querySelector('#slider');
slider.addEventListener('change', adjustGrid);

createGrid();