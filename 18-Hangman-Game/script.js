const wordElement = document.getElementById("word");
const wrongLettersElement = document.getElementById("wrong-letters");
const playAgainButton = document.getElementById("play-button");
const definitionButton = document.getElementById("def-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);
const figureParts = document.querySelectorAll(".figure-part");

const words = [
  "application",
  "programming",
  "interface",
  "wizard",
  "element",
  "prototype",
  "callback",
  "undefined",
  "arguments",
  "settings",
  "selector",
  "container",
  "instance",
  "response",
  "console",
  "constructor",
  "token",
  "function",
  "return",
  "length",
  "type",
  "node",
];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let playable = true;

const correctLetters = [];
const wrongLetters = [];
async function fetchRandomWord() {
  const response = await fetch('https://random-word-api.herokuapp.com/word');
  const randomWord = await response.json();
  return randomWord[0]; // 返回随机单词
}
function displayWord() {
  wordElement.innerHTML = `
    ${selectedWord
      .split("") // to array
      .map(
        (letter) => `
    <span class="letter">
    ${correctLetters.includes(letter) ? letter : ""}
    </span>
    `
      )
      .join("")} 
    `; // to string
  const innerWord = wordElement.innerText.replace(/\n/g, "");
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won! 😃";
    finalMessageRevealWord.innerText = "";
    popup.style.display = "flex";
    playable = false;
  }
}

function updateWrongLettersElement() {
  wrongLettersElement.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    index < errors
      ? (part.style.display = "block")
      : (part.style.display = "none");
  });
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost. 😕";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = "flex";
    playable = false;
  }
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}
function press(letter){
  if (playable) {
    if (letter >= "a" && letter <= "z") {
      if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrongLettersElement();
        } else {
          showNotification();
        }
      }
    }
  }
}

window.addEventListener("keypress", (e) => {
 press (e.key.toLowerCase());
});

playAgainButton.addEventListener("click", async () => {
  playable = true;
  correctLetters.splice(0);
  wrongLetters.splice(0);
  //selectedWord = words[Math.floor(Math.random() * words.length)];
   selectedWord = await fetchRandomWord();
  displayWord();
  updateWrongLettersElement();
  popup.style.display = "none";
});
definitionButton.addEventListener("click", async () => {
  const word = selectedWord;
  if (!word) return;

  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
  const data = await response.json();

  const resultContent = document.getElementById('resultContent');
  resultContent.innerHTML = formatResult(data);
  
  document.getElementById('resultContainer').classList.remove('hidden');
  document.body.classList.remove('hidden-result');
});
function formatResult(data) {
  if (!data || data.length === 0 || data.title === 'No Definitions Found') return 'No results found.';
  
  const wordData = data[0];
  let resultHTML = `<h2>${wordData.word}</h2>`;
  resultHTML += `<p><strong>Phonetic:</strong> ${wordData.phonetic || 'N/A'}</p>`;

  if (wordData.origin) {
      resultHTML += `<p><strong>Origin:</strong> ${wordData.origin}</p>`;
  }

  resultHTML += '<h3>Meanings:</h3>';
  wordData.meanings.forEach(meaning => {
      resultHTML += `<p><strong>${meaning.partOfSpeech}</strong></p>`;
      meaning.definitions.forEach(def => {
          resultHTML += `<p> - ${def.definition}</p>`;
          if (def.example) {
              resultHTML += `<p><em>Example:</em> ${def.example}</p>`;
          }
      });
  });

  return resultHTML;
}
document.getElementById('closeButton').addEventListener('click', () => {
  document.getElementById('resultContainer').classList.add('hidden');
  document.body.classList.add('hidden-result');
});
// Init
displayWord();
function hasPhysicalKeyboard() {
  return !('ontouchstart' in window) || // works on most browsers 
         (navigator.maxTouchPoints === 0) || // works on IE10/11 and Surface
         (navigator.msMaxTouchPoints === 0); // works on IE10/11 and Surface
}
function virtualKeyEvent(key) {
  //console.log(`Key pressed: ${key}`);
  press (key.toLowerCase());
  // Add your custom logic here for handling virtual key presses
}
function createVirtualKeyboard(divElement) {
  // Check if a physical keyboard is present
  if (!hasPhysicalKeyboard()) {
    // Physical keyboard is not present, create virtual keyboard
    const keyboard = document.createElement('div');
    keyboard.style.display = 'flex';
    keyboard.style.flexWrap = 'wrap';
    keyboard.style.justifyContent = 'center';
    keyboard.style.padding = '10px';
    keyboard.style.position = 'absolute';
    keyboard.style.top = '60vh';
    keyboard.style.width = '100vw';
    keyboard.style.left = '0';
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    letters.split('').forEach(letter => {
      const button = document.createElement('button');
      button.textContent = letter;
      button.style.margin = '5px';
      button.style.padding = '10px 15px';
      button.style.fontSize = '18px';
      button.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
      button.style.border = 'none';
      button.style.borderRadius = '5px';
      button.style.boxShadow = '0 0 0 1px rgba(0, 0, 0, 0.25)';
      button.style.cursor = 'pointer';
    

      button.addEventListener('click', () => {
        virtualKeyEvent(letter);
      });

      keyboard.appendChild(button);
    });

    divElement.appendChild(keyboard);
  } else {
    console.log('Physical keyboard detected. Virtual keyboard not created.');
  }
}
createVirtualKeyboard(document.getElementById('virtual_keyboard'));
