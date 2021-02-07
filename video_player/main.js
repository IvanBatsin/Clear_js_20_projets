const $player = document.querySelector('.player');
const $video = document.querySelector('video');
const $progressRange = document.querySelector('.progress-range');
const $progressBar = document.querySelector('.progress-bar');
const $playBtn = document.getElementById('play-btn');
const $volumeIcon = document.getElementById('volume-icon');
const $volumeRange = document.querySelector('.volume-range');
const $volumeBar = document.querySelector('.volume-bar');
const $currentTime = document.querySelector('.elapsed');
const $duration = document.querySelector('.duration');
const $fullscreenBtn = document.getElementById('fullscreen');
const $selectSpped = document.getElementById('speed');

// Times contants
const second = 1;
const minut = second * 60;
const hour = minut * 60;


//                      Play and pause
// Show play icon in player
function showPlayIcon(){
  $playBtn.classList.replace('fa-pause', 'fa-play');
  $playBtn.setAttribute('title', 'Play');
}

// Start video
function togglePlay(){
  if ($video.paused){
    $video.play();
    $playBtn.classList.replace('fa-play', 'fa-pause');
    $playBtn.setAttribute('title', 'Pause');
  } else {
    $video.pause();
    showPlayIcon();
  }
}


//          Progress Time
// Claculate display duration time format
function displayFormat(time){
  const minutes = Math.floor(time / minut);
  let seconds  = Math.floor(time % minut);
  seconds < 10 ? seconds = `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

// Update progress bar as vidoe plays
function updateProgress() {
  $progressBar.style.width = `${($video.currentTime/$video.duration) * 100}%`;
  $currentTime.textContent = `${displayFormat($video.duration)} / `;
  $duration.textContent = `${displayFormat($video.currentTime)}`;
}

// Change progress time
function setProgress(event){
  const percents = (event.offsetX / event.src$videoent.clientWidth) * 100;
  $progressBar.style.width = `${percents}%`;
  $video.currentTime = ($video.duration / 100) * percents; 
}

// Render volume icon (volume: number)
function changeVolumeIcon(volume){
  $volumeIcon.className = '';
  if (volume > 0.7){
    $volumeIcon.classList.add('fas', 'fa-volume-up');
    $volumeIcon.setAttribute('title', 'Volume Up');
  } else if (volume < 0.7 && volume > 0){
    $volumeIcon.classList.add('fas', 'fa-volume-down');
    $volumeIcon.setAttribute('title', 'Volume Down');
  } else {
    $volumeIcon.classList.add('fas', 'fa-volume-mute');
    $volumeIcon.setAttribute('title', 'Mute');
  }
}

// Change volume
// flag that show volume
let lastVolume = 1;
function setVolume(event){
  let percents = event.offsetX / event.src$videoent.clientWidth;
  if (percents > 0.9) percents = 1;
  if (percents < 0.1) percents = 0;
  $video.volume = percents;
  lastVolume = $video.volume;
  $volumeBar.style.width = `${percents * 100}%`;

  changeVolumeIcon($video.volume);
}

// Mute/Unmute
function toogleVolume(){
  if ($video.volume > 0){
    lastVolume = $video.volume;
    $video.volume = 0;
    $volumeBar.style.width = 0;
    changeVolumeIcon($video.volume);
  } else {
    $video.volume = lastVolume;
    $volumeBar.style.width = `${lastVolume * 100}%`;
    changeVolumeIcon($video.volume);
  }
}

// Set video speed
function setSpeed(event){
  $video.playbackRate = +event.target.value;
}


/* View in fullscreen */
function openFullscreen() {
  if ($player.requestFullscreen) {
    $player.requestFullscreen();
  } else if ($player.webkitRequestFullscreen) { /* Safari */
    $player.webkitRequestFullscreen();
  } else if ($player.msRequestFullscreen) { /* IE11 */
    $player.msRequestFullscreen();
  }
  $video.classList.add('video-fullscreen');
  $fullscreenBtn.classList.replace('fa-expand', 'fa-compress-arrows-alt');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  $video.classList.remove('video-fullscreen');
  $fullscreenBtn.classList.replace('fa-compress-arrows-alt', 'fa-expand');
}

// Toggle fullscreen 
let fullScreen = false;
function toggleFullscreen(){
  !fullScreen ? openFullscreen() : closeFullscreen();
  fullScreen = !fullScreen;
}

// Event listener
$playBtn.addEventListener('click', togglePlay);
$video.addEventListener('click', togglePlay);
$video.addEventListener('ended', showPlayIcon);
$video.addEventListener('timeupdate', updateProgress);
$video.addEventListener('canplay', updateProgress);
$progressRange.addEventListener('click', setProgress);
$volumeRange.addEventListener('click', setVolume);
$volumeIcon.addEventListener('click', toogleVolume);
$selectSpped.addEventListener('change', setSpeed);
$fullscreenBtn.addEventListener('click', toggleFullscreen);

// On load
