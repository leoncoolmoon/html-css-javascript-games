// ── 配置 ──────────────────────────────────────────────────────────────────────
const WORKER_URL = "https://falling-hill-4472.leoncoolmoon.workers.dev";
const TOPICS = ["general knowledge", "science and technology", "world history", "world geography"];

// ── i18n ──────────────────────────────────────────────────────────────────────
const uiLang = (navigator.language || "en").toLowerCase().startsWith("zh") ? "zh" : "en";

const T = {
  en: {
    title: "Quiz App",
    subtitle: "Choose a mode to begin",
    chooseMode: "Choose a Mode",
    fetchingDynamic: "Fetching AI questions in background…",
    dynamicReady: (n, topic) => `✓ ${n} AI questions ready (${topic})`,
    localOnly: "⚠ Using local questions only",
    disclaimer: "⚠ AI-generated questions may contain errors. Results are for entertainment only.",
    submit: "Submit",
    playAgain: "Play Again",
    showAnswers: "Show Answers",
    correct: "Correct!",
    wrong: a => `Wrong. Correct: ${a}`,
    timeout: "Time's up!",
    timeoutCorrect: "(Time out)",
    of: "of",
    accuracy: "Accuracy",
    avgTime: "Avg Time",
    bestStreak: "Best Streak",
    livesLeft: "Lives Left",
    scoreLabel: "Score",
    reviewTitle: "Review Incorrect Answers",
    allCorrect: "All correct! 🎉",
    yourAnswer: "Your answer",
    correctAnswer: "Correct",
    modes: {
      classic:  { label: "Classic",     desc: "Answer all 20 questions, see how many you got right." },
      timed:    { label: "⏱ Timed",     desc: "15 seconds per question. Bonus points for speed!" },
      streak:   { label: "🔥 Streak",   desc: "Build a streak for bonus. One wrong breaks it!" },
      survival: { label: "❤️ Survival", desc: "3 lives only. 30 questions. Don't run out!" },
    },
    grades: { S: "Flawless!", A: "Excellent!", B: "Good job!", C: "Not bad!", D: "Keep trying!" },
  },
  zh: {
    title: "知识问答",
    subtitle: "选择模式开始游戏",
    chooseMode: "选择游戏模式",
    fetchingDynamic: "后台加载 AI 题目中…",
    dynamicReady: (n, topic) => `✓ 已加载 ${n} 道 AI 题目（${topic}）`,
    localOnly: "⚠ 仅使用本地题目",
    disclaimer: "⚠ AI 生成的题目可能包含错误，结果仅供娱乐参考。",
    submit: "提交答案",
    playAgain: "再来一局",
    showAnswers: "查看解析",
    correct: "正确！",
    wrong: a => `错误。正确答案：${a}`,
    timeout: "时间到！",
    timeoutCorrect: "（超时）",
    of: "/",
    accuracy: "正确率",
    avgTime: "平均用时",
    bestStreak: "最高连击",
    livesLeft: "剩余生命",
    scoreLabel: "得分",
    reviewTitle: "错题回顾",
    allCorrect: "全部答对！🎉",
    yourAnswer: "你的答案",
    correctAnswer: "正确答案",
    modes: {
      classic:  { label: "经典模式",   desc: "共 20 题，看你能答对几道。" },
      timed:    { label: "⏱ 限时模式", desc: "每题 15 秒，答得快加分高！" },
      streak:   { label: "🔥 连击模式", desc: "连续答对有加成，答错连击清零！" },
      survival: { label: "❤️ 生存模式", desc: "仅有 3 条命，30 题坚持到最后！" },
    },
    grades: { S: "完美！", A: "优秀！", B: "良好！", C: "还不错！", D: "继续加油！" },
  },
}[uiLang];

