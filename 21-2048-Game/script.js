document.addEventListener('DOMContentLoaded', () => {
  const gridDisplay = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const resultDisplay = document.getElementById('result');
  const newGameButton = document.getElementById('new-game-button');
  const width = 4;
  let squares = [];
  let score = 0;
  let isGameOver = false;

  // Create the playing board
  function createBoard() {
    gridDisplay.innerHTML = '';
    squares = [];
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement('div');
      square.innerHTML = '';
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    addTile();
    addTile();
    updateBoard();
  }

  // Add a new tile (2 or 4) to a random empty spot
  function addTile() {
    const emptySquares = squares.filter(s => s.innerHTML === '');
    if (emptySquares.length > 0) {
      const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
      randomSquare.innerHTML = Math.random() < 0.9 ? 2 : 4;
      checkForGameOver();
    }
  }

  // Update visual appearance of the board
  function updateBoard() {
    squares.forEach(square => {
      const value = square.innerHTML;
      square.className = ''; // Reset classes
      if (value !== '') {
        square.classList.add(`tile-${value}`);
      }
      // Hide 0s or empty strings
      if (value === '0' || value === '') {
        square.innerHTML = '';
      }
    });
    scoreDisplay.innerHTML = score;
  }

  // Handle row/column movement logic
  function slide(row) {
    let arr = row.filter(val => val);
    let missing = width - arr.length;
    let zeros = Array(missing).fill(0);
    return arr.concat(zeros);
  }

  function combine(row) {
    for (let i = 0; i < width - 1; i++) {
      if (row[i] !== 0 && row[i] === row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
        score += row[i];
        if (row[i] === 2048) {
          resultDisplay.innerHTML = 'You WIN!';
        }
      }
    }
    return row;
  }

  function move(direction) {
    if (isGameOver) return;
    let moved = false;
    const oldBoard = squares.map(s => s.innerHTML);

    if (direction === 'left' || direction === 'right') {
      for (let i = 0; i < width * width; i += width) {
        let row = [
          parseInt(squares[i].innerHTML) || 0,
          parseInt(squares[i + 1].innerHTML) || 0,
          parseInt(squares[i + 2].innerHTML) || 0,
          parseInt(squares[i + 3].innerHTML) || 0
        ];
        if (direction === 'right') row.reverse();

        row = slide(row);
        row = combine(row);
        row = slide(row);

        if (direction === 'right') row.reverse();

        squares[i].innerHTML = row[0] || '';
        squares[i + 1].innerHTML = row[1] || '';
        squares[i + 2].innerHTML = row[2] || '';
        squares[i + 3].innerHTML = row[3] || '';
      }
    } else {
      for (let i = 0; i < width; i++) {
        let column = [
          parseInt(squares[i].innerHTML) || 0,
          parseInt(squares[i + width].innerHTML) || 0,
          parseInt(squares[i + width * 2].innerHTML) || 0,
          parseInt(squares[i + width * 3].innerHTML) || 0
        ];
        if (direction === 'down') column.reverse();

        column = slide(column);
        column = combine(column);
        column = slide(column);

        if (direction === 'down') column.reverse();

        squares[i].innerHTML = column[0] || '';
        squares[i + width].innerHTML = column[1] || '';
        squares[i + width * 2].innerHTML = column[2] || '';
        squares[i + width * 3].innerHTML = column[3] || '';
      }
    }

    const newBoard = squares.map(s => s.innerHTML);
    if (JSON.stringify(oldBoard) !== JSON.stringify(newBoard)) {
      addTile();
      updateBoard();
    }
  }

  function checkForGameOver() {
    // Check for empty spots
    if (squares.some(s => s.innerHTML === '')) return;

    // Check for possible merges
    for (let i = 0; i < width * width; i++) {
      const val = parseInt(squares[i].innerHTML);
      // Check right
      if (i % width < width - 1 && val === parseInt(squares[i + 1].innerHTML)) return;
      // Check down
      if (i < width * (width - 1) && val === parseInt(squares[i + width].innerHTML)) return;
    }

    isGameOver = true;
    resultDisplay.innerHTML = 'Game Over!';
    if (typeof stopVirtualKeyboard === 'function') stopVirtualKeyboard();
  }

  function restartGame() {
    score = 0;
    isGameOver = false;
    resultDisplay.innerHTML = '';
    if (typeof resumeVirtualKeyboard === 'function') resumeVirtualKeyboard();
    createBoard();
  }

  // Key bindings
  function control(e) {
    if (e.keyCode === 37) move('left');
    else if (e.keyCode === 38) move('up');
    else if (e.keyCode === 39) move('right');
    else if (e.keyCode === 40) move('down');
    else if (e.keyCode === 13) restartGame();
  }

  document.addEventListener('keydown', control);
  newGameButton.addEventListener('click', restartGame);

  // Global functions for virtual keyboard/gravity sensor in ctrl.js
  window.keyLeft = () => move('left');
  window.keyRight = () => move('right');
  window.keyUp = () => move('up');
  window.keyDown = () => move('down');

  createBoard();
});
