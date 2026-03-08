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
            column.addEventListener('mouseover', handleHover);
            row.appendChild(column);
        }
        grid.appendChild(row)
    }
    const gridSize = document.querySelector('#grid-size');
    gridSize.textContent = `${slider.value} x ${slider.value}`;
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

const clearGrid = function (event) {
    const squares = document.querySelectorAll('.column');
    squares.forEach(square => {
        square.classList.add('transparent');
        square.style.backgroundColor = '#ffffff'
        square.style.opacity = 0;
    })
}

const changePenColor = function (event) {
    if (event.target.id === 'color-picker') {
        pen_color = event.target.value;
    }
}

const adjustGrid = function (event) {
    let numOfSquares = event.target.value;
    createGrid(numOfSquares);
}

const fillSolid = function (column) {
    column.classList.remove('transparent');
    if (column.classList.contains('filled') &&
        column.style.backgroundColor === pen_color) {
        if (+column.style.opacity < 1) {
            let opacity = +column.style.opacity;
            opacity += 0.2;
            column.style.opacity = opacity;
        }
    }
    else {
        column.classList.add('filled');
        column.style.backgroundColor = pen_color;
        column.style.opacity = 0.2;
    }
}

const eraseFill = function (column) {
    column.classList.remove('filled');
    column.classList.add('transparent');
    column.style.backgroundColor = '#ffffff'
    column.style.opacity = 0;
}

const handleHover = function (event) {
    const column = event.target;
    if (event.buttons === 1) {
        fillSolid(column);
    }
    else {
        eraseFill(column);
    }
}

let show_grid = false;
let pen_color = '#000000';

const toggleButton = document.querySelector('#toggle-button');
toggleButton.addEventListener('click', toggleGridLines);
const slider = document.querySelector('#slider');
slider.addEventListener('change', adjustGrid);
const clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', clearGrid);
const colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('change', changePenColor);

createGrid();