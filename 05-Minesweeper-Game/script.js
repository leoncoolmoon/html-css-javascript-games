let board = [];
let rows = 8;
let columns = 8;
let flagCount = 0;
let minesCount = 10;
let minesLocation = []; // "2-2", "3-4", "2-1"
let tileSize = 50;
let tilesClicked = 0; //goal to click all tiles except the ones containing mines
let flagEnabled = false;

let gameOver = false;

let timer;
let timeElapsed = 0;
let firstClick = false;
window.onload = function () {
  document.getElementById("settings-button").addEventListener("click", showSettings);
  document.getElementById("apply-settings").addEventListener("click", applySettings);
  document.getElementById("cancel-settings").addEventListener("click", hideSettings);
  startGame();
};

function setMines() {
  // minesLocation.push("2-2");
  // minesLocation.push("2-3");
  // minesLocation.push("5-6");
  // minesLocation.push("3-4");
  // minesLocation.push("1-1");

  let minesLeft = minesCount;
  while (minesLeft > 0) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);
    let id = r.toString() + "-" + c.toString();

    if (!minesLocation.includes(id)) {
      minesLocation.push(id);
      minesLeft -= 1;
    }
  }
}

function startGame() {
  // 从URL中获取参数
  rows = parseInt(getParameterByName('rows')) || 8;
  columns = parseInt(getParameterByName('columns')) || 8;
  minesCount = parseInt(getParameterByName('mines')) || 10;

  board = [];
  minesLocation = [];  // 清空地雷位置
  flagCount = 0;
  tilesClicked = 0;
  gameOver = false;
  firstClick = false;
  timeElapsed = 0;
  document.getElementById("timer").innerText = "Time: 0s";
  document.getElementById("mines-count").innerText = minesCount;
  document.getElementById("flag-button").innerText = "🚩";
  document.getElementById("flag-button").style.backgroundColor = "lightgray";
  document.getElementById("flag-button").addEventListener("click", setFlag);

  let boardElement = document.getElementById("board");
  boardElement.innerHTML = "";
  boardElement.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  boardElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  boardElement.style.width = `${columns * tileSize}px`;
  boardElement.style.height = `${rows * tileSize}px`;
  clearInterval(timer);
  setMines();

  //populate our board
  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      //<div id="0-0"></div>
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.addEventListener("click", clickTile);
      tile.addEventListener("dblclick", groupClick);
      tile.addEventListener("contextmenu", addFlag);
      document.getElementById("board").append(tile);
      row.push(tile);
    }
    board.push(row);
  }

  console.log(board);
}
function addFlag(e) {
  e.preventDefault();

  if (gameOver || this.classList.contains("tile-clicked")) {
    return;
  }

  let tile = this;

  if (tile.innerText == "") {
    tile.innerText = "🚩";
    flagCount = flagCount + 1;
  } else if (tile.innerText == "🚩") {
    tile.innerText = "";
    flagCount = flagCount - 1;
  }
  document.getElementById("flag-button").innerText = "🚩" + (flagCount == 0 ? "" : flagCount);
  return;
}
function setFlag() {
  if (flagEnabled) {
    flagEnabled = false;
    document.getElementById("flag-button").style.backgroundColor = "lightgray";
  } else {
    flagEnabled = true;
    document.getElementById("flag-button").style.backgroundColor = "darkgray";
  }
}
function groupClick() {
  let r = parseInt(this.id.split("-")[0]);
  let c = parseInt(this.id.split("-")[1]);
  for (let i = r - 1; i <= r + 1; i++) {
    for (let j = c - 1; j <= c + 1; j++) {
      if (i >= 0 && i < rows && j >= 0 && j < columns) {
        board[i][j].click();
      }
    }
  }
}
function clickTile() {
  if (gameOver || this.classList.contains("tile-clicked")) {
    return;
  }

  let tile = this;
  if (!firstClick) {
    startTimer();
    firstClick = true;
  }
  if (flagEnabled) {
    if (tile.innerText == "") {
      tile.innerText = "🚩";
      flagCount = flagCount + 1;
    } else if (tile.innerText == "🚩") {
      tile.innerText = "";
      flagCount = flagCount - 1;
    }
    document.getElementById("flag-button").innerText = "🚩" + (flagCount == 0 ? "" : flagCount);
    return;
  }
  if (tile.innerText == "🚩") {
    return;
  }

  if (minesLocation.includes(tile.id)) {
    // alert("GAME OVER");
    gameOver = true;
    revealMines();
    clearInterval(timer);
    return;
  }

  let coords = tile.id.split("-"); // "0-0" -> ["0", "0"]
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  checkMine(r, c);
}

