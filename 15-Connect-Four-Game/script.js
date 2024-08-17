// DOM Variables

var buttons
var reset = document.getElementById("reset-btn");
var playerType = document.getElementById("player-type");
var updateGridBTN = document.getElementById("update-grid");
var widthInput = document.getElementById("grid-width");
var heightInput = document.getElementById("grid-height");
var winConditionInput = document.getElementById("win-condition");
var player = 1;
// Game Flow Variables

var columns = 10;
var rows = 10;
var winCount = 4;
var filledGrid;
var playerNumber = 1; // Initially player - 1 gets to start his/her turn
var availableMoves = [];
initGame(10, 10, 5); // (columns, rows, winCounts) 

function initGame(column, row, winCounts) {
	filledGrid = create2DArray(row, column); // Player board
	createGrid(row, column, 'grid');
	columns = column;
	rows = row;
	winCount = winCounts;
	countMove = 0;
	lastMove = [];
	buttons = document.getElementsByClassName("btn");
	player = document.querySelector('input[name="player"]:checked').value;
	for (var i = 0; i < buttons.length; i++) {
		// Handing the Event when button was clicked
		buttons[i].addEventListener("click", function () {
			// Make move and disable the button to avoid furthur clicking it again
			var buttonNo = this.classList[1];
			makeMove(this, buttonNo.slice(4));
		});
	}
}
function createGrid(rows, cols, targetElementId) {
	const grid = document.getElementById(targetElementId);

	let btnCount = 1;

	for (let i = 0; i < rows; i++) {
		const row = document.createElement('div');
		row.className = 'row';

		for (let j = 0; j < cols; j++) {
			const col = document.createElement('div');
			col.className = 'col';

			const btn = document.createElement('button');
			btn.className = `btn btn-${btnCount}`;

			col.appendChild(btn);
			row.appendChild(col);

			btnCount++;
		}

		grid.appendChild(row);
	}

}
var filledCells = 0; // No. of cells that has been filled
function create2DArray(rows, cols) {
	return Array.from({ length: rows }, () =>
		Array.from({ length: cols }, () => -1)
	);
}

function updateGrid() {
	const width = parseInt(widthInput.value);
	const height = parseInt(heightInput.value);
	const winCondition = parseInt(winConditionInput.value);

	if (width < 3 || width > 20 || height < 3 || height > 20 || winCondition < 3 || winCondition > 8 || winCondition > width || winCondition > height) {
		//alert('请输入有效的值：宽度和高度在3-20之间，获胜条件在3-8之间。');
		alert('Please enter valid values: width and height should be between 3 and 20, and win condition should be between 3 and 8.');
		return;
	}
	document.getElementById("grid").innerHTML = '';
	initGame(width, height, winCondition);


	document.getElementById("grid-config").style.display = "none";
	pcStart();
}

// Event Listener for Buttons
updateGridBTN.addEventListener('click', updateGrid);
reset.addEventListener("click", resetBoard);


