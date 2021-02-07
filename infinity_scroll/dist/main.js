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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var imageContainer = document.getElementById('image-container');
var loader = document.getElementById('loader');
var photosArray = [];
// loading settings
var isInitialLoad = true;
var initialCount = 5;
var ready = false;
var imagesLoaded = 0;
var totalImages = 0;
// Unsplash settings
var apiKey = 'UD6fnPswmW7OWjhhQV_MRV4MyIMtyeM-Xk-Q5qDrpxQ';
var unsplashURL = "https://api.unsplash.com/photos/random/?client_id=" + apiKey + "&count=" + initialCount;
function updateURL(count) {
    unsplashURL = "https://api.unsplash.com/photos/random/?client_id=" + apiKey + "&count=" + count;
}
// Helper function that add attributes to elements
function setAttributs(element, attrubutes) {
    for (var key in attrubutes) {
        element.setAttribute(key, attrubutes[key] ? attrubutes[key] : 'empty');
    }
}
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = true;
        isInitialLoad = false;
    }
}
// Create elements and append they to our html
function displayPhotos() {
    loader.style.display = 'none';
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(function (item) {
        // Create link element
        var a = document.createElement('a');
        setAttributs(a, {
            href: item.links.html,
            target: '_blank'
        });
        // Create image element
        var img = document.createElement('img');
        setAttributs(img, {
            alt: item.alt_description,
            title: item.alt_description,
            src: item.urls.regular
        });
        // Event listener, check wich item image is finished
        img.addEventListener('load', imageLoaded);
        // Put image inside a element
        a.appendChild(img);
        imageContainer.appendChild(a);
    });
}
// Check to see if scrolling near to bottom page
window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        getPhotos();
        ready = false;
    }
});
function getPhotos() {
    return __awaiter(this, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(unsplashURL)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    photosArray = _a.sent();
                    displayPhotos();
                    if (isInitialLoad) {
                        updateURL(10);
                        isInitialLoad = false;
                    }
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
getPhotos();
