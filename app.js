let foodSound = new Audio("music/food.mp3");
let gameOverSound = new Audio("music/gameover.mp3");
const scoreBox = document.querySelector("#scoreBox");

let inputDir = { x: 0, y: 0 };
let lastPaintTime = 0;
let speed = 18;
let score = 0;
let snakeArr = [
  {
    x: 13,
    y: 15,
  },
];

foods = {
  x: 6,
  y: 7,
};

function main(currentTime) {
  window.requestAnimationFrame(main);
  if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = currentTime;
  gamePlay();
}

function isCollide(snake) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}

function gamePlay() {
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    alert("Game Over. Press any OK to continue");
    snakeArr = [
      {
        x: 13,
        y: 15,
      },
    ];
    inputDir = { x: 0, y: 0 };
    score = 0;
    scoreBox.innerHTML = `Score: ${score}`;
  }

  if (snakeArr[0].y === foods.y && snakeArr[0].x === foods.x) {
    score++;

    if (highScore < score) {
      highScoreVal = score;
      localStorage.setItem("highScore", JSON.stringify(highScoreVal));
      highScoreBox.innerText = `High Score: ${highScoreVal}`;
    }
    scoreBox.innerHTML = `Score: ${score}`;

    foodSound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let min = 2;
    let max = 16;
    foods = {
      x: Math.floor(Math.random() * (max - min) + min),
      y: Math.floor(Math.random() * (max - min) + min),
    };
  }

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  board.innerHTML = "";

  snakeArr.forEach((ele, index) => {
    snakeEle = document.createElement("div");
    snakeEle.style.gridRowStart = ele.y;
    snakeEle.style.gridColumnStart = ele.x;
    snakeEle.classList.add("head");
    board.append(snakeEle);
  });

  foodEle = document.createElement("div");
  foodEle.style.gridRowStart = foods.y;
  foodEle.style.gridColumnStart = foods.x;
  foodEle.classList.add("food");
  board.append(foodEle);
}

let highScore = localStorage.getItem("highScore");

if (highScore == null) {
  highScoreVal = 0;
  localStorage.setItem("highScore", JSON.stringify(highScoreVal));
} else {
  highScoreVal = JSON.parse(localStorage.getItem(highScore));
  highScoreBox.innerText = `High Score: ${highScore}`;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 };

  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
