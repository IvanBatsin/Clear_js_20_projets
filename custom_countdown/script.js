const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

// Counter
const countdownEl = document.getElementById('countdown');
const countdownTitle = document.getElementById('countdown-title');
const countdownButton = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('ul>li>span');

// Complete
const completeEl = document.getElementById('complete');
const completeInfoEl = document.getElementById('complete-info');
const completeButton = document.getElementById('complete-button');

// Countdown value
let countDownTitle = '';
let countDownDate = '';
let countDownValue = Date;
let countdownActive;
let cachedCountdown;

// Times value
const second = 1000;
const minute =second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set date minimum with todays date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// Populate CountDown
function updateDOM(){
  const currentTime = new Date().getTime();
  const distance = countDownValue - currentTime;

  const days = Math.floor(distance / day);
  const hours = Math.floor((distance % day) / hour);
  const minutes = Math.floor((distance % hour) / minute);
  const seconds = Math.floor((distance % minute) / second);

  // Hide input
  inputContainer.hidden = true;

  // If countdown complete
  if (distance < 0){
    clearTimeout(countdownActive);
    countdownEl.hidden = true;
    completeEl.hidden = false;
    completeInfoEl.textContent = `${countDownTitle} finished on ${countDownDate}`;
  } else {
    // Populate countdown
    countdownTitle.textContent = `${countDownTitle}`;
    timeElements[0].textContent = days;
    timeElements[1].textContent = hours;
    timeElements[2].textContent = minutes;
    timeElements[3].textContent= seconds;
    // Show countdown
    countdownEl.hidden = false;

    countdownActive = setTimeout(() => {
      updateDOM();
    }, second);
  }
}

// Take values from form input
function updateCountDown(event){
  event.preventDefault();
  countDownTitle = event.srcElement[0].value;
  countDownDate = event.srcElement[1].value;
  // Check for validate
  if (!countdownTitle || !countDownDate){
    alert('All fields must be filled in');
  } else {
    // Create cache object
    cachedCountdown = {
      title: countDownTitle,
      date: countDownDate
    };
    localStorage.setItem('countdown', JSON.stringify(cachedCountdown));
    // Get number version of current date
    countDownValue = new Date(countDownDate).getTime();
    updateDOM();
  }
}

// Reset Countdown and all values
function reset(){
  // Hide countdown and show container with input
  completeEl.hidden = true;
  countdownEl.hidden = true;
  inputContainer.hidden = false;
  // Stop countdown
  clearTimeout(countdownActive);
  // Clear all values
  countDownTitle = '';
  countDownDate = '';
  // Clear localStorage
  localStorage.removeItem('countdown');
}

// Restore previos countdown
function restorePrevCountdown(){
  if (localStorage.getItem('countdown')){
    countDownTitle = JSON.parse(localStorage.getItem('countdown')).title;
    countDownDate = JSON.parse(localStorage.getItem('countdown')).date;
    countDownValue = new Date(countDownDate).getTime();
    updateDOM();
  }
}

restorePrevCountdown();

// Event listners
countdownForm.addEventListener('submit', updateCountDown);
countdownButton.addEventListener('click', reset);
completeButton.addEventListener('click', reset);