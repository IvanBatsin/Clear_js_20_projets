const $playerScore = document.getElementById('playerScore');
const $playerChoise = document.getElementById('playerChoise');
const $computerScore = document.getElementById('computerScore');
const $computerChoise = document.getElementById('computerChoise');
const $resultText = document.getElementById('resultText');
const $resetBtn = document.getElementById('reset');

// Player shapes
const $playerRock = document.getElementById('rockPlayer');
const $playerSpock = document.getElementById('spockPlayer');
const $playerScissors = document.getElementById('scissorsPlayer');
const $playerLizard = document.getElementById('lizardPlayer');
const $playerPaper = document.getElementById('paperPlayer');

// Computer shapes
const $computerRock = document.getElementById('rockComputer');
const $computerSpock = document.getElementById('spockComputer');
const $computerScissors = document.getElementById('scissorsComputer');
const $computerLizard = document.getElementById('lizardComputer');
const $computerPaper = document.getElementById('paperComputer');

// Gloval variables
const allGameIcons = document.querySelectorAll('.far');
const playerChance = [$playerRock, $playerScissors, $playerSpock, $playerPaper, $playerLizard];
const computerChance = [$computerRock, $computerScissors, $computerSpock, $computerPaper, $computerLizard];
const choices = {
  rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
  paper: { name: 'Paper', defeats: ['rock', 'spock'] },
  scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
  lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
  spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};
let computerChoise = '';
let playerScoreNumber = 0;
let computerScoreNumber = 0;

// Event listeners
$resetBtn.addEventListener('click', resetGame);
playerChance.forEach(item => {
  item.addEventListener('click', () => selectItem(item.title));
});

// Clear scores and text message
function resetGame(){
  playerScoreNumber = 0;
  computerScoreNumber = 0;
  $resultText.textContent = 'Start new game!';
  $computerScore.textContent = computerScoreNumber;
  $playerScore.textContent = computerScoreNumber;
  $playerChoise.textContent = ' --- Choise';
  $computerChoise.textContent = ' --- Choise';
  document.querySelectorAll('.far').forEach(item => item.classList.remove('selected'));
}

// Remove all selected classes except player choice
function drawPlayerChoise(name, side = 'player'){
  if (side === 'player'){
    $playerChoise.textContent = ` --- ${name}`;
    playerChance.forEach(item => {
      if (item.title === name.toLowerCase()){
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  } else {
    $computerChoise.textContent = ` --- ${name}`;
    computerChance.forEach(item => {
      if (item.title === name.toLowerCase()){
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
  }
}

// Computer random choise 
function computerRandomChoise(){
  const randomChoiseNumber = Math.random();
  if (randomChoiseNumber < 0.2) computerChoise = 'rock';
  else if (randomChoiseNumber > 0.2 && randomChoiseNumber < 0.4) computerChoise = 'paper';
  else if (randomChoiseNumber >= 0.4 && randomChoiseNumber < 0.6) computerChoise = 'scissors';
  else if (randomChoiseNumber >= 0.6 && randomChoiseNumber < 0.8) computerChoise = 'lizard';
  else if (randomChoiseNumber >= 0.8) computerChoise = 'spock';
} 

// Select player choise and add selected class
function selectItem(playerChoise){
  computerRandomChoise();
  drawPlayerChoise(playerChoise);
  drawPlayerChoise(computerChoise, 'computer');
  updateScore(playerChoise, computerChoise);
}

// Check result, update score and textmessage
function updateScore(playerChoise){
  if (playerChoise === computerChoise){
    $resultText.textContent = 'Its a tie.';
  } else {
    const choise = choices[playerChoise];
    if (choise.defeats.indexOf(computerChoise) > -1){
      $resultText.textContent = 'Player win!';
      playerScoreNumber++;
      $playerScore.textContent = playerScoreNumber;
    } else {
      $resultText.textContent = 'Player lost!';
      computerScoreNumber++;
      $computerScore.textContent = computerScoreNumber;
    }
  }
}

import {start} from './export.js'
start();