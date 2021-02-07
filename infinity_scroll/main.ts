const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

interface IPhotoObject {
  [key: string]: any
}
type GlobalPhotosArray = IPhotoObject[];
let photosArray: GlobalPhotosArray = [];

// loading settings
let isInitialLoad: boolean = true;
const initialCount: number = 5;
let ready: boolean = false;
let imagesLoaded: number = 0;
let totalImages: number = 0;

// Unsplash settings
const apiKey: string = 'UD6fnPswmW7OWjhhQV_MRV4MyIMtyeM-Xk-Q5qDrpxQ';
let unsplashURL: string = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateURL(count: number): void{
  unsplashURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
}

interface IAttributesObject {
  [key: string]: string
}
// Helper function that add attributes to elements
function setAttributs(element: HTMLElement, attrubutes: IAttributesObject){
  for(let key in attrubutes){
    element.setAttribute(key, attrubutes[key] ? attrubutes[key] : 'empty');
  }
}

function imageLoaded(){
  imagesLoaded++;
  if (imagesLoaded === totalImages){
    ready = true;
    isInitialLoad = false;
  }
}

// Create elements and append they to our html
function displayPhotos(){
  loader!.style.display = 'none';
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach(item => {

    // Create link element
    const a = document.createElement('a');
    setAttributs(a, {
      href: item.links.html, 
      target: '_blank'
    });
    
    // Create image element
    const img = document.createElement('img');
    setAttributs(img, {
      alt: item.alt_description,
      title: item.alt_description,
      src: item.urls.regular
    });

    // Event listener, check wich item image is finished
    img.addEventListener('load', imageLoaded);

    // Put image inside a element
    a.appendChild(img);
    imageContainer!.appendChild(a);
  });
}

// Check to see if scrolling near to bottom page
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
    getPhotos();
    ready = false;
  }
});

async function getPhotos(){
  try {
    const res = await fetch(unsplashURL);
    photosArray = await res.json();
    displayPhotos();
    if (isInitialLoad){
      updateURL(10);
      isInitialLoad = false;
    }
  } catch (err) {
    console.log(err);
  }
}

getPhotos();