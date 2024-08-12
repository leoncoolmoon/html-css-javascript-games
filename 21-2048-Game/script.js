var ori_threashold = 15;
  //create the playing board
  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      square = document.createElement("div");
      square.innerHTML = 0;
      gridDisplay.appendChild(square);
      squares.push(square);
    }
    generate();
    generate();
  }

  //generate a new number
  function generate() {
    randomNumber = Math.floor(Math.random() * squares.length);
    if (squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;
      checkForGameOver();
    } else generate();
  }

  function moveRight() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = zeros.concat(filteredRow);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function moveLeft() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {
        let totalOne = squares[i].innerHTML;
        let totalTwo = squares[i + 1].innerHTML;
        let totalThree = squares[i + 2].innerHTML;
        let totalFour = squares[i + 3].innerHTML;
        let row = [
          parseInt(totalOne),
          parseInt(totalTwo),
          parseInt(totalThree),
          parseInt(totalFour),
        ];

        let filteredRow = row.filter((num) => num);
        let missing = 4 - filteredRow.length;
        let zeros = Array(missing).fill(0);
        let newRow = filteredRow.concat(zeros);

        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }

  function moveUp() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = filteredColumn.concat(zeros);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }

  function moveDown() {
    for (let i = 0; i < 4; i++) {
      let totalOne = squares[i].innerHTML;
      let totalTwo = squares[i + width].innerHTML;
      let totalThree = squares[i + width * 2].innerHTML;
      let totalFour = squares[i + width * 3].innerHTML;
      let column = [
        parseInt(totalOne),
        parseInt(totalTwo),
        parseInt(totalThree),
        parseInt(totalFour),
      ];

      let filteredColumn = column.filter((num) => num);
      let missing = 4 - filteredColumn.length;
      let zeros = Array(missing).fill(0);
      let newColumn = zeros.concat(filteredColumn);

      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }

  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  function combineColumn() {
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        let combinedTotal =
          parseInt(squares[i].innerHTML) +
          parseInt(squares[i + width].innerHTML);
        squares[i].innerHTML = combinedTotal;
        squares[i + width].innerHTML = 0;
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    checkForWin();
  }

  //assign functions to keyCodes
  function control(e) {
    if (e.keyCode === 37) {
      keyLeft();
    } else if (e.keyCode === 38) {
      keyUp();
    } else if (e.keyCode === 39) {
      keyRight();
    } else if (e.keyCode === 40) {
      keyDown();
    }
  }
  document.addEventListener("keyup", control);

  function keyRight() {
    moveRight();
    combineRow();
    moveRight();
    generate();
  }

  function keyLeft() {
    moveLeft();
    combineRow();
    moveLeft();
    generate();
  }

  function keyUp() {
    moveUp();
    combineColumn();
    moveUp();
    generate();
  }

  function keyDown() {
    moveDown();
    combineColumn();
    moveDown();
    generate();
  }

  //check for the number 2048 in the squares to win
  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {
        resultDisplay.innerHTML = "You WIN";
        document.removeEventListener("keyup", control);
        setTimeout(() => clear(), 3000);
      }
    }
  }

  //check if there are no zeros on the board to lose
  function checkForGameOver() {
    let zeros = 0;
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++;
      }
    }
    if (zeros === 0) {
      resultDisplay.innerHTML = "You LOSE";
      document.removeEventListener("keyup", control);
      setTimeout(() => clear(), 3000);
    }
  }

  //clear timer
  function clear() {
    clearInterval(myTimer);
  }

  //add colours
  function addColours() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0)
        squares[i].style.backgroundColor = "#afa192";
      else if (squares[i].innerHTML == 2)
        squares[i].style.backgroundColor = "#eee4da";
      else if (squares[i].innerHTML == 4)
        squares[i].style.backgroundColor = "#ede0c8";
      else if (squares[i].innerHTML == 8)
        squares[i].style.backgroundColor = "#f2b179";
      else if (squares[i].innerHTML == 16)
        squares[i].style.backgroundColor = "#ffcea4";
      else if (squares[i].innerHTML == 32)
        squares[i].style.backgroundColor = "#e8c064";
      else if (squares[i].innerHTML == 64)
        squares[i].style.backgroundColor = "#ffab6e";
      else if (squares[i].innerHTML == 128)
        squares[i].style.backgroundColor = "#fd9982";
      else if (squares[i].innerHTML == 256)
        squares[i].style.backgroundColor = "#ead79c";
      else if (squares[i].innerHTML == 512)
        squares[i].style.backgroundColor = "#76daff";
      else if (squares[i].innerHTML == 1024)
        squares[i].style.backgroundColor = "#beeaa5";
      else if (squares[i].innerHTML == 2048)
        squares[i].style.backgroundColor = "#d7d4f0";
    }
  }

  function hasPhysicalKeyboard() {
    return !('ontouchstart' in window) || // works on most browsers 
           (navigator.maxTouchPoints === 0) || // works on IE10/11 and Surface
           (navigator.msMaxTouchPoints === 0); // works on IE10/11 and Surface
}
function hasOrientationSensor() {
  return new Promise((resolve) => {
      if (window.DeviceOrientationEvent) {
          // For iOS 13+ devices
          if (typeof DeviceOrientationEvent.requestPermission === 'function') {
              DeviceOrientationEvent.requestPermission()
                  .then(permissionState => {
                      if (permissionState === 'granted') {
                          window.addEventListener('deviceorientation', function(event) {
                              // Remove the event listener immediately after it fires
                              window.removeEventListener('deviceorientation', arguments.callee);
                              resolve(true);
                          });
                          // If the event doesn't fire within 1 second, assume no orientation sensor
                          setTimeout(() => resolve(false), 1000);
                      } else {
                          resolve(false);
                      }
                  })
                  .catch(console.error);
          } else {
              // For non-iOS devices or older iOS versions
              window.addEventListener('deviceorientation', function(event) {
                  // Remove the event listener immediately after it fires
                  window.removeEventListener('deviceorientation', arguments.callee);
                  resolve(event.alpha !== null && event.beta !== null && event.gamma !== null);
              });
              // If the event doesn't fire within 1 second, assume no orientation sensor
              setTimeout(() => resolve(false), 1000);
          }
      } else {
          resolve(false);
      }
  });
}