// ── 本地题库（兜底） ─────────────────────────────────────────────────────
const localQuestionsEn = [
  { question: "What is the capital of France?",             options: ["Paris","London","Berlin","Madrid"],                          answer: "Paris" },
  { question: "What is the largest planet in our solar system?", options: ["Mars","Saturn","Jupiter","Neptune"],                   answer: "Jupiter" },
  { question: "Which country won the FIFA World Cup in 2018?",   options: ["Brazil","Germany","France","Argentina"],               answer: "France" },
  { question: "What is the tallest mountain in the world?",      options: ["Mount Everest","K2","Kangchenjunga","Makalu"],         answer: "Mount Everest" },
  { question: "Which is the largest ocean on Earth?",            options: ["Pacific Ocean","Indian Ocean","Atlantic Ocean","Arctic Ocean"], answer: "Pacific Ocean" },
  { question: "What is the chemical symbol for gold?",           options: ["Au","Ag","Cu","Fe"],                                  answer: "Au" },
  { question: "Who painted the Mona Lisa?",                      options: ["Picasso","Van Gogh","Leonardo da Vinci","Michelangelo"], answer: "Leonardo da Vinci" },
  { question: "Which planet is known as the Red Planet?",        options: ["Mars","Venus","Mercury","Uranus"],                    answer: "Mars" },
  { question: "What is the largest species of shark?",           options: ["Great White","Whale Shark","Tiger Shark","Hammerhead"], answer: "Whale Shark" },
  { question: "Which animal is known as the King of the Jungle?", options: ["Lion","Tiger","Elephant","Giraffe"],                 answer: "Lion" },
  { question: "What is the capital of Japan?",                   options: ["Tokyo","Kyoto","Osaka","Nagoya"],                     answer: "Tokyo" },
  { question: "Which element has the atomic number 1?",          options: ["Helium","Oxygen","Hydrogen","Carbon"],                answer: "Hydrogen" },
  { question: "Who wrote 'Romeo and Juliet'?",                   options: ["Dickens","Shakespeare","Twain","Tolstoy"],            answer: "Shakespeare" },
  { question: "What is the smallest country in the world?",      options: ["Monaco","San Marino","Liechtenstein","Vatican City"], answer: "Vatican City" },
  { question: "Which planet is known for its rings?",            options: ["Venus","Saturn","Jupiter","Neptune"],                 answer: "Saturn" },
  { question: "Who discovered penicillin?",                      options: ["Marie Curie","Alexander Fleming","Pasteur","Newton"], answer: "Alexander Fleming" },
  { question: "Which continent is the Sahara Desert on?",        options: ["Asia","Africa","Australia","Europe"],                 answer: "Africa" },
  { question: "What is the main ingredient in guacamole?",       options: ["Tomato","Avocado","Onion","Pepper"],                  answer: "Avocado" },
  { question: "Which country is the Land of the Rising Sun?",    options: ["China","South Korea","Thailand","Japan"],             answer: "Japan" },
  { question: "What is the speed of light?",                     options: ["300,000 km/s","150,000 km/s","450,000 km/s","100,000 km/s"], answer: "300,000 km/s" },
];

const localQuestionsZh = [
  { question: "法国的首都是哪里？", options: ["巴黎", "伦敦", "柏林", "马德里"], answer: "巴黎" },
  { question: "太阳系中最大的行星是哪一颗？", options: ["火星", "土星", "木星", "海王星"], answer: "木星" },
  { question: "哪个国家赢得了2018年FIFA世界杯？", options: ["巴西", "德国", "法国", "阿根廷"], answer: "法国" },
  { question: "世界上最高的山峰是哪一座？", options: ["珠穆朗玛峰", "乔戈里峰", "干城章嘉峰", "马卡鲁峰"], answer: "珠穆朗玛峰" },
  { question: "地球上最大的海洋是哪个？", options: ["太平洋", "印度洋", "大西洋", "北冰洋"], answer: "太平洋" },
  { question: "金的化学符号是什么？", options: ["Au", "Ag", "Cu", "Fe"], answer: "Au" },
  { question: "《蒙娜丽莎》是谁画的？", options: ["毕加索", "梵高", "列奥纳多·达·芬奇", "米开朗基罗"], answer: "列奥纳多·达·芬奇" },
  { question: "哪颗行星被称为红色星球？", options: ["火星", "金星", "水星", "天王星"], answer: "火星" },
  { question: "体型最大的鲨鱼是什么？", options: ["大白鲨", "鲸鲨", "虎鲨", "双髻鲨"], answer: "鲸鲨" },
  { question: "哪种动物被称为丛林之王？", options: ["狮子", "老虎", "大象", "长颈鹿"], answer: "狮子" },
  { question: "日本的首都是哪里？", options: ["东京", "京都", "大阪", "名古屋"], answer: "东京" },
  { question: "哪种元素的原子序数是1？", options: ["氦", "氧", "氢", "碳"], answer: "氢" },
  { question: "谁写了《罗密欧与朱丽叶》？", options: ["狄更斯", "莎士比亚", "吐温", "托尔斯泰"], answer: "莎士比亚" },
  { question: "世界上最小的国家是哪个？", options: ["摩纳哥", "圣马力诺", "列支敦士登", "梵蒂冈"], answer: "梵蒂冈" },
  { question: "哪颗行星以其环而闻名？", options: ["金星", "土星", "木星", "海王星"], answer: "土星" },
  { question: "谁发现了青霉素？", options: ["玛丽·居里", "亚历山大·弗莱明", "巴斯德", "牛顿"], answer: "亚历山大·弗莱明" },
  { question: "撒哈拉沙漠在哪块大陆上？", options: ["亚洲", "非洲", "澳大利亚", "欧洲"], answer: "非洲" },
  { question: "牛油果酱（Guacamole）的主要成分是什么？", options: ["西红柿", "牛油果", "洋葱", "胡椒"], answer: "牛油果" },
  { question: "哪个国家被称为“旭日之国”？", options: ["中国", "韩国", "泰国", "日本"], answer: "日本" },
  { question: "光速是多少？", options: ["300,000 公里/秒", "150,000 公里/秒", "450,000 公里/秒", "100,000 公里/秒"], answer: "300,000 公里/秒" },
];

