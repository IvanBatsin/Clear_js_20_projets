// Pages
const gamePage = document.getElementById('game-page');
const scorePage = document.getElementById('score-page');
const splashPage = document.getElementById('splash-page');
const countdownPage = document.getElementById('countdown-page');
// Splash Page
const startForm = document.getElementById('start-form');
const radioContainers = document.querySelectorAll('.radio-container');
const radioInputs = document.querySelectorAll('input');
const bestScores = document.querySelectorAll('.best-score-value');
// Countdown Page
const countdown = document.querySelector('.countdown');
// Game Page
const itemContainer = document.querySelector('.item-container');
// Score Page
const finalTimeEl = document.querySelector('.final-time');
const baseTimeEl = document.querySelector('.base-time');
const penaltyTimeEl = document.querySelector('.penalty-time');
const playAgainBtn = document.querySelector('.play-again');

// Time
let timer;
let timePlayed = 0;
let baseTime = 0;
let penaltyTime = 0;
let finalTime = 0;
let finalTimeDsiplay = '0.0s';

// Equations
let questionAmount = 0;
let equationsArray = [];
let playerGuessArray = [];
let bestScoreArray = JSON.parse(localStorage.getItem('best-score')) || [];

// Game Page
let firstNumber = 0;
let secondNumber = 0;
let equationObject = {};
const wrongFormat = [];
const operationType = ['plus', 'minus', 'multiplication', 'division'];

// Scroll
let valueY = 0;
const pixelScrollValue = 80;

// Refrash splash page best scores
function bestScoresToDOM(){
  for(let item in bestScoreArray){
    bestScores[item].textContent = `${bestScoreArray[item].bestScore}s`;
  }
}

// Check local storage and update score
function getBestScore(){
  if (!bestScoreArray.length){
    bestScoreArray = [
      { questions: 10, bestScore: 0 },
      { questions: 25, bestScore: 0 },
      { questions: 50, bestScore: 0 },
      { questions: 99, bestScore: 0 }
    ];
    localStorage.setItem('best-score', JSON.stringify(bestScoreArray));
  }
} 

// Update best score array
function updateBestScore(){
  bestScoreArray.forEach((item, index) => {
    // Select correct best score to update
    if (equationsArray.length === bestScoreArray[index].questions){
      // Return best score
      const savedBestScore = Number(item.bestScore);
      if (savedBestScore === 0 || savedBestScore > finalTime){
        bestScoreArray[index].bestScore = finalTime.toFixed(1);
      }
    }
  });
  bestScoresToDOM();
  localStorage.setItem('best-score', JSON.stringify(bestScoreArray));
}

// Reset the game
function playAgain(){
  getBestScore();
  updateBestScore();
  gamePage.addEventListener('click', startTimer);
  scorePage.hidden = true;
  splashPage.hidden = false;
  equationsArray = [];
  playerGuessArray = [];
  valueY = 0;
  playAgainBtn.hidden = true;
}

// Show score page
function showScorePage(){
  setTimeout(() => {
    playAgainBtn.hidden = false;
  }, 1000);
  gamePage.hidden = true;
  scorePage.hidden = false;
  scoreToDOM();
}

// Scores append to DOM
function scoreToDOM(){
  finalTimeDsiplay = finalTime.toFixed(1);
  baseTime = timePlayed.toFixed(1);
  penaltyTime = penaltyTime.toFixed(1);
  // Update text in elements
  finalTimeEl.textContent = finalTimeDsiplay + 's';
  baseTimeEl.textContent = `Base time: ${baseTime}s`;
  penaltyTimeEl.textContent = `Penalty time: +${penaltyTime}` + 's';
  // Get back position of itemContainer
  itemContainer.scrollTo({top: 0, behavior: 'instant'});
}

// Loop array and check wrong answers
function checkForFails(){
  for(let item in equationsArray){
    if (equationsArray[item].evaluated !== playerGuessArray[item]) {
      penaltyTime += 0.5;
    }
  }
}

// Stop timer, Process result, do to score page
function checkTime(){
  if (playerGuessArray.length === equationsArray.length){
    clearInterval(timer);
    // Check for wrong answers and add penalty time
    checkForFails();
    finalTime = timePlayed + penaltyTime;
    showScorePage();
  }
}

// Add a tenth of a second to timePlayed
function addTime(){
  timePlayed += 0.1;
  checkTime();
}

// Start times when game page is clicked
function startTimer(){
  // Reset times
  penaltyTime = 0;
  finalTime = 0;
  timePlayed = 0;
  timer = setInterval(addTime, 100);
  gamePage.removeEventListener('click', startTimer);
}

// Scroll and store user selections
function selectAnswer(event){
  valueY += pixelScrollValue;
  itemContainer.scroll(0, valueY);
  // Add player guess to array
  const currentAnswer = !event.target.classList.contains('wrong');
  return currentAnswer ? playerGuessArray.push('true') : playerGuessArray.push('false');
}


