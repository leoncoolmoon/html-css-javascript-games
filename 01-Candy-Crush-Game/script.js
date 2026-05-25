document.addEventListener("DOMContentLoaded", () => {
    candyCrushGame();
});
var score_three = 5;
var score_four = 10;
var score_five = 20;
function candyCrushGame() {
    const grid = document.querySelector(".grid");
    const scoreDisplay = document.getElementById("score");
    const width = 8;
    const squares = [];
    let score = 0;
    let selectedCandy = false;
    const candyColors = [
        "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/red-candy.png)",
        "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/blue-candy.png)",
        "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/green-candy.png)",
        "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/yellow-candy.png)",
        "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/orange-candy.png)",
        "url(https://raw.githubusercontent.com/arpit456jain/Amazing-Js-Projects/master/Candy%20Crush/utils/purple-candy.png)",
    ];

    // Creating Game Board
    function createBoard() {
        for (let i = 0; i < width * width; i++) {
            const square = document.createElement("div");
            square.setAttribute("draggable", true);
            square.setAttribute("id", i);
            let randomColor = Math.floor(Math.random() * candyColors.length);
            square.style.backgroundImage = candyColors[randomColor];
            grid.appendChild(square);
            squares.push(square);
        }
    }
    createBoard();

    // Dragging the Candy
    let colorBeingDragged;
    let colorBeingReplaced;
    let squareIdBeingDragged;
    let squareIdBeingReplaced;

    squares.forEach((square) =>
        square.addEventListener("dragstart", dragStart)
    );
    squares.forEach((square) => square.addEventListener("dragend", dragEnd));
    squares.forEach((square) => square.addEventListener("dragover", dragOver));
    squares.forEach((square) =>
        square.addEventListener("dragenter", dragEnter)
    );
    squares.forEach((square) =>
        square.addEventListener("drageleave", dragLeave)
    );
    squares.forEach((square) => square.addEventListener("drop", dragDrop));

    // Support for both click/touch to swap
    let lastEventTime = 0;
    squares.forEach((square) =>
        square.addEventListener("mousedown", (e) => {
            if (Date.now() - lastEventTime < 500) return;
            candyTouchStart.call(square, e);
        })
    );
    squares.forEach((square) =>
        square.addEventListener("touchstart", (e) => {
            lastEventTime = Date.now();
            candyTouchStart.call(square, e);
        }, {passive: true})
    );

    function candyTouchStart(e) {
        if (selectedCandy) {
            const currentId = parseInt(this.id);
            const draggedId = squareIdBeingDragged;

            colorBeingReplaced = this.style.backgroundImage;
            squareIdBeingReplaced = currentId;

            let validMoves = [
                draggedId - 1,
                draggedId - width,
                draggedId + 1,
                draggedId + width
            ];

            if (validMoves.includes(squareIdBeingReplaced)) {
                this.style.backgroundImage = colorBeingDragged;
                squares[draggedId].style.backgroundImage = colorBeingReplaced;
                dragEnd();
            }

            if (squares[draggedId]) {
                squares[draggedId].style.transform = "";
            }
            selectedCandy = false;
        } else {
            colorBeingDragged = this.style.backgroundImage;
            squareIdBeingDragged = parseInt(this.id);
            squares[squareIdBeingDragged].style.transform = "scale(1.2)";
            selectedCandy = true;
        }
    }

    function candyTouchEnd(e) {
        // Reserved for future touch-drag implementation if needed
    }

    // record the color and id of the candy being dragged
    function dragStart() {
        colorBeingDragged = this.style.backgroundImage;
        squareIdBeingDragged = parseInt(this.id);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {
    }

    function dragDrop() {
        colorBeingReplaced = this.style.backgroundImage;
        squareIdBeingReplaced = parseInt(this.id);
        this.style.backgroundImage = colorBeingDragged;
        squares[
            squareIdBeingDragged
        ].style.backgroundImage = colorBeingReplaced;
    }

    function dragEnd() {
        //Defining, What is a valid move?
        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width
        ];
        let validMove = validMoves.includes(squareIdBeingReplaced);

        if (squareIdBeingReplaced && validMove) {
            // Valid move
        } else if (squareIdBeingReplaced && !validMove) {
            squares[
                squareIdBeingReplaced
            ].style.backgroundImage = colorBeingReplaced;
            squares[
                squareIdBeingDragged
            ].style.backgroundImage = colorBeingDragged;
        } else {
            squares[
                squareIdBeingDragged
            ].style.backgroundImage = colorBeingDragged;
        }

        if (!checkAll()) {
            // If no match was made, swap back
            if (squareIdBeingReplaced !== null && squareIdBeingReplaced !== undefined) {
                squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced;
                squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged;
            }
        }

        // Reset
        squareIdBeingDragged = null;
        squareIdBeingReplaced = null;
    }

    //Dropping candies once some have been cleared
    function moveIntoSquareBelow() {
        let moved = false;

        for (let i = 62; i >= 0; i--) {
            if (squares[i].style.backgroundImage === "") {
                let j = i - width;
                while (j >= 0 && squares[j].style.backgroundImage === "") {
                    j -= width;
                }

                if (j >= 0) {
                    squares[i].style.backgroundImage = squares[j].style.backgroundImage;
                    squares[j].style.backgroundImage = "";

                    squares[i].style.transform = `translateY(${(i - j) * 20}%)`;
                    setTimeout(() => {
                        squares[i].style.transform = "translateY(0)";
                    }, 10);

                    moved = true;
                }
            }
        }

        if (!moved) {
            for (let i = 0; i < width; i++) {
                if (squares[i].style.backgroundImage === "") {
                    let randomColor = Math.floor(Math.random() * candyColors.length);
                    squares[i].style.backgroundImage = candyColors[randomColor];
                }
            }
        }
    }

    function removeCandies(candies) {
        candies.forEach((index) => {
            const candy = squares[index];
            candy.style.transition = "transform 0.3s, opacity 0.3s";
            candy.style.transform = "scale(0)";
            candy.style.opacity = "0";

            setTimeout(() => {
                candy.style.backgroundImage = "";
                candy.style.transform = "scale(1)";
                candy.style.opacity = "1";
            }, 200);
        });
    }

    ///-> Checking for Matches <-///
    function checkRowForFive() {
        var returnValue = false;
        for (i = 0; i < 59; i++) {
            let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            const notValid = [
                4, 5, 6, 7,
                12, 13, 14, 15,
                20, 21, 22, 23,
                28, 29, 30, 31,
                36, 37, 38, 39,
                44, 45, 46, 47,
                52, 53, 54, 55
            ];

            if (notValid.includes(i)) continue;
            if (
                rowOfFive.every(
                    (index) =>
                        squares[index].style.backgroundImage === decidedColor &&
                        !isBlank
                )
            ) {
                score += score_five;
                scoreDisplay.innerHTML = score;
                removeCandies(rowOfFive);
                returnValue = true;
            }
        }
        return returnValue;
    }

    function checkColumnForFive() {
        var returnValue = false;
        for (i = 0; i < 31; i++) {
            let columnOfFive = [i, i + width, i + width * 2, i + width * 3, i + width * 4];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            if (
                columnOfFive.every(
                    (index) =>
                        squares[index].style.backgroundImage === decidedColor &&
                        !isBlank
                )
            ) {
                score += score_five;
                scoreDisplay.innerHTML = score;
                removeCandies(columnOfFive);
                returnValue = true;

            }
        }
        return returnValue;
    }

    function checkRowForFour() {
        var returnValue = false;
        for (i = 0; i < 60; i++) {
            let rowOfFour = [i, i + 1, i + 2, i + 3];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            const notValid = [
                5, 6, 7,
                13, 14, 15,
                21, 22, 23,
                29, 30, 31,
                37, 38, 39,
                45, 46, 47,
                53, 54, 55
            ];
            if (notValid.includes(i)) continue;

            if (
                rowOfFour.every(
                    (index) =>
                        squares[index].style.backgroundImage === decidedColor &&
                        !isBlank
                )
            ) {
                score += score_four;
                scoreDisplay.innerHTML = score;
                removeCandies(rowOfFour);
                returnValue = true;
            }
        }
        return returnValue
    }

    function checkColumnForFour() {
        var returnValue = false;
        for (i = 0; i < 39; i++) {
            let columnOfFour = [i, i + width, i + width * 2, i + width * 3];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            if (
                columnOfFour.every(
                    (index) =>
                        squares[index].style.backgroundImage === decidedColor &&
                        !isBlank
                )
            ) {
                score += score_four;
                scoreDisplay.innerHTML = score;
                removeCandies(columnOfFour);
                returnValue = true;
            }
        }
        return returnValue;
    }

    function checkRowForThree() {
        var returnValue = false;
        for (i = 0; i < 61; i++) {
            let rowOfThree = [i, i + 1, i + 2];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            const notValid = [
                6, 7,
                14, 15,
                22, 23,
                30, 31,
                38, 39,
                46, 47,
                54, 55
            ];
            if (notValid.includes(i)) continue;

            if (
                rowOfThree.every(
                    (index) =>
                        squares[index].style.backgroundImage === decidedColor &&
                        !isBlank
                )
            ) {
                score += score_three;
                scoreDisplay.innerHTML = score;
                removeCandies(rowOfThree);
                returnValue = true;
            }
        }
        return returnValue;
    }

    function checkColumnForThree() {
        var returnValue = false;
        for (i = 0; i < 47; i++) {
            let columnOfThree = [i, i + width, i + width * 2];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            if (
                columnOfThree.every(
                    (index) =>
                        squares[index].style.backgroundImage === decidedColor &&
                        !isBlank
                )
            ) {
                score += score_three;
                scoreDisplay.innerHTML = score;
                removeCandies(columnOfThree);
                returnValue = true;

            }
        }
        return returnValue;
    }

    function checkAll() {
        let r5c = checkRowForFive();
        let r4c = checkRowForFour();
        let r3c = checkRowForThree();
        let c5c = checkColumnForFive();
        let c4c = checkColumnForFour();
        let c3c = checkColumnForThree();

        moveIntoSquareBelow();
        return r5c || c5c || r4c || r3c || c4c || c3c;
    }

    checkAll();

    window.setInterval(function () {
        checkAll();
    }, 410);
}
