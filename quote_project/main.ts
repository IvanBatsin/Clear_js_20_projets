const quoteConatner = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpiner(): void{
  loader!.style.display = 'inline-block';
  quoteConatner!.hidden = true;
}

function hideLoadingSpiner(): void{
  if (loader!.style.display = 'inline-block'){
    loader!.style.display = 'none';
    quoteConatner!.hidden = false;
  }
}

async function getQuote(){
  const randomAPIquote = 'http://api.quotable.io/random';
  const proxyURL: string = 'https://cors-anywhere.herokuapp.com/';
  const apiURL: string = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  showLoadingSpiner();
  try {
    const res = await fetch(proxyURL + apiURL);
    const data = await res.json();

    // Author name check
    if (data.quoteAuthor === ''){
      authorText!.innerText = 'Unknown';
    } else {
      authorText!.innerText = data.quoteAuthor;
    }

    // Quote length check
    if (data.quoteText.length > 50){
      quoteText!.classList.add('long-quote');
    } else {
      quoteText!.classList.remove('long-quote');
    }

    quoteText!.innerText = data.quoteText; 
    hideLoadingSpiner();
  } catch (err) {
    getQuote();
    console.log(err);
  }
}

function twitQuote(){
  const quote = quoteText!.innerText;
  const author = authorText!.innerText;
  const twitterURL: string = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterURL, '_blank');
}

twitterBtn!.addEventListener('click', twitQuote);
newQuoteBtn!.addEventListener('click', getQuote);

getQuote();