const startBtn = document.querySelector(".start");
const grid = document.querySelector(".grid");
const squares = [];
const snake = [2, 1, 0];
const width = 10;
let direction = 1;
let scoreDisplay = document.querySelector(".score");

function createGrid() {

  for (let i = 0; i < width*width; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.append(cell);
    squares.push(cell);
  }

}
createGrid();

snake.forEach(index => squares[index].classList.add("snake"));

function move() {

  const tail = snake.pop();
  squares[tail].classList.remove("snake");
  snake.unshift(snake[0] + direction);
  squares[snake[0]].classList.add("snake");

  }
move();

let movement = setInterval(move, 1000);

function control(e) {
  if (e.key === "ArrowUp") {
    direction = -width;
  } else if (e.key === "ArrowRight") {
    direction = +1;
  } else if (e.key === "ArrowDown") {
    direction = +width;
  } else if (e.key === "ArrowLeft") {
    direction = -1;
  }
}

document.addEventListener("keydown", control);
