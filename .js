const questions = [
  {
    question: "日本で一番高い山は何ですか？",
    options: ["富士山", "北岳", "奥穂高岳", "槍ヶ岳"],
    correct: 0,
    category: "地理"
  },
  {
    question: "日本の首都はどこですか？",
    options: ["大阪", "東京", "京都", "札幌"],
    correct: 1,
    category: "地理"
  },
  {
    question: "日本の最北端にある島はどれ？",
    options: ["択捉島", "与那国島", "佐渡島", "小笠原諸島"],
    correct: 0,
    category: "地理"
  }
];

let current = 0;
let score = 0;
let lives = 3;

const categoryEl = document.getElementById("category");
const livesEl = document.getElementById("lives");
const scoreEl = document.getElementById("score");
const progressEl = document.getElementById("progress");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const cardEl = document.getElementById("quiz-card");

function renderQuestion() {
  const q = questions[current];
  categoryEl.textContent = q.category;
  questionEl.textContent = q.question;
  progressEl.textContent = `問題 ${current + 1} / ${questions.length}`;
  scoreEl.textContent = `スコア: ${score}`;
  livesEl.textContent = "❤️".repeat(lives);

  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(i);
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(index) {
  const q = questions[current];
  if (index === q.correct) {
    score++;
  } else {
    lives--;
    if (lives <= 0) return showResult();
  }

  current++;
  if (current < questions.length) {
    renderQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  cardEl.innerHTML = `
    <div class="result">🎉 結果発表 🎉</div>
    <p>スコア: ${score} / ${questions.length}</p>
    <button class="retry" onclick="restart()">もう一度</button>
  `;
}

function restart() {
  current = 0;
  score = 0;
  lives = 3;
  renderQuestion();
}

renderQuestion();
