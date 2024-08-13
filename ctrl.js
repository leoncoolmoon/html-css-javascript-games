// 创建样式
const style = document.createElement('style');
style.textContent = `
  .ctrl {
    display: none;
  }

  .arrow_button {
    background-color: #8f7a663b;
    color: black;
    border-radius: 3px;
    border: 1px solid #8f7a66;
    outline: 1px solid #8f7a66;
    box-shadow: 1px 1px 5px #8f7a66;
    width: 10%;
    text-align: center;
    padding: 2%;
    font-size: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 0 5px;
    width: auto;
  }

  .arrow_button:hover {
    background-color: rgba(255, 255, 255, 0.7);
  }

  .first_line_virtual_keybroad {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 20px;
  }

  .second_line_virtual_keybroad {
    display: flex;
    justify-content: space-between;
  }

  .virtual_keybroad {
    color: #ffffff;
    position: absolute;
    width: 85%;
    top: 60%;
    height: 20%;
    left: 50%;
    transform: translateX(-50%);
  }

  #oriantationCtl {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    justify-content: space-around;
    top: 60%;
    width: 100%;
  }

  #virtual_keybroad {
    flex-direction: column;
  }
`;

// 将样式添加到文档头部
document.head.appendChild(style);

var ori_threashold = 15;
function createVirtualKeyboard() {
    // 创建感应控制主容器
    const oriantationCtl = document.createElement('div');
    oriantationCtl.id = 'oriantationCtl';
    oriantationCtl.className = 'ctrl second_line_virtual_keybroad';

    // 创建Reset Orientation按钮
    const resetOriantation = document.createElement('div');
    resetOriantation.id = 'reset_oriantation';
    resetOriantation.className = 'arrow_button';
    resetOriantation.onclick = resetOriantation;
    resetOriantation.textContent = 'Reset Oriantation';
    oriantationCtl.appendChild(resetOriantation);

    // 创建Use virtual keybroad按钮
    const showVirtualKeybroad = document.createElement('div');
    showVirtualKeybroad.id = 'show_virtual_keybroad';
    showVirtualKeybroad.className = 'arrow_button';
    showVirtualKeybroad.onclick = showKeybroad;
    showVirtualKeybroad.textContent = 'Use virtual keybroad';
    oriantationCtl.appendChild(showVirtualKeybroad);
    // 将虚拟键盘添加到文档中
    document.body.appendChild(oriantationCtl);

    // 创建虚拟键盘主容器
    const virtualKeyboard = document.createElement('div');
    virtualKeyboard.className = 'virtual_keybroad ctrl';
    virtualKeyboard.id = 'virtual_keybroad';

    // 创建第一行（上箭头）
    const firstLine = document.createElement('div');
    firstLine.className = 'first_line_virtual_keybroad';

    const upArrow = createArrowButton('up_arrow', 0, 'keyUp');
    firstLine.appendChild(upArrow);

    // 创建第二行（左、下、右箭头）
    const secondLine = document.createElement('div');
    secondLine.className = 'second_line_virtual_keybroad';

    const leftArrow = createArrowButton('left_arrow', -90, 'keyLeft');
    const downArrow = createArrowButton('down_arrow', 180, 'keyDown');
    const rightArrow = createArrowButton('right_arrow', 90, 'keyRight');

    secondLine.appendChild(leftArrow);
    secondLine.appendChild(downArrow);
    secondLine.appendChild(rightArrow);

    // 将行添加到主容器
    virtualKeyboard.appendChild(firstLine);
    virtualKeyboard.appendChild(secondLine);

    // 将虚拟键盘添加到文档中
    document.body.appendChild(virtualKeyboard);
}

