// Initialize canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var startBtn = document.getElementById("start-btn");
var pauseBtn = document.getElementById("pause-btn");
var restartBtn = document.getElementById("restart-btn");
var animationId;
var gameRunning = false;
var ballColor = "#FFF";

startBtn.addEventListener("click", function () {
  if (!gameRunning) {
    // only start the game if gameRunning is false
    gameRunning = true; // set gameRunning to true when the game starts
    loop();
  }
});

pauseBtn.addEventListener("click", function () {
  gameRunning = false;
  cancelAnimationFrame(animationId);
});

restartBtn.addEventListener("click", function () {
  document.location.reload();
});

addEventListener("load", (event) => {
  draw();
});

// Define ball properties
var ballRadius = 10;
var ballX = canvas.width / 2;
var ballY = canvas.height / 2;
var ballSpeedX = 4;
var ballSpeedY = 4;

// Define paddle properties
var paddleHeight = 80;
var paddleWidth = 10;
var leftPaddleY = canvas.height / 2 - paddleHeight / 2;
var rightPaddleY = canvas.height / 2 - paddleHeight / 2;
var paddleSpeed = 10;

// Define score properties
var leftPlayerScore = 0;
var rightPlayerScore = 0;
var maxScore = 10;

// Listen for keyboard events
document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

// Handle key press
var upPressed = false;
var downPressed = false;
let wPressed = false;
let sPressed = false;

function keyDownHandler(e) {
  if (e.key === "ArrowUp") {
    upPressed = true;
  } else if (e.key === "ArrowDown") {
    downPressed = true;
  } else if (e.key === "w") {
    wPressed = true;
  } else if (e.key === "s") {
    sPressed = true;
  }
}

// Handle key release
function keyUpHandler(e) {
  if (e.key === "ArrowUp") {
    upPressed = false;
  } else if (e.key === "ArrowDown") {
    downPressed = false;
  } else if (e.key === "w") {
    wPressed = false;
  } else if (e.key === "s") {
    sPressed = false;
  }
}

// Update game state
function update() {
  // Move paddles
  if (upPressed && rightPaddleY > 0) {
    rightPaddleY -= paddleSpeed;
  } else if (downPressed && rightPaddleY + paddleHeight < canvas.height) {
    rightPaddleY += paddleSpeed;
  }

  // Move right paddle based on "w" and "s" keys
  if (wPressed && leftPaddleY > 0) {
    leftPaddleY -= paddleSpeed;
  } else if (sPressed && leftPaddleY + paddleHeight < canvas.height) {
    leftPaddleY += paddleSpeed;
  }

  // Move right paddle automatically based on ball position
  // if (ballY > rightPaddleY + paddleHeight / 2) {
  //   rightPaddleY += paddleSpeed;
  // } else if (ballY < rightPaddleY + paddleHeight / 2) {
  //   rightPaddleY -= paddleSpeed;
  // }

  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Check if ball collides with top or bottom of canvas
  if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }

  // Check if ball collides with left paddle
  if (
    ballX - ballRadius < paddleWidth &&
    ballY > leftPaddleY &&
    ballY < leftPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Check if ball collides with right paddle
  if (
    ballX + ballRadius > canvas.width - paddleWidth &&
    ballY > rightPaddleY &&
    ballY < rightPaddleY + paddleHeight
  ) {
    ballSpeedX = -ballSpeedX;
  }

  // Check if ball goes out of bounds on left or right side of canvas
  if (ballX < 0) {
    rightPlayerScore++;
    reset();
  } else if (ballX > canvas.width) {
    leftPlayerScore++;
    reset();
  }

  // Check if a player has won
  if (leftPlayerScore === maxScore) {
    playerWin("Left player");
  } else if (rightPlayerScore === maxScore) {
    playerWin("Right player");
  }

}

function playerWin(player) {
  gameRunning = false;
  var message = "Congratulations! " + player + " win!";
  $("#message").text(message); // Set the message text
  $("#message-modal").modal("show"); // Display the message modal
  reset();
}

