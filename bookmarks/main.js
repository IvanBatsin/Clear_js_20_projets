const $modalContainer = document.getElementById('modal');
const $showModal = document.getElementById('show-modal');
const $closeModal = document.getElementById('close-modal');
const $bookmarksConatiner = document.getElementById('bookmarks-container');

// Form elements
const $bookmarkForm = document.getElementById('bookmark-form');
const $websiteName = document.getElementById('website-name');
const $websiteURL = document.getElementById('website-url');

// Global bookmarks store
const bookmarksStore = JSON.parse(localStorage.getItem('bookmarks')) || [];

// Show Modal Window and focus on first input
function showModal(){
  $modalContainer.classList.add('show-modal');
  $websiteName.focus();
}

// Close Modal Window from click to window
function closeModalAtWindowClick(event){
  if (event.target.classList.contains('modal-container')){
    $modalContainer.classList.remove('show-modal');
    render();
  }
}

// Validate forms fileds
function validateFields(name, url){
  if (!name){
    alert('Enter website name');
    return false;
  } 

  if (url.search(/https?:\/\/.+\.\w{2,5}/) === -1) {
    $websiteURL.value = '';
    alert('Enter corrent website url');
    return false
  } 

  return true;
}

// Store new bookmark
function storeBookmark(event){
  event.preventDefault();
  const nameValue = $websiteName.value.trim();
  const urlValue = $websiteURL.value.trim().replace(' ', '');
  if (!validateFields(nameValue, urlValue)){
    return false;
  }
  bookmarksStore.push({
    name: nameValue,
    url: urlValue
  });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarksStore));
  $websiteName.value = '';
  $websiteURL.value = '';
}

// Close modal
function closeModal(){
  $modalContainer.classList.remove('show-modal')
}

// Delete item bookmark
function deleteBookmark(url){
  bookmarksStore.forEach((item, index) => {
    if (item.url === url) bookmarksStore.splice(index, 1);
  });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarksStore));
  render();
}

// Render bookmars
function render(){
  $bookmarksConatiner.innerHTML = '';
  bookmarksStore.forEach(item => {
    // div class="item"
    const $itemContainer = document.createElement('div');
    $itemContainer.classList.add('item');

    // i class="fas fa-times"
    const $closeIcon = document.createElement('i');
    $closeIcon.classList.add('fas', 'fa-times');
    $closeIcon.setAttribute('title', 'Delete item');
    $closeIcon.setAttribute('id', 'delete-bookmark');
    $closeIcon.setAttribute('onclick', `deleteBookmark('${item.url}')`);

    // div class="name"
    const $infoContainer = document.createElement('div');
    $infoContainer.classList.add('name');

    // i class="fab (my icon)"
    const $siteImg = document.createElement('img');
    $siteImg.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${item.url}`);
    $siteImg.setAttribute('alt', 'FavIcon')

    // a href="(my href)"
    const $siteLink = document.createElement('a');
    $siteLink.setAttribute('href', item.url);
    $siteLink.setAttribute('target', '_blank');
    $siteLink.textContent = item.name;

    // Append 
    $infoContainer.append($siteImg, $siteLink);
    $itemContainer.append($closeIcon, $infoContainer);
    $bookmarksConatiner.appendChild($itemContainer);
  });
}

// Event listeners
$showModal.addEventListener('click', showModal);
$closeModal.addEventListener('click', closeModal);
window.addEventListener('click', closeModalAtWindowClick);
$bookmarkForm.addEventListener('submit', storeBookmark);

// On Load
render();