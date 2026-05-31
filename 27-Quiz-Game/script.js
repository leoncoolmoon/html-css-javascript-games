// ── 配置 ──────────────────────────────────────────────
const WORKER_URL = "https://falling-hill-4472.leoncoolmoon.workers.dev";
const TOPICS = ["general knowledge", "science and technology", "world history", "world geography"];

// ── 本地题库（兜底） ──────────────────────────────────
const localQuestions = [
  { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
  { question: "What is the largest planet in our solar system?", options: ["Mars", "Saturn", "Jupiter", "Neptune"], answer: "Jupiter" },
  { question: "Which country won the FIFA World Cup in 2018?", options: ["Brazil", "Germany", "France", "Argentina"], answer: "France" },
  { question: "What is the tallest mountain in the world?", options: ["Mount Everest", "K2", "Kangchenjunga", "Makalu"], answer: "Mount Everest" },
  { question: "Which is the largest ocean on Earth?", options: ["Pacific Ocean", "Indian Ocean", "Atlantic Ocean", "Arctic Ocean"], answer: "Pacific Ocean" },
  { question: "What is the chemical symbol for gold?", options: ["Au", "Ag", "Cu", "Fe"], answer: "Au" },
  { question: "Who painted the Mona Lisa?", options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Michelangelo"], answer: "Leonardo da Vinci" },
  { question: "Which planet is known as the Red Planet?", options: ["Mars", "Venus", "Mercury", "Uranus"], answer: "Mars" },
  { question: "What is the largest species of shark?", options: ["Great White Shark", "Whale Shark", "Tiger Shark", "Hammerhead Shark"], answer: "Whale Shark" },
  { question: "Which animal is known as the King of the Jungle?", options: ["Lion", "Tiger", "Elephant", "Giraffe"], answer: "Lion" },
  { question: "What is the capital of Japan?", options: ["Tokyo", "Kyoto", "Osaka", "Nagoya"], answer: "Tokyo" },
  { question: "Which element has the atomic number 1?", options: ["Helium", "Oxygen", "Hydrogen", "Carbon"], answer: "Hydrogen" },
  { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"], answer: "William Shakespeare" },
  { question: "What is the smallest country in the world?", options: ["Monaco", "San Marino", "Liechtenstein", "Vatican City"], answer: "Vatican City" },
  { question: "Which planet is known for its rings?", options: ["Venus", "Saturn", "Jupiter", "Neptune"], answer: "Saturn" },
  { question: "Who discovered penicillin?", options: ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Isaac Newton"], answer: "Alexander Fleming" },
  { question: "Which continent is the Sahara Desert located on?", options: ["Asia", "Africa", "Australia", "Europe"], answer: "Africa" },
  { question: "What is the main ingredient in guacamole?", options: ["Tomato", "Avocado", "Onion", "Pepper"], answer: "Avocado" },
  { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "South Korea", "Thailand", "Japan"], answer: "Japan" },
  { question: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "100,000 km/s"], answer: "300,000 km/s" },
];

// ── 题库管理 ──────────────────────────────────────────
let questionPool = [...localQuestions];
let usedQuestions = new Set();
let dynamicFetched = false;
let fetchStatusEl = null;

function mergeQuestions(newQs) {
  const existing = new Set(questionPool.map(q => q.question.trim().toLowerCase()));
  let added = 0;
  for (const q of newQs) {
    if (!existing.has(q.question.trim().toLowerCase())) {
      questionPool.push(q);
      existing.add(q.question.trim().toLowerCase());
      added++;
    }
  }
  return added;
}

async function fetchDynamicQuestions() {
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  try {
    const res = await fetch(`${WORKER_URL}/quiz?topic=${encodeURIComponent(topic)}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.data && Array.isArray(json.data)) {
      const added = mergeQuestions(json.data);
      dynamicFetched = true;
      if (fetchStatusEl) {
        fetchStatusEl.textContent = `✓ ${added} new questions loaded (${topic})`;
        fetchStatusEl.style.color = "#4caf50";
      }
    }
  } catch (e) {
    if (fetchStatusEl) {
      fetchStatusEl.textContent = "⚠ Using local questions only";
      fetchStatusEl.style.color = "#ff9800";
    }
  }
}

function pickQuestions(count) {
  // 优先用动态题目（本地题库之后的部分），再用本地题库
  const dynamic = questionPool.slice(localQuestions.length);
  const local = questionPool.slice(0, localQuestions.length);
  const ordered = [...dynamic, ...local];

  const available = ordered.filter(q => !usedQuestions.has(q.question));
  if (available.length < count) usedQuestions.clear(); // 题目用完了就重置

  const fresh = ordered.filter(q => !usedQuestions.has(q.question));
  shuffleArray(fresh);
  const picked = fresh.slice(0, count);
  picked.forEach(q => usedQuestions.add(q.question));
  return picked;
}

// ── 游戏模式配置 ───────────────────────────────────────
const MODES = {
  classic: { label: "Classic", desc: "Answer all 20 questions, see how many you got right.", questionCount: 20, timeLimit: 0, streakBonus: false, livesMode: false },
  timed:   { label: "⏱ Timed",   desc: "15 seconds per question. Bonus points for speed!", questionCount: 20, timeLimit: 15, streakBonus: false, livesMode: false },
  streak:  { label: "🔥 Streak",  desc: "Build a streak for bonus points. One wrong answer breaks it!", questionCount: 20, timeLimit: 0, streakBonus: true, livesMode: false },
  survival:{ label: "❤️ Survival", desc: "3 lives only. Reach the end without running out!", questionCount: 30, timeLimit: 0, streakBonus: false, livesMode: true },
};

// ── 状态 ──────────────────────────────────────────────
let currentMode = null;
let quizData = [];
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];
let streak = 0;
let maxStreak = 0;
let lives = 3;
let timerInterval = null;
let timeLeft = 0;
let questionStartTime = 0;
let totalTimeTaken = 0;

// ── DOM refs ──────────────────────────────────────────
const quizContainer   = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const submitButton    = document.getElementById("submit");
const retryButton     = document.getElementById("retry");
const showAnswerButton= document.getElementById("showAnswer");

// ── 工具函数 ──────────────────────────────────────────
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function stopTimer() {
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
}

// ── 模式选择界面 ───────────────────────────────────────
function showModeSelect() {
  stopTimer();
  submitButton.style.display = "none";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";

  quizContainer.innerHTML = `
    <div class="mode-select">
      <p class="mode-title">Choose a Mode</p>
      <div class="mode-grid">
        ${Object.entries(MODES).map(([key, m]) => `
          <div class="mode-card" onclick="startMode('${key}')">
            <div class="mode-label">${m.label}</div>
            <div class="mode-desc">${m.desc}</div>
          </div>
        `).join("")}
      </div>
      <div id="fetch-status" style="margin-top:14px;font-size:12px;color:#aaa;text-align:center;"></div>
    </div>
  `;

  fetchStatusEl = document.getElementById("fetch-status");
  if (dynamicFetched) {
    fetchStatusEl.textContent = `✓ Dynamic questions ready (${questionPool.length - localQuestions.length} loaded)`;
    fetchStatusEl.style.color = "#4caf50";
  } else {
    fetchStatusEl.textContent = "Fetching dynamic questions in background...";
  }
}

// ── 开始游戏 ──────────────────────────────────────────
function startMode(modeKey) {
  currentMode = MODES[modeKey];
  quizData = pickQuestions(currentMode.questionCount);
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  streak = 0;
  maxStreak = 0;
  lives = 3;
  totalTimeTaken = 0;

  submitButton.style.display = "inline-block";
  retryButton.style.display = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML = "";

  displayQuestion();
}

// ── 显示题目 ──────────────────────────────────────────
function displayQuestion() {
  stopTimer();
  const questionData = quizData[currentQuestion];
  questionStartTime = Date.now();

  const progress = `<div class="progress-bar"><div class="progress-fill" style="width:${(currentQuestion / quizData.length) * 100}%"></div></div>`;

  const meta = [];
  if (currentMode.livesMode) meta.push(`<span class="lives">${"❤️".repeat(lives)}</span>`);
  if (currentMode.streakBonus && streak > 1) meta.push(`<span class="streak-badge">🔥 ${streak} streak</span>`);
  meta.push(`<span class="q-counter">${currentQuestion + 1} / ${quizData.length}</span>`);

  const timerHtml = currentMode.timeLimit
    ? `<div class="timer-bar"><div class="timer-fill" id="timer-fill"></div></div><div id="timer-label" class="timer-label">${currentMode.timeLimit}s</div>`
    : "";

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  quizContainer.innerHTML = `
    ${progress}
    <div class="meta-row">${meta.join("")}</div>
    ${timerHtml}
    <div class="question">${currentQuestion + 1}. ${questionData.question}</div>
    <div class="options">
      ${shuffledOptions.map(o => `
        <label class="option">
          <input type="radio" name="quiz" value="${o}">
          ${o}
        </label>
      `).join("")}
    </div>
  `;

  if (currentMode.timeLimit) startTimer();
}

function startTimer() {
  timeLeft = currentMode.timeLimit;
  updateTimerUI();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerUI();
    if (timeLeft <= 0) {
      stopTimer();
      autoTimeOut();
    }
  }, 1000);
}

function updateTimerUI() {
  const fill = document.getElementById("timer-fill");
  const label = document.getElementById("timer-label");
  if (fill) fill.style.width = `${(timeLeft / currentMode.timeLimit) * 100}%`;
  if (fill) fill.style.background = timeLeft <= 5 ? "#e53935" : timeLeft <= 8 ? "#ff9800" : "#4caf50";
  if (label) label.textContent = `${timeLeft}s`;
}

function autoTimeOut() {
  // 时间到，算答错
  const q = quizData[currentQuestion];
  incorrectAnswers.push({ question: q.question, incorrectAnswer: "(Time out)", correctAnswer: q.answer });
  streak = 0;
  if (currentMode.livesMode) {
    lives--;
    if (lives <= 0) { displayResult(); return; }
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) displayQuestion();
  else displayResult();
}

// ── 检查答案 ──────────────────────────────────────────
function checkAnswer() {
  const selected = document.querySelector('input[name="quiz"]:checked');
  if (!selected) return;

  stopTimer();
  const timeTaken = (Date.now() - questionStartTime) / 1000;
  totalTimeTaken += timeTaken;
  const answer = selected.value;
  const q = quizData[currentQuestion];
  const correct = answer === q.answer;

  if (correct) {
    let pts = 10;
    if (currentMode.timeLimit) {
      // 速度加分：剩余时间越多分越高
      pts += Math.round((timeLeft / currentMode.timeLimit) * 10);
    }
    if (currentMode.streakBonus) {
      streak++;
      maxStreak = Math.max(maxStreak, streak);
      if (streak >= 3) pts += streak * 2; // 连击加成
    }
    score += pts;
  } else {
    incorrectAnswers.push({ question: q.question, incorrectAnswer: answer, correctAnswer: q.answer });
    streak = 0;
    if (currentMode.livesMode) {
      lives--;
      if (lives <= 0) {
        currentQuestion++;
        displayResult();
        return;
      }
    }
  }

  currentQuestion++;
  if (currentQuestion < quizData.length) displayQuestion();
  else displayResult();
}

// ── 结果页 ────────────────────────────────────────────
function displayResult() {
  stopTimer();
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = incorrectAnswers.length > 0 ? "inline-block" : "none";

  const correct = quizData.length - incorrectAnswers.length;
  const accuracy = Math.round((correct / quizData.length) * 100);
  const avgTime = (totalTimeTaken / quizData.length).toFixed(1);

  // 综合评分（满分100）
  let finalScore = Math.round((correct / quizData.length) * 70);
  if (currentMode.timeLimit) finalScore += Math.min(20, Math.round((1 - totalTimeTaken / (quizData.length * currentMode.timeLimit)) * 20));
  if (currentMode.streakBonus) finalScore += Math.min(10, maxStreak);
  finalScore = Math.min(100, finalScore);

  const grade = finalScore >= 90 ? "S" : finalScore >= 75 ? "A" : finalScore >= 60 ? "B" : finalScore >= 45 ? "C" : "D";
  const gradeColor = { S: "#ffd700", A: "#4caf50", B: "#2196f3", C: "#ff9800", D: "#e53935" }[grade];

  let extras = "";
  if (currentMode.streakBonus) extras += `<div class="stat-item">🔥 Best Streak <strong>${maxStreak}</strong></div>`;
  if (currentMode.livesMode) extras += `<div class="stat-item">❤️ Lives Left <strong>${Math.max(0, lives)}</strong></div>`;
  if (currentMode.timeLimit || true) extras += `<div class="stat-item">⏱ Avg Time <strong>${avgTime}s</strong></div>`;

  resultContainer.innerHTML = `
    <div class="result-card">
      <div class="grade-badge" style="color:${gradeColor}">${grade}</div>
      <div class="result-score">${correct} / ${quizData.length} correct</div>
      <div class="result-accuracy">Accuracy: ${accuracy}%</div>
      <div class="stats-row">
        ${extras}
        <div class="stat-item">🏆 Score <strong>${score}</strong></div>
      </div>
    </div>
  `;
}

function retryQuiz() {
  quizContainer.style.display = "block";
  showModeSelect();
}

function showAnswer() {
  quizContainer.style.display = "none";
  submitButton.style.display = "none";
  retryButton.style.display = "inline-block";
  showAnswerButton.style.display = "none";

  const items = incorrectAnswers.map(a => `
    <div class="answer-item">
      <p><strong>Q:</strong> ${a.question}</p>
      <p class="wrong-ans">✗ Your answer: ${a.incorrectAnswer}</p>
      <p class="correct-ans">✓ Correct: ${a.correctAnswer}</p>
    </div>
  `).join("");

  resultContainer.innerHTML = `
    <div class="answer-review">
      <p style="margin-bottom:12px;font-weight:600;">Review Incorrect Answers</p>
      ${items || "<p>All correct! 🎉</p>"}
    </div>
  `;
}

// ── 事件绑定 ──────────────────────────────────────────
submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

// ── 启动 ──────────────────────────────────────────────
fetchDynamicQuestions(); // 后台静默 fetch
showModeSelect();        // 立刻显示模式选择
