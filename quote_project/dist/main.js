"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const quoteConatner = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
function showLoadingSpiner() {
    loader.style.display = 'inline-block';
    quoteConatner.hidden = true;
}
function hideLoadingSpiner() {
    if (loader.style.display = 'inline-block') {
        loader.style.display = 'none';
        quoteConatner.hidden = false;
    }
}
function getQuote() {
    return __awaiter(this, void 0, void 0, function* () {
        const randomAPIquote = 'http://api.quotable.io/random';
        const proxyURL = 'https://cors-anywhere.herokuapp.com/';
        const apiURL = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
        showLoadingSpiner();
        try {
            const res = yield fetch(proxyURL + apiURL);
            const data = yield res.json();
            // Author name check
            if (data.quoteAuthor === '') {
                authorText.innerText = 'Unknown';
            }
            else {
                authorText.innerText = data.quoteAuthor;
            }
            // Quote length check
            if (data.quoteText.length > 50) {
                quoteText.classList.add('long-quote');
            }
            else {
                quoteText.classList.remove('long-quote');
            }
            quoteText.innerText = data.quoteText;
            hideLoadingSpiner();
        }
        catch (err) {
            getQuote();
            console.log(err);
        }
    });
}
function twitQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterURL, '_blank');
}
twitterBtn.addEventListener('click', twitQuote);
newQuoteBtn.addEventListener('click', getQuote);
getQuote();