const localQuestions = uiLang === "zh" ? localQuestionsZh : localQuestionsEn;

// ── 题库状态 ──────────────────────────────────────────────────────────────────
let dynamicPool  = [];   // AI 拉取的题目
let usedDynamic  = new Set();
let usedLocal    = new Set();
let dynamicFetched = false;
let fetchStatusEl  = null;

function mergeIntoDynamic(newQs) {
  const existing = new Set(dynamicPool.map(q => q.question.trim().toLowerCase()));
  let added = 0;
  for (const q of newQs) {
    const key = q.question.trim().toLowerCase();
    if (!existing.has(key)) { dynamicPool.push(q); existing.add(key); added++; }
  }
  return added;
}

async function fetchDynamicQuestions() {
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  try {
    const res  = await fetch(`${WORKER_URL}/quiz?topic=${encodeURIComponent(topic)}&lang=${navigator.language}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (json.data && Array.isArray(json.data)) {
      const added = mergeIntoDynamic(json.data);
      dynamicFetched = true;
      if (fetchStatusEl) {
        fetchStatusEl.textContent = T.dynamicReady(added, topic);
        fetchStatusEl.style.color = "var(--clr-ok)";
      }
      // 如果游戏正在进行中，且当前还有未答题目，尝试用 dynamic 题目热替换后续题目
      if (quizData && currentQuestion < quizData.length - 1) {
        const remainingCount = quizData.length - 1 - currentQuestion;
        const newQs = pickQuestions(remainingCount);
        quizData.splice(currentQuestion + 1, remainingCount, ...newQs);
      }
    }
  } catch (_) {
    if (fetchStatusEl) {
      fetchStatusEl.textContent = T.localOnly;
      fetchStatusEl.style.color = "var(--clr-warn)";
    }
  }
}

// ── 抽题逻辑：优先 dynamic，不够用 local 补足 ─────────────────────────
function pickQuestions(count) {
  // 1. 获取可用的 dynamic 题目
  let avDynamic = dynamicPool.filter(q => !usedDynamic.has(q.question));

  // 2. 如果 dynamic 已经全部用过且我们还是不够，重置 dynamic 使用记录
  if (avDynamic.length < count && dynamicPool.length >= count) {
    usedDynamic.clear();
    avDynamic = [...dynamicPool];
  }

  // 3. 抽选题目
  shuffleArray(avDynamic);
  const dynPicked = avDynamic.slice(0, count);
  dynPicked.forEach(q => usedDynamic.add(q.question));

  // 4. 如果 dynamic 还是不够，用 local 补足
  let result = [...dynPicked];
  if (result.length < count) {
    let avLocal = localQuestions.filter(q => !usedLocal.has(q.question));
    if (avLocal.length < (count - result.length)) {
      usedLocal.clear();
      avLocal = [...localQuestions];
    }
    shuffleArray(avLocal);
    const locPicked = avLocal.slice(0, count - result.length);
    locPicked.forEach(q => usedLocal.add(q.question));
    result = [...result, ...locPicked];
    shuffleArray(result);
  }

  return result;
}

// ── 游戏模式 ──────────────────────────────────────────────────────────────────
const MODES = {
  classic:  { questionCount: 20, timeLimit: 0,  streakBonus: false, livesMode: false },
  timed:    { questionCount: 20, timeLimit: 15, streakBonus: false, livesMode: false },
  streak:   { questionCount: 20, timeLimit: 0,  streakBonus: true,  livesMode: false },
  survival: { questionCount: 30, timeLimit: 0,  streakBonus: false, livesMode: true  },
};

// ── 游戏状态 ──────────────────────────────────────────────────────────────────
let currentMode, quizData, currentQuestion, score, incorrectAnswers;
let streak, maxStreak, lives, timerInterval, timeLeft, questionStartTime, totalTimeTaken;

// ── DOM ───────────────────────────────────────────────────────────────────────
const quizContainer    = document.getElementById("quiz");
const resultContainer  = document.getElementById("result");
const submitButton     = document.getElementById("submit");
const retryButton      = document.getElementById("retry");
const showAnswerButton = document.getElementById("showAnswer");
const subtitleEl       = document.querySelector("h4");
const titleEl          = document.querySelector("h1");

titleEl.textContent    = T.title;
subtitleEl.textContent = T.subtitle;
submitButton.textContent    = T.submit;
retryButton.textContent     = T.playAgain;
showAnswerButton.textContent= T.showAnswers;

// ── 工具 ──────────────────────────────────────────────────────────────────────
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
function stopTimer() { if (timerInterval) { clearInterval(timerInterval); timerInterval = null; } }

// ── 模式选择 ──────────────────────────────────────────────────────────────────
function showModeSelect() {
  stopTimer();
  submitButton.style.display = "none";
  retryButton.style.display  = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML  = "";

  quizContainer.innerHTML = `
    <div class="mode-select">
      <p class="mode-title">${T.chooseMode}</p>
      <div class="mode-grid">
        ${Object.entries(MODES).map(([key]) => `
          <div class="mode-card" onclick="startMode('${key}')">
            <div class="mode-label">${T.modes[key].label}</div>
            <div class="mode-desc">${T.modes[key].desc}</div>
          </div>
        `).join("")}
      </div>
      <div class="disclaimer">${T.disclaimer}</div>
      <div id="fetch-status" class="fetch-status"></div>
    </div>
  `;

  fetchStatusEl = document.getElementById("fetch-status");
  fetchStatusEl.textContent = dynamicFetched
    ? T.dynamicReady(dynamicPool.length, "")
    : T.fetchingDynamic;
  fetchStatusEl.style.color = dynamicFetched ? "var(--clr-ok)" : "";
}

// ── 开始游戏 ──────────────────────────────────────────────────────────────────
function startMode(modeKey) {
  currentMode      = { key: modeKey, ...MODES[modeKey] };
  quizData         = pickQuestions(currentMode.questionCount);
  currentQuestion  = 0; score = 0; incorrectAnswers = [];
  streak = 0; maxStreak = 0; lives = 3; totalTimeTaken = 0;

  submitButton.style.display     = "inline-block";
  retryButton.style.display      = "none";
  showAnswerButton.style.display = "none";
  resultContainer.innerHTML      = "";
  displayQuestion();
}

// ── 显示题目 ──────────────────────────────────────────────────────────────────
function displayQuestion() {
  stopTimer();
  const q = quizData[currentQuestion];
  questionStartTime = Date.now();

  const pct      = (currentQuestion / quizData.length) * 100;
  const metaParts = [];
  if (currentMode.livesMode)   metaParts.push(`<span class="lives">${"❤️".repeat(lives)}</span>`);
  if (currentMode.streakBonus && streak > 1) metaParts.push(`<span class="streak-badge">🔥 ${streak}x</span>`);
  metaParts.push(`<span class="q-counter">${currentQuestion + 1} ${T.of} ${quizData.length}</span>`);

  const shuffled = [...q.options]; shuffleArray(shuffled);

  quizContainer.innerHTML = `
    <div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>
    <div class="meta-row">${metaParts.join("")}</div>
    ${currentMode.timeLimit ? `<div class="timer-bar"><div class="timer-fill" id="timer-fill"></div></div><div id="timer-label" class="timer-label">${currentMode.timeLimit}s</div>` : ""}
    <div class="question">${currentQuestion + 1}. ${q.question}</div>
    <div class="options">
      ${shuffled.map(o => `<label class="option"><input type="radio" name="quiz" value="${o}">${o}</label>`).join("")}
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
    if (timeLeft <= 0) { stopTimer(); autoTimeOut(); }
  }, 1000);
}