var countMove = 0;
var lastMove = [];
function toRC(buttonNo) {
	var row = Math.floor((buttonNo - 1) / columns);
	var col = (buttonNo - 1) % columns;
	return [row, col];
}
function toBtNo(row, col) {
	return row * columns + col + 1;
}
// Function to Make Move on the passed button and disable it
function makeMove(button, buttonNo) {
	lastMove = toRC(buttonNo);
	countMove++;
	var row = lastMove[0];
	var col = lastMove[1];
	if (playerNumber === 1) {
		button.classList.add("btn-player-1");
		filledGrid[row][col] = 1;
		filledCells++;
		if (playerWon(row, col, [1], winCount) === true) {
			setTimeout(function () {
				alert("Game Over: Green Wins");
				resetBoard();
			}, 200);
			return;
		}
		// Update the player
		playerNumber = 2;
		playerType.textContent = "Player - 2";
		if(player == 1){PCMove();}		
	} else {
		button.classList.add("btn-player-2");
		filledGrid[row][col] = 2;
		filledCells++;
		if (playerWon(row, col, [2], winCount) === true) {
			setTimeout(function () {
				alert("Game Over : Red Wins");
				resetBoard();
			}, 200);
			return;
		}
		// Update the player
		playerNumber = 1;
		playerType.textContent = "Player - 1";
		if(player == 2){PCMove();}
	}

	// If all the cells has been filled

	if (filledCells === rows * columns) {
		setTimeout(function () {
			alert("Game Draw");
			resetBoard();
		}, 200);
		return;
	}

	// Disable the button is the move is made
	setTimeout(function () {
		button.disabled = true;
	}, 10);

}
function colorButton(points) {
/*	var i = [];
	points.forEach(function (point) {
		i.push([toBtNo(point[0], point[1] - 1), point[2]]);
	})
	for (var j = 0; j < buttons.length; j++) {
		var mark = false;
		i.forEach(element => {
			if (element[0] === j) {
				buttons[j].innerHTML = element[1];
				buttons[j].style.color = "red";
				mark = true;
			}
		});
		if (!mark) {
			buttons[j].innerHTML = "";
			buttons[j].style.color = "transparent";
		}
	}*/

}
var winMethod = 0;
function playerWon(row, col, player, w_count) {

	var count = 0;

	// Check for columns

	for (var i = 0; i < columns; i++) {
		if (player.includes(filledGrid[row][i])) {
			count++;
			if (count === w_count) { winMethod = 1; return true; }
		} else {
			count = 0;
		}

	}

	count = 0;

	// Check for Rows

	for (var i = 0; i < rows; i++) {
		if (player.includes(filledGrid[i][col])) {
			count++;
			if (count === w_count) { winMethod = 2; return true; }
		} else {
			count = 0;
		}
	}


	count = 0;

	// Check for primary diagonal

	if (row >= col) {

		var i = row - col;
		var j = 0;

		for (; i <= rows - 1; i++, j++) {
			if (player.includes(filledGrid[i][j])) {
				count++;
				if (count == w_count) { winMethod = 3; return true; }
			} else {
				count = 0;
			}
		}
	} else {

		var i = 0;
		var j = col - row;

		for (; j <= columns - 1; i++, j++) {
			if (player.includes(filledGrid[i][j])) {
				count++;
				if (count == w_count) { winMethod = 3; return true; }
			} else {
				count = 0;
			}
		}

	}

	count = 0;

	// Check for secondary diagonal

	if (row + col <= rows - 1) {

		var i = row + col;
		var j = 0;

		for (; i >= 0 && j <= row + col; i--, j++) {
			if (player.includes(filledGrid[i][j])) {
				count++;
				if (count == w_count) { winMethod = 4; return true; }
			} else {
				count = 0;
			}
		}

	} else {

		var i = rows - 1;
		var j = row + col - rows + 1;

		for (; j <= columns - 1; j++, i--) {
			if (player.includes(filledGrid[i][j])) {
				count++;
				if (count == w_count) { winMethod = 4; return true; }
			} else {
				count = 0;
			}
		}

	}
	return false;

}

// Function to reset the Board completely
function resetBoard() {

	// Remove all the disabled buttons and the styles

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].disabled = false;
		buttons[i].classList.remove("btn-player-1");
		buttons[i].classList.remove("btn-player-2");
	}


	// Player Number is changed to 1

	playerNumber = 1;
	playerType.textContent = "Player - 1";


	// Filled Cells is changed to 0

	filledCells = 0;
	countMove = 0;
	lastMove = [];

	// Filling the Board with -1

	for (var i = 0; i < rows; i++) {
		for (var j = 0; j < columns; j++) {
			filledGrid[i][j] = -1;
		}
	}
	pcStart();
}

function pcStart() {
	if(player == 2){
		var r = Math.floor( rows/2);
		var c = Math.floor( columns/2);
		var i = toBtNo(r, c);
		makeMove(buttons[i], i);
	}
}

