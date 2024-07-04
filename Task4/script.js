const gridContainer = document.getElementById('sudoku-grid');
for (let i = 0; i < 9; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 9; j++) {
        const cell = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'number';
        input.min = 1;
        input.max = 9;
        input.value = '';
        cell.appendChild(input);
        row.appendChild(cell);
    }
    gridContainer.appendChild(row);
}

function getGrid() {
    const grid = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            const value = parseInt(gridContainer.rows[i].cells[j].children[0].value) || 0;
            row.push(value);
        }
        grid.push(row);
    }
    return grid;
}

function setGrid(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            gridContainer.rows[i].cells[j].children[0].value = grid[i][j] || '';
        }
    }
}

function solveSudoku() {
    const grid = getGrid();
    if (solve(grid)) {
        setGrid(grid);
    } else {
        alert('No solution exists!');
    }
}

function isValid(grid, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (grid[row][x] === num || grid[x][col] === num ||
            grid[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
            return false;
        }
    }
    return true;
}

function solve(grid) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (grid[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(grid, row, col, num)) {
                        grid[row][col] = num;
                        if (solve(grid)) {
                            return true;
                        }
                        grid[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}