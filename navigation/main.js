const menuBar = document.getElementById('menu-bar');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');

const navsStore = [nav1, nav2, nav3, nav4, nav5];

// Change Class Animation
function navsClassChange(inOut){
  if (inOut === 'in'){
    navsStore.forEach((item, index) => {
      item.classList.replace(`slide-out-${index + 1}`, `slide-in-${index + 1}`);
    });
  } else if (inOut === 'out') {
    navsStore.forEach((item, index) => {
      item.classList.replace(`slide-in-${index + 1}`, `slide-out-${index + 1}`);
    });
  }
}

// Toggle Navigation Open\Close
function toggleNav(){
  // Open || Close
  menuBar.classList.toggle('change');
  // Toggle Menu Active
  overlay.classList.toggle('overlay-active');
  if (overlay.classList.contains('overlay-active')){
    overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
    // Animate In
    navsClassChange('in');
  } else {
    overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
    // Animate out
    navsClassChange('out');
  }
}

// Event listeners
menuBar.addEventListener('click', toggleNav);
navsStore.forEach(item => item.addEventListener('click', toggleNav));