function revealMines() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = board[r][c];
      if (minesLocation.includes(tile.id)) {
        tile.innerText = "💣";
        tile.style.backgroundColor = "red";
      }
    }
  }
}

function checkMine(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return;
  }
  if (board[r][c].classList.contains("tile-clicked")) {
    return;
  }
  // 如果方块被标记为旗帜，则移除旗帜并减少flagCount
  if (board[r][c].innerText == "🚩") {
    board[r][c].innerText = "";
    flagCount -= 1;
    document.getElementById("flag-button").innerText = "🚩" + (flagCount == 0 ? "" : flagCount);
  }

  board[r][c].classList.add("tile-clicked");
  tilesClicked += 1;

  let minesFound = 0;

  //top 3
  minesFound += checkTile(r - 1, c - 1); //top left
  minesFound += checkTile(r - 1, c); //top
  minesFound += checkTile(r - 1, c + 1); //top right

  //left and right
  minesFound += checkTile(r, c - 1); //left
  minesFound += checkTile(r, c + 1); //right

  //bottom 3
  minesFound += checkTile(r + 1, c - 1); //bottom left
  minesFound += checkTile(r + 1, c); //bottom
  minesFound += checkTile(r + 1, c + 1); //bottom right

  if (minesFound > 0) {
    board[r][c].innerText = minesFound;
    board[r][c].classList.add("x" + minesFound.toString());
  } else {
    board[r][c].innerText = "";

    //top 3
    checkMine(r - 1, c - 1); //top left
    checkMine(r - 1, c); //top
    checkMine(r - 1, c + 1); //top right

    //left and right
    checkMine(r, c - 1); //left
    checkMine(r, c + 1); //right

    //bottom 3
    checkMine(r + 1, c - 1); //bottom left
    checkMine(r + 1, c); //bottom
    checkMine(r + 1, c + 1); //bottom right
  }

  if (tilesClicked == rows * columns - minesCount) {
    document.getElementById("mines-count").innerText = "Cleared";
    gameOver = true;
    clearInterval(timer);
  }
}

function checkTile(r, c) {
  if (r < 0 || r >= rows || c < 0 || c >= columns) {
    return 0;
  }
  if (minesLocation.includes(r.toString() + "-" + c.toString())) {
    return 1;
  }
  return 0;
}

function startTimer() {
  timer = setInterval(function () {
    timeElapsed += 1;
    document.getElementById("timer").innerText = "Time: " + timeElapsed + "s";
  }, 1000);
}

function showSettings() {
  document.getElementById("settings-div").style.display = "block";
  // 从URL中获取参数
  rows = parseInt(getParameterByName('rows')) || 8;
  columns = parseInt(getParameterByName('columns')) || 8;
  minesCount = parseInt(getParameterByName('mines')) || 10;

  document.getElementById("rows-input").value = rows;
  document.getElementById("columns-input").value = columns;
  document.getElementById("mines-input").value = minesCount;
}
function hideSettings() {
  document.getElementById("settings-div").style.display = "none";
}

function applySettings() {
  rows = parseInt(document.getElementById("rows-input").value);
  columns = parseInt(document.getElementById("columns-input").value);
  minesCount = parseInt(document.getElementById("mines-input").value);

  if (minesCount >= rows * columns) {
    alert("Too many mines! Adjust the numbers.");
    return;
  }
  // 移除现有的 `board` DOM 元素
  let boardElement = document.getElementById("board");
  boardElement.innerHTML = ""; // 清空现有的所有子元素
  hideSettings();
  //startGame();
  // 更新URL并重定向
  let newUrl = `${window.location.pathname}?rows=${rows}&columns=${columns}&mines=${minesCount}`;
  window.location.href = newUrl;
}
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}