function toggleOrientationListener(switchOn ) {
  if (isOrientationListenerActive && !switchOn) {
      window.removeEventListener('deviceorientation', handleOrientation);
      isOrientationListenerActive = false;
      console.log("Orientation listener turned off");
  } else {
      resetOrientation().then(() => {
          window.addEventListener('deviceorientation', handleOrientation);
          isOrientationListenerActive = true;
          console.log("Orientation listener turned on");
      });
  }
}
function showKeybroad(){
  toggleOrientationListener(false);
  document.getElementById("virtual_keybroad").style.display = "block";
  document.getElementById("oriantationCtl").style.display = "none";
}
let baseAlpha = 0;
let baseBeta = 0;
let baseGamma = 0;
let isOrientationListenerActive = false;

function resetOrientation() {
    return new Promise((resolve) => {
        if (window.DeviceOrientationEvent) {
            const orientationHandler = function(event) {
                baseAlpha = event.alpha || 0;
                baseBeta = event.beta || 0;
                baseGamma = event.gamma || 0;
                
                window.removeEventListener('deviceorientation', orientationHandler);
                console.log("Orientation reset. Base values:", {alpha: baseAlpha, beta: baseBeta, gamma: baseGamma});
                resolve();
            };

            window.addEventListener('deviceorientation', orientationHandler, { once: true });

            // If no orientation event fires within 1 second, resolve anyway
            setTimeout(() => {
                window.removeEventListener('deviceorientation', orientationHandler);
                console.log("No orientation event detected. Using default values.");
                resolve();
            }, 1000);
        } else {
            console.log("DeviceOrientationEvent is not supported");
            resolve();
        }
    });
}

function handleOrientation(event) {
    let relativeAlpha = event.alpha - baseAlpha;
    let relativeBeta = event.beta - baseBeta;
    let relativeGamma = event.gamma - baseGamma;

    // Normalize values
    relativeAlpha = (relativeAlpha + 180) % 360 - 180;
    relativeBeta = Math.max(-90, Math.min(90, relativeBeta));
    relativeGamma = Math.max(-90, Math.min(90, relativeGamma));

    console.log("Relative orientation:", {alpha: relativeAlpha, beta: relativeBeta, gamma: relativeGamma});

    // Here you can add code to control your game based on these values
    // For example:
    if (Math.abs(relativeGamma) > ori_threashold) {
        if (relativeGamma > 0) {
            keyRight(); // Assuming keyRight is your function to move right in the game
        } else {
            keyLeft(); // Assuming keyLeft is your function to move left in the game
        }
    }

    if (Math.abs(relativeBeta) > ori_threashold) {
        if (relativeBeta > 0) {
            keyDown(); // Assuming keyDown is your function to move down in the game
        } else {
            keyUp(); // Assuming keyUp is your function to move up in the game
        }
    }
}