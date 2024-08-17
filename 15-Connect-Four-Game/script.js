// DOM Variables

var buttons 
var reset = document.getElementById("reset-btn");
var playerType = document.getElementById("player-type");
var updateGridBTN = document.getElementById("update-grid");
var widthInput = document.getElementById("grid-width");
var heightInput = document.getElementById("grid-height");
var winConditionInput = document.getElementById("win-condition");

// Game Flow Variables

var columns = 10;
var rows = 10;
var winCount = 4;
var filledGrid; 
var playerNumber = 1; // Initially player - 1 gets to start his/her turn

 initGame(10,10,5); // (columns, rows, winCounts) 

function initGame(column, row, winCounts) {
	filledGrid = create2DArray(row , column); // Player board
	createGrid(row, column, 'grid');
	columns = column;
	rows = row;
	winCount = winCounts;
	buttons = document.getElementsByClassName("btn");
	for(var i = 0; i < buttons.length; i++) {
		// Handing the Event when button was clicked
		buttons[i].addEventListener("click" , function() {
			// Make move and disable the button to avoid furthur clicking it again
			var buttonNo = this.classList[1];
			makeMove(this , buttonNo.slice(4));
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

	if (width < 3 || width > 20 || height < 3 || height > 20 || winCondition < 3 || winCondition > 8 ||winCondition > width || winCondition > height) {
		//alert('请输入有效的值：宽度和高度在3-20之间，获胜条件在3-8之间。');
		alert('Please enter valid values: width and height should be between 3 and 20, and win condition should be between 3 and 8.');
		return;
	}
	document.getElementById("grid").innerHTML = '';
	initGame(width, height, winCondition);


	document.getElementById("grid-config").style.display = "none";
}

// Event Listener for Buttons
updateGridBTN.addEventListener('click', updateGrid);
reset.addEventListener("click" , resetBoard);




// Function to Make Move on the passed button and disable it
function makeMove(button , buttonNo) {
	var row = buttonNo % columns === 0 ? Math.floor(buttonNo / columns) - 1 : Math.floor(buttonNo / columns);
	var col = buttonNo % columns === 0 ? rows: (buttonNo % columns) - 1;
	if(playerNumber === 1) {
		button.classList.add("btn-player-1");
		filledGrid[row][col] = 1;
		filledCells++;
		if(playerWon(row , col , 1) === true) {
			setTimeout(function() {
				alert("Game Over: Green Wins");
				resetBoard();
			} , 200);
		}
		// Update the player
		playerNumber = 2;
		playerType.textContent = "Player - 2";
	} else {
		button.classList.add("btn-player-2");
		filledGrid[row][col] = 2;
		filledCells++;
		if(playerWon(row , col , 2) === true) {
			setTimeout(function() {
				alert("Game Over : Red Wins");
				resetBoard();
			} , 200);
		}
		// Update the player
		playerNumber = 1;
		playerType.textContent = "Player - 1";
	}

	// If all the cells has been filled

	if(filledCells === rows * columns) {
		setTimeout(function() {
			alert("Game Draw");
			resetBoard();
		} , 200);
		return;
	}

	// Disable the button is the move is made
	setTimeout(function () {
		button.disabled = true;
	},10);

}

function playerWon(row , col , player) {

	var count = 0;

	// Check for columns

	for(var i = 0; i < columns; i++) {
		if(filledGrid[row][i] === player) {
			count++;
			if(count === winCount) return true;
		} else {
			count = 0;
		}

	}

	count = 0;

	// Check for Rows

	for(var i = 0; i < rows; i++) {
		if(filledGrid[i][col] === player) {
			count++;
			if(count === winCount) return true;
		} else {
			count = 0;
		}
	}


	count = 0;

	// Check for primary diagonal

	if(row >= col) {

		var i = row - col;
		var j = 0;

		for(; i <= rows-1; i++ , j++) {
			if(filledGrid[i][j] === player) {
				count++;
				if(count == winCount) return true;
			} else {
				count = 0;
			}
		}
	} else {

		var i = 0;
		var j = col - row;

		for(; j <= columns-1; i++ , j++) {
			if(filledGrid[i][j] === player) {
				count++;
				if(count == winCount) return true;
			} else {
				count = 0;
			}
		}

	}

	count = 0;

	// Check for secondary diagonal

	if(row + col <= rows - 1) {

		var i = row + col;
		var j = 0;

		for(; i >= 0 && j <= row + col; i-- , j++) {
			if(filledGrid[i][j] === player) {
				count++;
				if(count == winCount) return true;
			} else {
				count = 0;
			}
		}

	} else {

		var i = rows - 1;
		var j = row + col - rows + 1;

		for(; j <= columns - 1; j++ , i--) {
			if(filledGrid[i][j] === player) {
				count++;
				if(count == winCount) return true;
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

	for(var i = 0; i < buttons.length; i++) {
		buttons[i].disabled = false;
		buttons[i].classList.remove("btn-player-1");
		buttons[i].classList.remove("btn-player-2");
	}


	// Player Number is changed to 1

	playerNumber = 1;
	playerType.textContent = "Player - 1";


	// Filled Cells is changed to 0

	filledCells = 0;


	// Filling the Board with -1

	for(var i = 0; i < rows; i++) {
		for(var j = 0; j < columns; j++) {
			filledGrid[i][j] = -1;
		}
 	}

}