var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
];

let currentWord = '';
let displayedWord = [];
let incorrectLetters = [];
let remainingGuesses = 10;
let wins = 0;
let losses = 0;
let previousWord = '';

const wordToGuessEl = document.getElementById('word-to-guess');
const previousWordEl = document.getElementById('previous-word');
const incorrectLettersEl = document.getElementById('incorrect-letters');
const remainingGuessesEl = document.getElementById('remaining-guesses');
const winsEl = document.getElementById('wins');
const lossesEl = document.getElementById('losses');

function startGame() {
  currentWord = words[Math.floor(Math.random() * words.length)];
  displayedWord = Array(currentWord.length).fill('_');
  incorrectLetters = [];
  remainingGuesses = 10;

  wordToGuessEl.textContent = displayedWord.join('');
  previousWordEl.textContent = previousWord;
  incorrectLettersEl.textContent = '';
  remainingGuessesEl.textContent = remainingGuesses;
}

document.addEventListener('keydown', function (event) {
  const letter = event.key.toLowerCase();

  if (!/^[a-z]$/.test(letter)) return;

  if (displayedWord.includes(letter) || incorrectLetters.includes(letter)) return;

  if (currentWord.includes(letter)) {
    for (let i = 0; i < currentWord.length; i++) {
      if (currentWord[i] === letter) {
        displayedWord[i] = letter;
      }
    }

    wordToGuessEl.textContent = displayedWord.join('');

    if (!displayedWord.includes('_')) {
      wins++;
      winsEl.textContent = wins;
      previousWord = currentWord;
      startGame();
    }
  } else {
    incorrectLetters.push(letter);
    incorrectLettersEl.textContent = incorrectLetters.join(', ');
    remainingGuesses--;
    remainingGuessesEl.textContent = remainingGuesses;

    if (remainingGuesses === 0){
      losses++;
      lossesEl.textContent = losses;
      previousWord = currentWord;
      startGame();
    }
  }

});

startGame();