function PCMove() {
	var r, c, i;
	availableMoves = [];
	var hu = playerNumber === 1 ? 2 : 1;
	var pc = playerNumber;
	var criticalMoves = (winCount - 2) * 2 - 2;
	//优先级别低
	//不用算位置，紧贴战略 把 lastMove[0]， lastMove[1] 周围8个格子都走一遍 不小于0 不大于rows-1 不小于0 不大于columns-1的都加入availableMoves
	for (r = lastMove[0] - 1; r < lastMove[0] + 2; r++) {
		for (c = lastMove[1] - 1; c < lastMove[1] + 2; c++) {
			checkAdd(r, c, 0);
		}
	}

	if (countMove > criticalMoves) {
		//寻找对手可能获胜的位置
		oneStepToWin(hu, 0);
		//寻找自己可能获胜的位置
		oneStepToWin(pc, 1);
		//降低已被对手封堵的位置对面位置的影响
		isBlocked(lastMove[0], lastMove[1], hu);
		//降低已经封堵的位置对面位置的影响
		isBlocked(lastMove[0], lastMove[1], pc);

		//找到数量大于等于winCount-2的连续子的端点，加入availableMoves以便封杀
		// if (playerWon(lastMove[0], lastMove[1], [playerNumber === 1 ? 2 : 1], winCount - 2)) {//cont two left to win
		// 	findEnd(lastMove[0], lastMove[1], playerNumber === 1 ? 2 : 1);
		// }
		// 检测nx x, xn x, xx n, n xx, x nx,x xn
		// x nxx
	}

	if (availableMoves.length > 0) {
		colorButton(availableMoves);
		var bestMoves = [];
		var bestMovesShortlist = [];
		var highestPriority = -Infinity;
	
		// 找出最高优先级
		for (var i = 0; i < availableMoves.length; i++) {
			if (availableMoves[i][2] > highestPriority) {
				highestPriority = availableMoves[i][2];
			}
		}
	
		// 选择所有具有最高优先级的移动
		for (var i = 0; i < availableMoves.length; i++) {
			if (availableMoves[i][2] === highestPriority) {
				bestMoves.push(availableMoves[i]);
			}
		}
	
		// 评估每个最佳移动的周围情况
		bestMoves.forEach(element => {
			var moveScore = 0;
			for (var i = Math.max(0, element[0] - 1); i <= Math.min(rows - 1, element[0] + 1); i++) {
				for (var j = Math.max(0, element[1] - 1); j <= Math.min(columns - 1, element[1] + 1); j++) {
					if (filledGrid[i][j] === hu || filledGrid[i][j] === pc) {
						moveScore++;
					}
				}
			}
			element.push(moveScore);  // 将分数添加到移动数组中
		});
	
		// 根据周围棋子数量排序，选择周围棋子最多的移动
		bestMovesShortlist = bestMoves.sort((a, b) => b[3] - a[3]);
	
		// 选择第一个（最佳）移动
		var bestMove = bestMovesShortlist[0];
		var r = bestMove[0];
		var c = bestMove[1];
	
		makeMove(buttons[r * columns + c], r * columns + c + 1);
		availableMoves = [];
		return;
	}
	availableMoves = [];
}
function findEnd(r, c, player) {
	//winMethod 1:col 2:row 3:diag1 4:diag2
	//从当前r,c点开始向r 的正负方向上寻找下一个filledGrid[][]不等于player的点 检查加入availableMoves
	var sd = true;
	var su = true;
	k = winMethod;
	for (var i = 1; i < winCount - 2; i++) {
		switch (k) {// 1:col 2:row 3:diag1 4:diag2
			case 1://nxx,xnx,xxn
				if (sd && checkAdd(r, c + i, 1) !== player) { sd = false; }
				if (su && checkAdd(r, c - i, 1) !== player) { su = false; }
				break;
			case 2:
				if (sd && checkAdd(r + i, c, 1) !== player) { sd = false; }
				if (su && checkAdd(r - i, c, 1) !== player) { su = false; }
				break;
			case 3:
				if (sd && checkAdd(r + i, c + i, 1) !== player) { sd = false; }
				if (su && checkAdd(r - i, c - i, 1) !== player) { su = false; }
				break;
			case 4:
				if (sd && checkAdd(r + i, c - i, 1) !== player) { sd = false; }
				if (su && checkAdd(r - i, c + i, 1) !== player) { su = false; }
				break;
		}
	}



}
function checkAdd(r, c, p) {//检查加入availableMoves
	if (r >= 0 && r < rows && c >= 0 && c < columns) {
		if (filledGrid[r][c] === -1) {
			availableMoves.push([r, c, p]);
			return -1;
		}
		return filledGrid[r][c];
	}
	return 0;
}
function oneStepToWin(player, p) {
    var listF = [];
    for (var r = 0; r < rows; r++) {
        for (var c = 0; c < columns; c++) {
            if (filledGrid[r][c] === -1) {
                filledGrid[r][c] = player;
                if (playerWon(r, c, [player], winCount)) {
                    filledGrid[r][c] = -1;
                    addToAvailableMoves(r, c, 4 + p);
                    listF.push([r, c]);
                } else if (playerWon(r, c, [player], winCount - 1)) {
                    filledGrid[r][c] = -1;
                    if (!listF.some(coord => coord[0] === r && coord[1] === c)) {
                        addToAvailableMoves(r, c, 2 + p);
                    } else {
                        addToAvailableMoves(r, c, -1);
                    }
                } else {
                    filledGrid[r][c] = -1;
                }
            }
        }
    }
}
function addToAvailableMoves(r, c, p) {
    for (let i = 0; i < availableMoves.length; i++) {
        if (availableMoves[i][0] === r && availableMoves[i][1] === c) {
            availableMoves[i][2] += p;
            return;  // 找到匹配的坐标后立即返回
        }
    }
    // 如果循环结束没有找到匹配的坐标，添加新的
    availableMoves.push([r, c, p]);
}

