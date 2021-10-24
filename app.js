const startBtn = document.querySelector(".start");
const grid = document.querySelector(".grid");
const squares = [];
const snake = [2, 1, 0];
let scoreDisplay = document.querySelector(".score");

function createGrid() {

  for (let i = 0; i < 100; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.append(cell);
    squares.push(cell);
  }

}
createGrid();

snake.forEach(index => squares[index].classList.add("snake"));
