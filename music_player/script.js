// Player elements
const music = document.getElementById('audio');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('start');
const nextBtn = document.getElementById('next');

// Player UI
const image = document.getElementById('music-img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

// Progressbar
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

// Time 
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// Music
let currentSongIndex = 0;
const songsStore = [
  {
    name: 'jacinto-1',
    displayName: 'Machine chill music',
    artist: 'Unknown artist'
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army',
    artist: 'Corry Assight'
  },
  {
    name: 'jacinto-3',
    displayName: 'Exodus',
    artist: '$uicide boy$'
  },
  {
    name: 'metric-1',
    displayName: 'Enter Sandman',
    artist: 'Mettalica'
  }
];

// Check if playing
let isPlaying = false;

// Play
function playSong(){
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-stop');
  playBtn.setAttribute('title', 'Stop');
  music.play();
}

// Pause
function puaseSong(){
  isPlaying = false;
  playBtn.classList.replace('fa-stop', 'fa-play');
  playBtn.setAttribute('title', 'Start');
  music.pause();
}

// Set progress bar time
function setProgressBar(event){
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const {duration} = music;
  music.currentTime = (clickX/width) * duration;
}

//   EVENTS
// Play or pause event listner
playBtn.addEventListener('click', () => isPlaying ? puaseSong() : playSong());
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

// Function to work with time and append it to element
function correntTimeAndAppend(element, time){
  const durationMinutes = Math.floor(time/60);
  let durationSeconds = Math.floor(time%60);
  durationSeconds < 10 ? durationSeconds = `0${durationSeconds}` : durationSeconds;
  // Delay switching duration element to avoid NaN
  if (durationSeconds) element.textContent = `${durationMinutes}:${durationSeconds}`; 
}

// Update progress bar and time
function updateProgressBar(event){
  if (isPlaying){
    const {duration, currentTime} = event.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = progressPercent + '%';
    // Update time UI for duration
    correntTimeAndAppend(durationEl, duration);
    // // Update time UI for current time
    correntTimeAndAppend(currentTimeEl, currentTime);
  }
}

// Change song (NEXT)
function nextSong(){
  currentSongIndex + 1 < songsStore.length ? currentSongIndex++ : currentSongIndex = 0;
  loadSong(songsStore[currentSongIndex]);
  playSong();
}

// Change song (PREV)
function prevSong(){
  currentSongIndex - 1 >= 0 ? currentSongIndex-- : currentSongIndex = songsStore.length - 1;
  loadSong(songsStore[currentSongIndex]);
  playSong();
}

// Update DOM
function loadSong(song){
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

loadSong(songsStore[currentSongIndex]);