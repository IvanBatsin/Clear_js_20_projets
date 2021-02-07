const toggleSwitcher = document.querySelector('input[type="checkbox"]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const textBox = document.getElementById('text-box');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');

const imageStore = [image1, image2, image3];

// Change Image Style function
function changeImageStyle(current, update){
  imageStore.forEach(image => {
    const src = image.src.split('_'); // src array
    const mode = src[src.length - 1]; // mode (light.svg)
    src[src.length - 1] = mode.replace(current, update)
    image.src = src.join('_');
  });
}

// Function toggle dark and light mode
function toggleDarkLightMode(isDark){
  nav.style.backgroundColor = isDark ? 'rgba(66, 66, 66, .3)' : 'rgba(250, 250, 250, .3)';
  textBox.style.backgroundColor = isDark ? 'rgba(250, 250, 250, .3)' : 'rgba(0, 0, 0, .5)';
  toggleIcon.children[0].textContent = isDark ? 'Dark Mode' : 'Light Mode';

  if (isDark) {
    toggleIcon.children[1].classList.replace('fa-sun-o', 'fa-moon-o');
    changeImageStyle('light', 'dark');
    localStorage.setItem('theme', 'dark');
  } else {
    toggleIcon.children[1].classList.replace('fa-moon-o', 'fa-sun-o');
    changeImageStyle('dark', 'light');
    localStorage.setItem('theme', 'light');
  }
}


// Check localstorage and set theme
function checkLocalStorage(){
  if (localStorage.getItem('theme') && localStorage.getItem('theme') === 'dark'){
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleSwitcher.checked = true;
    toggleDarkLightMode(true);
  } else  if (localStorage.getItem('theme') && localStorage.getItem('theme') === 'light'){
    document.documentElement.setAttribute('data-theme', 'light');
    toggleDarkLightMode(false);
  }
}

// Change theme function
function switchTheme(event){
  if (event.target.checked){
    document.documentElement.setAttribute('data-theme', 'dark');
    toggleDarkLightMode(true);
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    toggleDarkLightMode(false);
  }
}

// Checking localstorage
checkLocalStorage();

// Event listener
toggleSwitcher.addEventListener('change', switchTheme);