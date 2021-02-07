const myApiKey = '0304edf431d94284afd71018a28488da';
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const jokeURL = 'https://sv443.net/jokeapi/v2/joke/Programming?type=single';

// Passing to joke to Speech RSS API
function tellMeTheJoke(joke){
  VoiceRSS.speech({
    key: myApiKey,
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0, 
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// Get jokes from joke API
async function getJoke(){
  toggleButton();
  try {
    const res = await fetch(jokeURL);
    const data = await res.json();
    let joke = '';
    if ('setup' in data && 'delivery'){
      joke = data.setup + ' ... ' + data.delivery;
    } else {
      joke = data.joke;
    }
    tellMeTheJoke(joke);
  } catch (err) {
    console.log(err);
  }
}

// Disable and Enable Button element
function toggleButton(){
  button.disabled = !button.disabled;
}

button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);