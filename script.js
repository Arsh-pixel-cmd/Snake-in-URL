let pos, dir, score, gameOver, foodPos;
const maxPos = 78;
const colors = [
  "#1abc9c",
  "#3498db",
  "#9b59b6",
  "#e67e22",
  "#e74c3c",
  "#2ecc71",
  "#f1c40f",
];
let intervalId;

function resetGame() {
  pos = Math.floor(maxPos / 2); ;
  dir = 1;
  score = 0;
  foodPos = getRandomFoodPos();
  gameOver = false;
  document.body.style.background = "#141414";
  document.getElementById("score").innerText = "Score: " + score;
  clearInterval(intervalId);
  intervalId = setInterval(gameLoop, 150);
  updateURL("🐍 ready?");
}

function getRandomFoodPos() {
  return Math.floor(Math.random() * maxPos);
}

function updateURL(content) {
  history.replaceState(null, "", "#" + encodeURIComponent(content));
}

function gameLoop() {
  if (gameOver) return;

  let display = "";
  for (let i = 0; i <= maxPos; i++) {
    if (i === pos) display += "🐍";
    else if (i === foodPos) display += "🍎";
    else display += "-";
  }
  updateURL(display);

  pos += dir;

  if (pos < 0 || pos > maxPos) {
    endGame();
    return;
  }

  if (pos === foodPos) {
    score++;
    foodPos = getRandomFoodPos();
    flashBackground();
  }

  document.getElementById("score").innerText = "Score: " + score;
  document.body.style.background = `linear-gradient(135deg, ${
    colors[score % colors.length]
  }, #000)`;
}

function endGame() {
  gameOver = true;
  updateURL("💀 GAME OVER 💀");
  document.getElementById("score").innerText =
    "💀 Game Over! Final Score: " + score + " — Press Space to Restart";
  document.body.style.background = "linear-gradient(135deg, #5a0000, #1a0000)";
  clearInterval(intervalId);
}

function flashBackground() {
  document.body.style.background = "linear-gradient(135deg, #fff, #000)";
  setTimeout(() => {
    document.body.style.background = `linear-gradient(135deg, ${
      colors[score % colors.length]
    }, #000)`;
  }, 150);
}

document.addEventListener("keydown", (e) => {
  if (gameOver && e.key === " ") resetGame();
  if (!gameOver && e.key === "ArrowRight") dir = 1;
  if (!gameOver && e.key === "ArrowLeft") dir = -1;
});

resetGame();
