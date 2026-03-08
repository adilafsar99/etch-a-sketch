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
        event.target.textContent = 'Show Grid Lines';
    }
    else {
        show_grid = true;
        event.target.textContent = 'Hide Grid Lines';
    }
}

const clearGrid = function (event) {
    const squares = document.querySelectorAll('.column');
    squares.forEach(square => {
        square.classList.remove('filled');
        square.classList.add('transparent');
        square.style.backgroundColor = '#ffffff'
        square.style.opacity = '';
    })
}

const changePenColor = function (event) {
    if (event.target.id === 'color-picker') {
        penColor = event.target.value;
    }
}

const rgbToHex = function (rgbString) {
    console.log(rgbString)
    let currentRGBValues = rgbString.slice(4, -1);
    let rgbArray = currentRGBValues.split(',');
    let [r, g, b] = rgbArray;
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

const toggleRandomize = function (event) {
    if (isRandomized) {
        isRandomized = false;
        event.target.textContent = 'Randomize';
        penColor = colorPicker.value;
    }
    else {
        isRandomized = true;
        event.target.textContent = 'Single Color';
    }
}

const getRandomRGB = function () {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    let randomRGB = `rgb(${r}, ${g}, ${b})`;
    return randomRGB;
}

const adjustGrid = function (event) {
    let numOfSquares = event.target.value;
    createGrid(numOfSquares);
}

const fillColor = function (column) {
    column.classList.remove('transparent');
    let currentRGBBG = column.style.backgroundColor;
    let currentHexBG = rgbToHex(currentRGBBG);
    if (column.classList.contains('filled') && penColor === currentHexBG && !isRandomized) {
        if (+column.style.opacity < 1) {
            let opacity = +column.style.opacity;
            opacity += 0.2;
            column.style.opacity = opacity;
        }
    }
    else {
        let opacity = 0.2;
        column.classList.add('filled');
        if (isRandomized) {
            penColor = getRandomRGB();
            opacity = 1;
        }
        column.style.backgroundColor = penColor;
        column.style.opacity = opacity;
    }
}

const eraseFill = function (column) {
    column.classList.remove('filled');
    column.classList.add('transparent');
    column.style.backgroundColor = '#ffffff'
    column.style.opacity = '';
}

const handleHover = function (event) {
    const column = event.target;
    if (event.buttons === 1) {
        fillColor(column);
    }
    else {
        eraseFill(column);
    }
}

let show_grid = false;
let penColor = '#000000';
let isRandomized = false;

const toggleButton = document.querySelector('#toggle-button');
toggleButton.addEventListener('click', toggleGridLines);
const slider = document.querySelector('#slider');
slider.addEventListener('change', adjustGrid);
const clearButton = document.querySelector('#clear-button');
clearButton.addEventListener('click', clearGrid);
const colorPicker = document.querySelector('#color-picker');
colorPicker.addEventListener('change', changePenColor);
const randomizer = document.querySelector('#randomizer');
randomizer.addEventListener('click', toggleRandomize)

createGrid();