// Reset ball to center of screen
function reset() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
  ballSpeedY = Math.random() * 10 - 5;
}

// Draw objects on canvas
function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = ballColor;
  ctx.font = "15px Arial";

  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.strokeStyle = ballColor; // Set line color to white
  ctx.stroke();
  ctx.closePath();

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();

  // Draw left paddle
  ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);

  // Draw right paddle
  ctx.fillRect(
    canvas.width - paddleWidth,
    rightPaddleY,
    paddleWidth,
    paddleHeight
  );

  // Draw scores
  ctx.fillText("Score: " + leftPlayerScore, 10, 20);
  ctx.fillText("Score: " + rightPlayerScore, canvas.width - 70, 20);
return;
//debug
    const lineHeight = 20;
    const startY = canvas.height / 2 - (debugInfo.length * lineHeight) / 2;
    
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, startY - 10, canvas.width, debugInfo.length * lineHeight + 20);
    
    ctx.font = '16px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    
    debugInfo.forEach((info, index) => {
      ctx.fillText(info, canvas.width / 2, startY + index * lineHeight);
    });
  drawDebugInfo();


}

// Game loop
function loop() {
  update();
  draw();
  animationId = requestAnimationFrame(loop);
}

$("#message-modal-close").on("click", function () {
  document.location.reload();
});

var downLock = false;
function keyDown() {// pressed down arrow key
  if (upLock) { keyUp(); }
  if (downLock) {
    var event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowDown', // or any other key you want to simulate
      keyCode: 40, // or any other key code you want to simulate
      which: 40, // or any other key code you want to simulate
    });
    document.dispatchEvent(event);
    downLock = false;
    document.getElementById("down_arrow").style.transform = "scale(1)";
  } else {
    var event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowDown', // or any other key you want to simulate
      keyCode: 40, // or any other key code you want to simulate
      which: 40, // or any other key code you want to simulate
    });
    document.dispatchEvent(event);
    downLock = true;
    document.getElementById("down_arrow").style.transform = "scale(0.9)";
  }
}

var upLock = false;
function keyUp() {// pressed up arrow key
  if (downLock) { keyDown(); }
  if (upLock) {
    var event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowUp', // or any other key you want to simulate
      keyCode: 38, // or any other key code you want to simulate
      which: 38, // or any other key code you want to simulate
    });
    document.dispatchEvent(event);
    upLock = false;
    document.getElementById("up_arrow").style.transform = "scale(1)";
  } else {
    var event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowUp', // or any other key you want to simulate
      keyCode: 38, // or any other key code you want to simulate
      which: 38, // or any other key code you want to simulate
    });
    document.dispatchEvent(event);
    upLock = true;
    document.getElementById("up_arrow").style.transform = "scale(0.9)";
  }
}

function keyLeft() {
  keyW();
}

function keyRight() {// pressed right arrow key
  keyS();
}

var wLock = false;
function keyW() {// pressed w key
  if (sLock) { keyS(); }
  if (wLock) {
    var event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      key: 'w', // or any other key you want to simulate
      keyCode: 87, // or any other key code you want to simulate
      which: 87, // or any other key code you want to simulate
    });
    document.dispatchEvent(event);
    wLock = false;
    document.getElementById("left_arrow").style.transform = "scale(1)rotate(90deg)";
  } else {
    var event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'w', // or any other key you want to simulate
      keyCode: 87, // or any other key code you want to simulate
      which: 87, // or any other key code you want to simulate
    });
    document.dispatchEvent(event);
    wLock = true;
    document.getElementById("left_arrow").style.transform = "scale(0.9)rotate(90deg)";
  }

}

var sLock = false;
function keyS() {// pressed s key
  if (wLock) { keyW(); }
  if (sLock) {
    var event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      key: 's', // or any other key you want to simulate
      keyCode: 83, // or any other key code you want to simulate
      which: 83, // or any other key code you want to simulate
    });
    document.dispatchEvent(event);
    sLock = false;
    document.getElementById("right_arrow").style.transform = "scale(1)rotate(90deg)";
  } else {
    var event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 's', // or any other key you want to simulate
      keyCode: 83, // or any other key code you want to simulate
      which: 83, // or any other key code you want to simulate
    });
    document.dispatchEvent(event);
    sLock = true;
    document.getElementById("right_arrow").style.transform = "scale(0.9)rotate(90deg)";
  }
}