function isBlocked(r, c, player) {
	var d = -2;
	availableMoves.forEach(element => {
		if (playerWon(r, c, [player === 1 ? 2 : 1], winCount - 2)) {
			switch (winMethod) {// 1:col 2:row 3:diag1 4:diag2
				case 1: {
					if (c - 1 >= 0) {
						if (filledGrid[r][c - 1] === (player === 1 ? 2 : 1)) {
							//up
							if (filledGrid[r][c - 4] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						} else {
							//down
							if (filledGrid[r][c + 4] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						}
					} else if (c + 1 < columns) {
						if (filledGrid[r][c + 1] === (player === 1 ? 2 : 1)) {
							//down
							if (filledGrid[r][c + 4] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						} else {
							//up
							if (filledGrid[r][c - 4] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						}

					}
				}
					break;
				case 2: {
					if (r - 1 >= 0) {
						if (filledGrid[r - 1][c] === (player === 1 ? 2 : 1)) {
							//left
							if (filledGrid[r - 4][c] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						} else {
							//right
							if (filledGrid[r + 4][c] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						}
					} else if (r + 1 < rows) {
						if (filledGrid[r + 1][c] === (player === 1 ? 2 : 1)) {
							//right
							if (filledGrid[r + 4][c] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						} else {
							//left
							if (filledGrid[r - 4][c] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						}
					}
				}
					break;
				case 3: {
					if (r - 1 >= 0 && c - 1 >= 0) {
						if (filledGrid[r - 1][c - 1] === (player === 1 ? 2 : 1)) {
							//up
							if (filledGrid[r - 4][c - 4] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						} else {
							//down
							if (filledGrid[r + 4][c + 4] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						}
					} else if (r + 1 < rows && c + 1 < columns) {
						if (filledGrid[r + 1][c + 1] === (player === 1 ? 2 : 1)) {
							//down
							if (filledGrid[r + 4][c + 4] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						} else {
							//up
							if (filledGrid[r - 4][c - 4] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						}
					}

				}
					break;
				case 4: {
					if (r - 1 >= 0 && c + 1 < columns) {
						if (filledGrid[r - 1][c + 1] === (player === 1 ? 2 : 1)) {
							//up
							if (filledGrid[r - 4][c + 4] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						} else {
							//down
							if (filledGrid[r + 4][c - 4] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						}
					} else if (r + 1 < rows && c - 1 >= 0) {
						if (filledGrid[r + 1][c - 1] === (player === 1 ? 2 : 1)) {
							//down
							if (filledGrid[r + 4][c - 4] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						} else {
							//up
							if (filledGrid[r - 4][c + 4] === (player)) {
								addToAvailableMoves(r, c, d);
								break;
							}
						}

					}
				}
					break;

			}
		}

	});

}