const rulesButton = document.getElementById("rules-btn");
const closeButton = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const color = getComputedStyle(document.documentElement).getPropertyValue(
  "--button-color"
);
const secondaryColor = getComputedStyle(
  document.documentElement
).getPropertyValue("--sidebar-color");
let score = 0;
const brickRowCount = 9;
const brickColumnCount = 5;

// Reference: https://stackoverflow.com/questions/34772957/how-to-make-canvas-responsive
// https://stackoverflow.com/questions/39771732/drawing-to-responsive-canvas-that-is-100-width-and-height
const heightRatio = 0.75;
canvas.height = canvas.width * heightRatio;
ctx.canvas.width = 800;
ctx.canvas.height = ctx.canvas.width * heightRatio;

// Elements
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  speed: 4,
  dx: 4,
  dy: -4,
};

const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}

// Create Elements
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = secondaryColor;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawScore() {
  ctx.font = '20px "Balsamiq Sans"';
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? color : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

function draw() {
  // clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// Animate Elements
function movePaddle() {
  paddle.x += paddle.dx;
  if (paddle.x + paddle.w > canvas.width) paddle.x = canvas.width - paddle.w;
  if (paddle.x < 0) paddle.x = 0;
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
  // wall collision
  if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
    // right and left
    ball.dx *= -1;
  }
  if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
    // top and bottom
    ball.dy *= -1;
  }
  // paddle
  if (
    ball.x - ball.size > paddle.x &&
    ball.x + ball.size < paddle.x + paddle.w &&
    ball.y + ball.size > paddle.y
  ) {
    ball.dy = -ball.speed;
  }
  // bricks
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        if (
          ball.x - ball.size > brick.x && // left brick side check
          ball.x + ball.size < brick.x + brick.w && // right brick side check
          ball.y + ball.size > brick.y && // top brick side check
          ball.y - ball.size < brick.y + brick.h // bottom brick side check
        ) {
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });
  // game over
  if (ball.y + ball.size > canvas.height) {
    showAllBricks();
    score = 0;
  }
}

function increaseScore() {
  score++;
  if (score % (brickRowCount * brickRowCount) === 0) {
    // no remainder
    showAllBricks();
  }
}

function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => (brick.visible = true));
  });
}

// Handle Key Events
function keyPressDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") paddle.dx = paddle.speed;
  else if (e.key === "Left" || e.key === "ArrowLeft") paddle.dx = -paddle.speed;
}

function keyPressUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

// Update Canvas
function update() {
  // update
  movePaddle();
  moveBall();
  // draw
  draw();
  requestAnimationFrame(update);
}

// Event Listeners
document.addEventListener("keydown", keyPressDown);
document.addEventListener("keyup", keyPressUp);
rulesButton.addEventListener("click", () => rules.classList.add("show"));
closeButton.addEventListener("click", () => rules.classList.remove("show"));

// Init
update();
function keyDown() {}
function keyUp() {}

// var downLock = false;
// function keyDown() {// pressed down arrow key
//   if (downLock) {
//     var event = new KeyboardEvent('keyup', {
//       bubbles: true,
//       cancelable: true,
//       key: 'ArrowDown', // or any other key you want to simulate
//       keyCode: 40, // or any other key code you want to simulate
//       which: 40, // or any other key code you want to simulate
//     });
//     document.dispatchEvent(event);
//     downLock = false;
//     document.getElementById("down_arrow").style.transform = "scale(1)";
//   } else {
//     var event = new KeyboardEvent('keydown', {
//       bubbles: true,
//       cancelable: true,
//       key: 'ArrowDown', // or any other key you want to simulate
//       keyCode: 40, // or any other key code you want to simulate
//       which: 40, // or any other key code you want to simulate
//     });
//     document.dispatchEvent(event);
//     downLock = true;
//     document.getElementById("down_arrow").style.transform = "scale(0.9)";
//   }
// }