//增加一个触摸屏幕事件，让Paddle水平移动距离和触摸点水平移动距离一致
var touchYstartLeft = null;
var previousPositionLeft = canvas.height / 2 - paddleHeight;
var touchYstartRight = null;
var previousPositionRight = canvas.height / 2 - paddleHeight;
const canvasBounds = canvas.getBoundingClientRect();
const canvasMiddle = canvasBounds.width/2+canvasBounds.left;

function actionStart(e) {
  //e.preventDefault();
  //判断是鼠标左键点击还是触摸
  if(!gameRunning ) { return; }
  var leftPt = { pageX: canvas.width, pageY: -1 }, rightPt = { pageX: 0, pageY: -1 };

  if (e.touches && e.touches.length >= 1) {//如果是触摸
   for(var i = 0; i < e.touches.length; i++){//记录左半边，最左边的点
      if (e.touches[i].pageX < canvasMiddle) {
        leftPt = e.touches[i].pageX < leftPt.pageX ? e.touches[i] : leftPt;
      } else {//记录右半边，最右边的点
        rightPt = e.touches[i].pageX > rightPt.pageX ? e.touches[i] : rightPt;
      }
    }
    if (touchYstartLeft == null && leftPt.pageY != -1 ) { touchYstartLeft = leftPt.pageY; }
    if (touchYstartRight == null && rightPt.pageY != -1) { touchYstartRight = rightPt.pageY; }
    return;
  }  else {//如果是鼠标 touchXstart等于鼠标的x坐标
    if (e.pageX <canvasMiddle) {
      if (touchYstartLeft == null) { touchYstartLeft = e.pageY; }
    } else {
      if (touchYstartRight == null) { touchYstartRight = e.pageY; }
    }
  }




}
function actionEnd(e) {
  //e.preventDefault();
  if (touchYstartRight != null) {
    touchYstartRight = null;
    previousPositionRight = rightPaddleY;
  }
  if (touchYstartLeft != null) {
    touchYstartLeft = null;
    previousPositionLeft = leftPaddleY;
  }
}

// 全局变量，用于存储调试信息
let debugInfo = [];
const DEBUG_AREA_SIZE = 480;
const LINE_HEIGHT = 20;
const MAX_LINES = Math.floor(DEBUG_AREA_SIZE / LINE_HEIGHT);
let debugScrollY = 0;

function actionMove(e) {
  e.preventDefault(); // 防止页面滚动
  if (gameRunning) {
    if (e.touches) { // 触摸事件
      handleTouchMove(e);
    } else { // 鼠标事件
      handleMouseMove(e);
    }
  }
}

function handleTouchMove(e) {
  let leftTouch = null;
  let rightTouch = null;
  
  // 清除之前的调试信息
  clearDebugInfo();
  
  // 遍历所有触摸点,找出最左和最右的触摸点，并记录调试信息
  for (let i = 0; i < e.touches.length; i++) {
    let touch = e.touches[i];
    let touchX = touch.pageX;
    let touchY = touch.pageY;
    
    // 添加调试信息
    addDebugInfo(`Touch ${i}: (${Math.round(touchX)}, ${Math.round(touchY)})`);
    
    if (touchX < canvasMiddle) { // 左半边
      if (!leftTouch || touchX < leftTouch.pageX ) {
        leftTouch = touch;
      }
      
    } else { // 右半边
      if (!rightTouch || touchX > rightTouch.pageX ) {
        rightTouch = touch;
      }
      
    }
  }  
  try{addDebugInfo(`leftTouch: (${leftTouch.pageX}, ${leftTouch.pageY},  ${touchYstartLeft})`);}catch(e){}
  try{addDebugInfo(`rightTouch: (${rightTouch.pageX}, ${rightTouch.pageY},  ${touchYstartRight})`);}catch(e){}

  // 更新左侧滑板位置
  try{if (leftTouch && touchYstartLeft !== null) {
    let distLeft = leftTouch.pageY - touchYstartLeft;
    leftPaddleY = previousPositionLeft + distLeft;
    leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddleY));
    addDebugInfo(`distLeft: (${distLeft})`);
  }}catch(e){}
  
  // 更新右侧滑板位置
  try{if (rightTouch && touchYstartRight !== null) {
    let distRight = rightTouch.pageY - touchYstartRight;
    rightPaddleY = previousPositionRight + distRight;
    rightPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddleY));
    addDebugInfo(`distRight: (${distRight})`);
  }}catch(e){}
}

