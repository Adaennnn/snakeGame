// selecting html nodes
const startBtn = document.querySelector(".start");
const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector(".score");

// squares represents an array with all the cell nodes, this way we can apply styling to other variables representing an array with the help of their indexes
const squares = [];
// our snake defined on the gameboard which we pass through our squares array for styling
let snake = [2, 1, 0];

const width = 10;
let direction = 1;
let appleIndex = 0;
let speed = 0.9;
let intervalTime = 1000;
let timerId = 0;
let score = 0;

// creates our gameboard
function createGrid() {

  for (let i = 0; i < width*width; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    grid.append(cell);
    squares.push(cell);
  }

}
createGrid();

// adds class of snake to each indexes of snake array
snake.forEach(index => squares[index].classList.add("snake"));

// start game logic
function startGame() {

  snake.forEach(index => squares[index].classList.remove("snake"));
  squares[appleIndex].classList.remove("apple");
  score = 0;
  scoreDisplay.textContent = score;
  intervalTime = 1000;
  snake = [2, 1, 0];
  snake.forEach(index => squares[index].classList.add("snake"));
  generateApples();
  clearInterval(timerId);
  timerId = setInterval(move, intervalTime);

}

// move logic
function move() {
// if one of the condition returns true, game is lost
  if (
      (snake[0] - width < 0 && direction === -width) ||
      (snake[0] % width === 9 && direction === 1) ||
      (snake[0] + width >= 100 && direction === width) ||
      (snake[0] % width === 0 && direction === -1) ||
      (squares[snake[0] + direction].classList.contains("snake"))
  )
    return clearInterval(timerId);

  const tail = snake.pop();
  squares[tail].classList.remove("snake");
  snake.unshift(snake[0] + direction);
  squares[snake[0]].classList.add("snake");

// things that happen when the snake eats an apple
  if (squares[snake[0]].classList.contains("apple")) {
    snake.push(tail);
    squares[tail].classList.add("snake");
    squares[appleIndex].classList.remove("apple");
    generateApples();
    score++;
    scoreDisplay.textContent = score;
    clearInterval(timerId);
    intervalTime = intervalTime * speed;
    timerId = setInterval(move, intervalTime);
  }

  }
move();

// apple generation logic
function generateApples() {

  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains("snake"));
  squares[appleIndex].classList.add("apple");

}
generateApples();

function control(e) {
  if (e.key === "ArrowUp") {
    direction = -width;
  } else if (e.key === "ArrowRight") {
    direction = 1;
  } else if (e.key === "ArrowDown") {
    direction = width;
  } else if (e.key === "ArrowLeft") {
    direction = -1;
  }
}

document.addEventListener("keydown", control);
startBtn.addEventListener("click", startGame);