// var upLock = false;
// function keyUp() {// pressed up arrow key
//   if (upLock) {
//     var event = new KeyboardEvent('keyup', {
//       bubbles: true,
//       cancelable: true,
//       key: 'ArrowUp', // or any other key you want to simulate
//       keyCode: 38, // or any other key code you want to simulate
//       which: 38, // or any other key code you want to simulate
//     });
//     document.dispatchEvent(event);
//     upLock = false;
//     document.getElementById("up_arrow").style.transform = "scale(1)";
//   } else {
//     var event = new KeyboardEvent('keydown', {
//       bubbles: true,
//       cancelable: true,
//       key: 'ArrowUp', // or any other key you want to simulate
//       keyCode: 38, // or any other key code you want to simulate
//       which: 38, // or any other key code you want to simulate
//     });
//     document.dispatchEvent(event);
//     upLock = true;
//     document.getElementById("up_arrow").style.transform = "scale(0.9)";
//   }
// }

var leftLock = false;
function keyLeft() {// pressed left arrow key
  if(rightLock) keyRight();
  if (leftLock) {
    var event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowLeft', // or any other key you want to simulate
      keyCode: 37, // or any other key code you want to simulate
      which: 37, // or any other key code you want to simulate
    });
    document.dispatchEvent(event);
    leftLock = false;
    document.getElementById("left_arrow").style.transform = "scale(1)";
  } else {
    var event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowLeft', // or any other key you want to simulate
      keyCode: 37, // or any other key code you want to simulate  
      which: 37, // or any other key code you want to simulate
    });
    document.dispatchEvent(event);
    leftLock = true;
    document.getElementById("left_arrow").style.transform = "scale(0.9)";
  }
}

var rightLock = false;
function keyRight() {// pressed right arrow key
  if(leftLock) keyLeft();
  if (rightLock) {
    var event = new KeyboardEvent('keyup', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowRight', // or any other key you want to simulate
      keyCode: 39, // or any other key code you want to simulate
      which: 39, // or any other key code you want to simulate
    });
    document.dispatchEvent(event);
    rightLock = false;
    document.getElementById("right_arrow").style.transform = "scale(1)";
  } else {
    var event = new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true,
      key: 'ArrowRight', // or any other key you want to simulate
      keyCode: 39, // or any other key code you want to simulate
      which: 39, // or any other key code you want to simulate
    });
    document.dispatchEvent(event);
    rightLock = true;
    document.getElementById("right_arrow").style.transform = "scale(0.9)";
  }
} 
//增加一个触摸屏幕事件，让Paddle水平移动距离和触摸点水平移动距离一致
var touchXstart = null;
var previousPosition = canvas.width/2-paddle.w/2;
function actionStart(e){
  e.preventDefault();
    //判断是鼠标左键点击还是触摸
  if(e.touches && touchXstart == null){//如果是触摸 touchXstart等于第一个touch点的x坐标
     touchXstart = e.touches[0].pageX;
  }else{//如果是鼠标 touchXstart等于鼠标的x坐标
     touchXstart = e.pageX;
  }
}
function actionEnd(e){
  e.preventDefault();
  touchXstart = null;
  previousPosition = paddle.x;
}
function actionMove(e){
  //e.preventDefault();
  var dist;
    //判断是鼠标左键点击还是触摸
    if(touchXstart != null){
      if(e.touches ){//如果是触摸 dist等于第一个touch点的x坐标x相对touchXstart的移动距离
        dist = e.touches[0].pageX - touchXstart;
     }else{//如果是鼠标 dist等于鼠标的x坐标x相对touchXstart的移动距离
        dist = e.pageX - touchXstart;
     }
     // dist 按照画布的放大比例缩放
   
    
      paddle.x = previousPosition + dist;
      if (paddle.x + paddle.w > canvas.width) paddle.x = canvas.width - paddle.w;
      if (paddle.x < 0) paddle.x = 0;
    }
    }
 

document.addEventListener('touchstart', actionStart);
document.addEventListener('touchend', actionEnd);
document.addEventListener('touchmove', actionMove);
//相应鼠标点击后移动的事件
document.addEventListener('mousedown', actionStart);
document.addEventListener('mouseup', actionEnd);
document.addEventListener('mousemove', actionMove);

