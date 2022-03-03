
const openButton = document.querySelector('.profile__edit');
const closeButton = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#prof');
let nickname = document.querySelector('.profile__nickname');
let profesion = document.querySelector('.profile__profession');

function openPopup() {
    nameInput.value = nickname.textContent;
    jobInput.value =profesion.textContent;
    popup.classList.add('popup_opened');
};

function closePopup() {
    popup.classList.remove('popup_opened');
}

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    nickname.textContent = nameInput.value;
    profesion.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

