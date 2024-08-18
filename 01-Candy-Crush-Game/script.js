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
    squares.forEach((square) =>
        square.addEventListener("click", candyClicked)
    );
    function candyClicked() {
        if (selectedCandy) {

            colorBeingReplaced = this.style.backgroundImage;
            squareIdBeingReplaced = parseInt(this.id);
            this.style.backgroundImage = colorBeingDragged;
            squares[
                squareIdBeingDragged
            ].style.backgroundImage = colorBeingReplaced;

            dragEnd();

            squares[
                squareIdBeingDragged
            ].style.transform = "";
            selectedCandy = false;
        } else {
            colorBeingDragged = this.style.backgroundImage;
            squareIdBeingDragged = parseInt(this.id);
            squares[
                squareIdBeingDragged
            ].style.transform = "scale(1.3 )";
            selectedCandy = true;
        }
    }
    // record the color and id of the candy being dragged
    function dragStart() {
        colorBeingDragged = this.style.backgroundImage;
        squareIdBeingDragged = parseInt(this.id);
        // this.style.backgroundImage = ''
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function dragEnter(e) {
        e.preventDefault();
    }

    function dragLeave() {
        //this.style.backgroundImage = "";
    }
    // record the color and id of the square being replaced
    // change the color and id of the square being replaced to the color and id of the candy being dragged
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
            //squareIdBeingReplaced = null;
        } else if (squareIdBeingReplaced && !validMove) {
            //if the move is not valid, change the color back
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
            squares[
                squareIdBeingReplaced
            ].style.backgroundImage = colorBeingReplaced;
            squares[
                squareIdBeingDragged
            ].style.backgroundImage = colorBeingDragged;
        }
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

                    // 添加平滑的下落效果
                    squares[i].style.transform = `translateY(${(i - j) * 20}%)`;
                    setTimeout(() => {
                        squares[i].style.transform = "translateY(0)";
                    }, 10);

                    moved = true;
                }
            }
        }

        // 仅处理所有糖果完成下落后的情况
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

            // 逐渐缩小并淡出
            candy.style.transition = "transform 0.3s, opacity 0.3s";
            candy.style.transform = "scale(0)";
            candy.style.opacity = "0";

            // 在动画结束后清空图案
            setTimeout(() => {
                candy.style.backgroundImage = "";
                candy.style.transform = "scale(1)";
                candy.style.opacity = "1";
            }, 200); // 这里的300ms应与动画时间相匹配
        });
    }



    ///-> Checking for Matches <-///
    //For Row of Five
    function checkRowForFive() {
        var returnValue = false;
        for (i = 0; i < 59; i++) {
            let rowOfFive = [i, i + 1, i + 2, i + 3, i + 4];
            let decidedColor = squares[i].style.backgroundImage;
            const isBlank = squares[i].style.backgroundImage === "";

            const notValid = [
                4, 5, 6, 7,    // 第1行
                12, 13, 14, 15, // 第2行
                20, 21, 22, 23, // 第3行
                28, 29, 30, 31, // 第4行
                36, 37, 38, 39, // 第5行
                44, 45, 46, 47, // 第6行
                52, 53, 54, 55  // 第7行
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
    //For Column of Five
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

    //For Row of Four
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

    //For Column of Four
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

    //For Row of Three
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

    //For Column of Three
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
    scoreDisplay.addEventListener("click", checkAll);

    window.setInterval(function () {
        checkAll();
    }, 410);
}