function updateTimerUI() {
  const fill  = document.getElementById("timer-fill");
  const label = document.getElementById("timer-label");
  if (fill)  { fill.style.width = `${(timeLeft / currentMode.timeLimit) * 100}%`; fill.style.background = timeLeft <= 5 ? "var(--clr-wrong)" : timeLeft <= 8 ? "var(--clr-warn)" : "var(--clr-ok)"; }
  if (label) label.textContent = `${timeLeft}s`;
}

function autoTimeOut() {
  const q = quizData[currentQuestion];
  incorrectAnswers.push({ question: q.question, incorrectAnswer: T.timeoutCorrect, correctAnswer: q.answer });
  streak = 0;
  if (currentMode.livesMode && --lives <= 0) { displayResult(); return; }
  if (++currentQuestion < quizData.length) displayQuestion(); else displayResult();
}

// ── 检查答案 ──────────────────────────────────────────────────────────────────
function checkAnswer() {
  const sel = document.querySelector('input[name="quiz"]:checked');
  if (!sel) return;
  stopTimer();
  totalTimeTaken += (Date.now() - questionStartTime) / 1000;
  const q       = quizData[currentQuestion];
  const correct = sel.value === q.answer;

  if (correct) {
    let pts = 10;
    if (currentMode.timeLimit)   pts += Math.round((timeLeft / currentMode.timeLimit) * 10);
    if (currentMode.streakBonus) { streak++; maxStreak = Math.max(maxStreak, streak); if (streak >= 3) pts += streak * 2; }
    score += pts;
  } else {
    incorrectAnswers.push({ question: q.question, incorrectAnswer: sel.value, correctAnswer: q.answer });
    streak = 0;
    if (currentMode.livesMode && --lives <= 0) { currentQuestion++; displayResult(); return; }
  }
  if (++currentQuestion < quizData.length) displayQuestion(); else displayResult();
}

