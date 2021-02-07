// NASA API
const count = 10;
const apiKey = 'DEMO_KEY';
const apiURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

// Globals variables
let resultArray;
let favorites = JSON.parse(localStorage.getItem('favorites')) || {};

// DOM elements
const $imageConatiner = document.querySelector('.images-container');
const $resultsNav = document.getElementById('resultsNav');
const $favoritesNav = document.getElementById('favoritesNav');
const $saveConfirmed = document.querySelector('.save-confirmed');
const $loader = document.querySelector('.loader');

// Add card to favorite
function saveFavorite(url){
  Object.keys(resultArray).forEach(item => {
    const obj = resultArray[item];
    if (obj.url.includes(url) && !favorites[url]) {
      favorites[url] = obj;
      $saveConfirmed.hidden = false;
      setTimeout(() => {
        $saveConfirmed.hidden = true;
      }, 2000);
    }
  });

  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Remove item from favorites and do rerender
function removeFavorite(url){
  if (favorites[url]){
    delete favorites[url];
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateDom('favorites');
  }
}

// Create new elements and append their to DOM
function updateDom(page){
  $imageConatiner.innerHTML = '';
  const source = page === 'results' ? resultArray : favorites;

  if (page !== 'results'){
    $resultsNav.classList.add('hidden');
    $favoritesNav.classList.remove('hidden');
  } else {
    $resultsNav.classList.remove('hidden');
    $favoritesNav.classList.add('hidden');
  }

  Object.keys(source).forEach(item => {
    const obj = source[item];

    const card = document.createElement('div');
    card.classList.add('card');

    // Link <a href="" title="View full images" target="_blank">
    const link = document.createElement('a');
    link.setAttribute('href', obj.hdurl);
    link.setAttribute('title', obj.title);
    link.setAttribute('target', '_blank');

    // Image from link <img class="card-img-top" src="" alt="Image!">
    const img = document.createElement('img');
    img.classList.add('card-img-top');
    img.setAttribute('src', obj.url);
    img.setAttribute('alt', 'NASA Picture');
    img.loading = 'lazy';

    // Link populate
    link.append(img);

    // Card body <div class="card-body">
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Card title <h5 class="card-title">Title of image</h5>
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = obj.title;

    // Add to favorites <p class="clickable">Add to favorites</p>
    const addFavorites = document.createElement('p');
    addFavorites.classList.add('clickable');
    addFavorites.textContent = 'Add to favorites';
    if (page === 'results'){
      addFavorites.setAttribute('onclick', `saveFavorite('${obj.url}')`);
      addFavorites.textContent = 'Add to favorites';
    } else {
      addFavorites.setAttribute('onclick', `removeFavorite('${obj.url}')`);
      addFavorites.textContent = 'Remove';
    }

    // Cart text <p class="card-text">
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = obj.explanation;

    // Small container <small class="text-muted">
    const small = document.createElement('small');
    small.classList.add('text-muted');

    // Date <strong>12-12-2020</strong>
    const date = document.createElement('strong');
    date.textContent = obj.date;

    // Copy <span>CopyRight Info</span>
    const copy = document.createElement('span');
    copy.textContent = ` ${obj.copyright}` || ' CopyRight Info';

    // Small container populate
    small.append(date, copy);
    // Card body populate
    cardBody.append(cardTitle, addFavorites, cardText, small);
    // Card populate
    card.append(link, cardBody);

    $imageConatiner.append(card)
  });
}


// Get 10 images from NASA API
const getImages = async function(){
  window.scrollTo({top:0 , behavior: 'instant'});
  $loader.classList.remove('hidden');
  try {
    const res = await fetch(apiURL);
    const data = await res.json();
    resultArray = data;
    updateDom('results');
    $loader.classList.add('hidden');
  } catch (err) {
    console.log(err);
  }
}

getImages();