function handleMouseMove(e) {
  let mouseX = e.pageX;
  let mouseY = e.pageY;
  
  // 添加鼠标位置到调试信息
  clearDebugInfo();
  addDebugInfo(`Mouse: (${Math.round(mouseX)}, ${Math.round(mouseY)})`);
  
  if (mouseX < canvasMiddle) {
    if (touchYstartLeft !== null) {
      let distLeft = mouseY - touchYstartLeft;
      leftPaddleY = previousPositionLeft + distLeft;
      leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, leftPaddleY));
    }
  } else {
    if (touchYstartRight !== null) {
      let distRight = mouseY - touchYstartRight;
      rightPaddleY = previousPositionRight + distRight;
      rightPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, rightPaddleY));
    }
  }
}

function clearDebugInfo() {
  return;
  debugInfo = [];
  debugScrollY = 0;
}

function addDebugInfo(info) {
  return;
  debugInfo.push(info);
  if (debugInfo.length > MAX_LINES) {
    debugScrollY += LINE_HEIGHT;
    if (debugScrollY >= DEBUG_AREA_SIZE) {
      debugScrollY = 0;
    }
  }
}

function drawDebugInfo() {
  const ctx = canvas.getContext('2d');
  const startX = (canvas.width - DEBUG_AREA_SIZE) / 2;
  const startY = (canvas.height - DEBUG_AREA_SIZE) / 2;
  
  ctx.save();
  
  // 绘制调试区域背景
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(startX, startY, DEBUG_AREA_SIZE, DEBUG_AREA_SIZE);
  
  // 设置裁剪区域
  ctx.beginPath();
  ctx.rect(startX, startY, DEBUG_AREA_SIZE, DEBUG_AREA_SIZE);
  ctx.clip();
  
  ctx.font = '16px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'left';
  
  debugInfo.forEach((info, index) => {
    let y = startY + index * LINE_HEIGHT - debugScrollY;
    if (y < startY) {
      y += DEBUG_AREA_SIZE;
    }
    ctx.fillText(info, startX + 10, y + LINE_HEIGHT);
  });
  
  ctx.restore();
}

// 在您的主绘制函数中添加这个函数调用
//function draw() {
  // ... 您现有的绘制代码 ...

    // const ctx = canvas.getContext('2d');
    // const lineHeight = 20;
    // const startY = canvas.height / 2 - (debugInfo.length * lineHeight) / 2;
    
    // ctx.save();
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    // ctx.fillRect(0, startY - 10, canvas.width, debugInfo.length * lineHeight + 20);
    
  //   ctx.font = '16px Arial';
  //   ctx.fillStyle = 'white';
  //   ctx.textAlign = 'center';
    
  //   debugInfo.forEach((info, index) => {
  //     ctx.fillText(info, canvas.width / 2, startY + index * lineHeight);
  //   });
  // drawDebugInfo();
//}

// 事件监听器
document.addEventListener('touchstart', actionStart, { passive: false });
document.addEventListener('touchend', actionEnd);
document.addEventListener('touchmove', actionMove, { passive: false });
document.addEventListener('mousedown', actionStart);
document.addEventListener('mouseup', actionEnd);
document.addEventListener('mousemove', actionMove);