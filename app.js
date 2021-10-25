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

  if (
      (snake[0] % width === 0 && direction === -1) ||
      (snake[0] % width === 9 && direction === +1) ||
      (snake[0] - width < 0 && direction === -width) ||
      (snake[0] + width >= width*width && direction === +width)
  )
    clearInterval(movement);

  const tail = snake.pop();
  squares[tail].classList.remove("snake");
  snake.unshift(snake[0] + direction);
  squares[snake[0]].classList.add("snake");

  }
move();

let movement = setInterval(move, 1000);

function control(e) {
  if (e.key === "ArrowUp") {
    console.log("up");
    direction = -width;
  } else if (e.key === "ArrowRight") {
    console.log("right");
    direction = +1;
  } else if (e.key === "ArrowDown") {
    console.log("down");
    direction = +width;
  } else if (e.key === "ArrowLeft") {
    console.log("left");
    direction = -1;
  }
}

document.addEventListener("keydown", control);