function createArrowButton(id, rotation, onclickFunction) {
    const button = document.createElement('div');
    button.className = 'arrow_button';
    button.id = id;
    button.onclick = window[onclickFunction];

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '60');
    svg.setAttribute('height', '60');
    svg.setAttribute('viewBox', '0 0 10 10');

    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('transform', `rotate(${rotation}, 5,5)`);

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M5,4 L7,6 L3,6 L5,4');

    g.appendChild(path);
    svg.appendChild(g);
    button.appendChild(svg);

    return button;
}
function displayCtrl() {
    if (hasPhysicalKeyboard()) {
        console.log("Physical keyboard likely present");
        // Hide virtual keyboard
        document.getElementById("virtual_keybroad").style.display = "none";
        toggleOrientationListener(false);
    } else {
        console.log("Physical keyboard likely not present");
        if (hasOrientationSensor()) {
            console.log("Device has an orientation sensor");
            document.getElementById("oriantationCtl").style.display = "flex";
            document.getElementById("virtual_keybroad").style.display = "none";
            toggleOrientationListener(true);
        } else {
            console.log("Device does not have an orientation sensor");
            // You can add code here for devices without an orientation sensor
            document.getElementById("virtual_keybroad").style.display = "block";
            document.getElementById("oriantationCtl").style.display = "none";
            toggleOrientationListener(false);
        }
    }
}
// 调用此函数来创建虚拟键盘

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
                            window.addEventListener('deviceorientation', function (event) {
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
                window.addEventListener('deviceorientation', function (event) {
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

function toggleOrientationListener(switchOn) {
    if (isOrientationListenerActive && !switchOn) {
        window.removeEventListener('deviceorientation', handleOrientation);
        isOrientationListenerActive = false;
        console.log("Orientation listener turned off");
    } else {
        resetOriantation().then(() => {
            window.addEventListener('deviceorientation', handleOrientation);
            isOrientationListenerActive = true;
            console.log("Orientation listener turned on");
        });
    }
}
function showKeybroad() {
    toggleOrientationListener(false);
    document.getElementById("virtual_keybroad").style.display = "block";
    document.getElementById("oriantationCtl").style.display = "none";
}
let baseAlpha = 0;
let baseBeta = 0;
let baseGamma = 0;
let isOrientationListenerActive = false;

function resetOriantation() {
    return new Promise((resolve) => {
        if (window.DeviceOrientationEvent) {
            const orientationHandler = function (event) {
                baseAlpha = event.alpha || 0;
                baseBeta = event.beta || 0;
                baseGamma = event.gamma || 0;

                window.removeEventListener('deviceorientation', orientationHandler);
                console.log("Orientation reset. Base values:", { alpha: baseAlpha, beta: baseBeta, gamma: baseGamma });
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
var lockout = false;
var lockoutInterval;
function handleOrientation(event) {
    let relativeAlpha = event.alpha - baseAlpha;
    let relativeBeta = event.beta - baseBeta;
    let relativeGamma = event.gamma - baseGamma;

    // Normalize values
    relativeAlpha = (relativeAlpha + 180) % 360 - 180;
    relativeBeta = Math.max(-90, Math.min(90, relativeBeta));
    relativeGamma = Math.max(-90, Math.min(90, relativeGamma));

    console.log("Relative orientation:", { alpha: relativeAlpha, beta: relativeBeta, gamma: relativeGamma });

    // Here you can add code to control your game based on these values
    // For example:
    if (!lockout) {
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
        lockout = true;
        // Lock out for 2 second to prevent accidental movement,reset the lockout after 1 second
        lockoutInterval = setInterval(() => {
            lockout = false;
            clearInterval(lockoutInterval);
        }, 2000);


    }

    //reset the lockout when return to initial position
    if (Math.abs(relativeGamma) < ori_threashold && Math.abs(relativeBeta) < ori_threashold) {
        lockout = false;
        if (lockoutInterval != null) {
            clearInterval(lockoutInterval);
        }
    }
}
function stopVirtualKeyboard() {
    lockout = true;
    lockoutInterval = null;
}
function resumeVirtualKeyboard() {
    lockout = false;
}
createVirtualKeyboard();
displayCtrl();