// Get random number up to the max number
function getRandomNumber(max){
  return Math.floor(Math.random() * Math.floor(max));
}

// Create Correct/Incorrect Random Equations
function createEquations() {
  // Randomly choose how many correct equations there should be
  const correctEquations = getRandomNumber(questionAmount);
  // Set amount of wrong equations
  const wrongEquations = questionAmount - correctEquations;
  // Loop through, multiply random numbers up to 9, push to array
  for (let i = 0; i < correctEquations; i++) {
    firstNumber = getRandomNumber(10);
    secondNumber = getRandomNumber(10);
    let equationValue;
    let equation;
    switch(operationType[getRandomNumber(4)]) {
      case 'plus': {
        equationValue = firstNumber + secondNumber;
        equation = `${firstNumber} + ${secondNumber} = ${equationValue}`;
        break;
      }
      case 'minus': {
        equationValue = firstNumber - secondNumber;
        equation = `${firstNumber} - ${secondNumber} = ${equationValue}`;
        break;
      }
      case 'multiplication': {
        equationValue = firstNumber * secondNumber;
        equation = `${firstNumber} * ${secondNumber} = ${equationValue}`;
        break;
      }
      case 'division': {
        equationValue = firstNumber / secondNumber;
        equation = `${firstNumber} / ${secondNumber} = ${equationValue}`;
        break;
      }
      default: {
        equationValue = firstNumber * secondNumber;
        equation = `${firstNumber} * ${secondNumber} = ${equationValue}`;
      }
    }
    equationObject = { value: equation, evaluated: 'true' };
    equationsArray.push(equationObject);
  }
  // Loop through, mess with the equation results, push to array
  for (let i = 0; i < wrongEquations; i++) {
    firstNumber = getRandomNumber(10);
    secondNumber = getRandomNumber(10);
    const equationValue = firstNumber * secondNumber;
    wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
    wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
    wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
    const formatChoice = getRandomNumber(3);
    const equation = wrongFormat[formatChoice];
    equationObject = { value: equation, evaluated: 'false' };
    equationsArray.push(equationObject);
  }

  equationsArray = shuffle(equationsArray);
  equationsToDOM();
}

// Add equations to DOM
function equationsToDOM(){
  equationsArray.forEach(obj => {
    const item = document.createElement('div');
    item.classList.add('item');

    const h1 = document.createElement('h1');
    h1.textContent = obj.value;

    // Populate item with h1 and item container with item
    item.append(h1);
    itemContainer.append(item);
  });
  countdownPage.hidden = true;
  gamePage.hidden = false;
}

// Dynamically adding correct/incorrect equations
function populateGamePage() {
  // Reset DOM, Set Blank Space Above
  itemContainer.textContent = '';
  // Spacer
  const topSpacer = document.createElement('div');
  topSpacer.classList.add('height-330');
  // Selected Item
  const selectedItem = document.createElement('div');
  selectedItem.classList.add('selected-item');
  // Append
  itemContainer.append(topSpacer, selectedItem);

  // Create Equations, Build Elements in DOM
  createEquations();

  // Set Blank Space Below
  const bottomSpacer = document.createElement('div');
  bottomSpacer.classList.add('height-500');
  itemContainer.appendChild(bottomSpacer);
}

// Start countdown
function startCountdown(){
  let count = 3;
  countdown.textContent = count;
  const timer = setInterval(() => {
    count--;
    countdown.textContent = count;
    if (count === 0){
      countdown.textContent = 'Start';
      clearInterval(timer);
      setTimeout(() => {
        populateGamePage();
      }, 400);
    }
  }, 1000);

}

// Turn the pages from splash page to countdown page
function showCountdown(){
  countdownPage.hidden = false;
  splashPage.hidden = true;
  startCountdown();
}

// Get value from selected radio button
function getRadioValue(){
  let radionValue;
  radioInputs.forEach(item => {
    if (item.checked) radionValue = item.value;
  });
  return radionValue;
}

// Form that decide amount of questions
function selectQuestionAmount(event){
  event.preventDefault();
  questionAmount = getRadioValue();
  if (questionAmount) showCountdown();
}

// Add event listeners
startForm.addEventListener('click', () => {
  radioContainers.forEach(item => {
    // Remove selected styling
    item.classList.remove('selected-label');
    // Add it back if radio input is checked
    if (item.children[1].checked){
      item.classList.add('selected-label');
    }
  });
});

startForm.addEventListener('submit', selectQuestionAmount);
const buttons = document.querySelectorAll('.item-footer>button');
buttons.forEach(item => {
  item.addEventListener('click', selectAnswer);
});

gamePage.addEventListener('click', startTimer);
playAgainBtn.addEventListener('click', playAgain);

// On Load
getBestScore();
bestScoresToDOM();