// ── 结果页 ────────────────────────────────────────────────────────────────────
function displayResult() {
  stopTimer();
  quizContainer.style.display    = "none";
  submitButton.style.display     = "none";
  retryButton.style.display      = "inline-block";
  showAnswerButton.style.display = incorrectAnswers.length > 0 ? "inline-block" : "none";

  const correct  = quizData.length - incorrectAnswers.length;
  const accuracy = Math.round((correct / quizData.length) * 100);
  const avgTime  = (totalTimeTaken / quizData.length).toFixed(1);

  let finalScore = Math.round((correct / quizData.length) * 70);
  if (currentMode.timeLimit)   finalScore += Math.min(20, Math.round((1 - totalTimeTaken / (quizData.length * currentMode.timeLimit)) * 20));
  if (currentMode.streakBonus) finalScore += Math.min(10, maxStreak);
  finalScore = Math.min(100, finalScore);

  const grade      = finalScore >= 90 ? "S" : finalScore >= 75 ? "A" : finalScore >= 60 ? "B" : finalScore >= 45 ? "C" : "D";
  const gradeColor = { S:"#ffd700", A:"var(--clr-ok)", B:"#2196f3", C:"var(--clr-warn)", D:"var(--clr-wrong)" }[grade];

  let extras = "";
  if (currentMode.streakBonus) extras += `<div class="stat-item">🔥 ${T.bestStreak}<strong>${maxStreak}</strong></div>`;
  if (currentMode.livesMode)   extras += `<div class="stat-item">❤️ ${T.livesLeft}<strong>${Math.max(0,lives)}</strong></div>`;
  extras += `<div class="stat-item">⏱ ${T.avgTime}<strong>${avgTime}s</strong></div>`;

  resultContainer.innerHTML = `
    <div class="result-card">
      <div class="grade-badge" style="color:${gradeColor}">${grade}</div>
      <div class="grade-msg">${T.grades[grade]}</div>
      <div class="result-score">${correct} ${T.of} ${quizData.length}</div>
      <div class="result-accuracy">${T.accuracy}: ${accuracy}%</div>
      <div class="stats-row">
        ${extras}
        <div class="stat-item">🏆 ${T.scoreLabel}<strong>${score}</strong></div>
      </div>
    </div>
  `;
}

function retryQuiz() {
  quizContainer.style.display = "block";
  showModeSelect();
}

function showAnswer() {
  quizContainer.style.display    = "none";
  submitButton.style.display     = "none";
  retryButton.style.display      = "inline-block";
  showAnswerButton.style.display = "none";

  const items = incorrectAnswers.map(a => `
    <div class="answer-item">
      <p><strong>Q:</strong> ${a.question}</p>
      <p class="wrong-ans">✗ ${T.yourAnswer}: ${a.incorrectAnswer}</p>
      <p class="correct-ans">✓ ${T.correctAnswer}: ${a.correctAnswer}</p>
    </div>
  `).join("");

  resultContainer.innerHTML = `
    <div class="answer-review">
      <p style="margin-bottom:12px;font-weight:600;">${T.reviewTitle}</p>
      ${items || `<p>${T.allCorrect}</p>`}
    </div>
  `;
}

// ── 事件 ──────────────────────────────────────────────────────────────────────
submitButton.addEventListener("click", checkAnswer);
retryButton.addEventListener("click", retryQuiz);
showAnswerButton.addEventListener("click", showAnswer);

// ── 启动 ──────────────────────────────────────────────────────────────────────
fetchDynamicQuestions();
showModeSelect();
