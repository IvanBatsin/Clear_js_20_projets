const $form = document.getElementById('form');
const $password = document.getElementById('password');
const $passwordConf = document.getElementById('password-confirm');
const $messageContainer = document.querySelector('.message-container');
const $message = document.getElementById('message');

let isValid = false;
let passwordMatch = true;

// Styling and set message text
function stylingMessage(text, color){
  $message.textContent = text;
  $message.style.color = color;
  $messageContainer.style.borderColor = color;
}

function validateForm(){
  // Using constraint API
  isValid = $form.checkValidity();
  // Style message 
  if (!isValid){
    stylingMessage('Please fill out all fields', 'red');
    return false;
  }
  
  if ($password.value !== $passwordConf.value){
    stylingMessage('Password are not equal', 'red');
    passwordMatch = false;
    return false;
  } else passwordMatch = true;

  if (isValid && passwordMatch){
    stylingMessage('All Goods!', 'green');
    return true;
  }
} 

function storeFormData(){
  const user = {
    name: form.name.value,
    phone: form.phone.value,
    email: form.email.value,
    website: form.website.value,
    password: form.password[0].value,
  };
  console.log(user);
}

// work with form data
function processFormDate(event){
  event.preventDefault();
  // Validate form
  if (validateForm()){
    storeFormData();
  }
}

// Event listener
$form.addEventListener('submit', processFormDate);