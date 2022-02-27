
const openButton = document.querySelector('.profile__edit');
const closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

function popupOpen() {
    popup.classList.add('popup_opened');
};

function popupClose() {
    popup.classList.remove('popup_opened');
}

openButton.addEventListener('click', popupOpen);
closeButton.addEventListener('click', popupClose);

let formElement = document.querySelector('.popup__form');

let nameInput = document.querySelector('.popup__form_nickname-input');
let jobInput = document.querySelector('.popup__form_profession-input');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    let nickname = document.querySelector('.profile__nickname');
    let profesion = document.querySelector('.profile__profession');
    nickname.textContent = nameInput.value;
    profesion.textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);

