import { Card } from "./Card.js";
import { FormValidator, listSelector } from "./FormValidator.js";

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const popupProfile = document.querySelector('#profile');
const buttonProfileEdit = document.querySelector('.profile__edit');
const buttonClosePopupProfile = document.querySelector('#close-btn-pup-profile');
const formProfileEdit = document.querySelector('#profile-edit');
const nickNameInput = document.querySelector('#name-input');
const nickName = document.querySelector('.profile__nick-name');
const profession = document.querySelector('.profile__profession');
const professionInput = document.querySelector('#profession-input');
const popupCreateCard = document.querySelector('#create-card');
const buttonAddCard = document.querySelector('.profile__add-photo');
const buttonClosePopupCreateCard = document.querySelector('#close-btn-pup-card');
const formCreateCard = document.querySelector('#form-create');
const placeInput = document.querySelector('#place-input');
const placeLinkInput = document.querySelector('#place-link-input')
export const popupFullScreen = document.querySelector('#max-img');
const buttonClosePopupFullScreen = document.querySelector('#close-btn-popup-max-img');
export const fullScrin = document.querySelector('.popup__max-img');
export const fullScrinTitle =document.querySelector('.popup__max-img-title');
const cardList = document.querySelector('#card-list');

function closeByClick (e) {
    if (!e.target.closest('.popup-content')){
      closePopup(e.target.closest('.popup'));
    }
};

function closeByEscape (evt) {
    if(evt.key === 'Escape'){
      const popupActiv = document.querySelector('.popup_opened');
      closePopup(popupActiv);
    };
};

function closePopup (popup) {
    popup.classList.remove('popup_opened');
    popup.removeEventListener('click', closeByClick);
    document.removeEventListener('keydown', closeByEscape);
};

export function openPopup (popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('click', closeByClick);
    document.addEventListener('keydown', closeByEscape);
}

function openProfile () {
    nickNameInput.value = nickName.textContent;
    professionInput.value = profession.textContent;
    profileValidator.enableValidation();
    openPopup(popupProfile);
};

function submitProfile (evt){
    evt.preventDefault(); 
    nickName.textContent = nickNameInput.value
    profession.textContent = professionInput.value
    closePopup(popupProfile);
};

function closeProfile (){
    closePopup (popupProfile)
};

function openCreateCard () {
    createCardValidator.enableValidation();
    openPopup(popupCreateCard);
};

const submitCreateCard = (evt) => {
    evt.preventDefault();
    renderCard({name: placeInput.value, link: placeLinkInput.value});
    formCreateCard.reset()
    closePopup(popupCreateCard);
};

function closeCreateCard () {
    closePopup(popupCreateCard)
};

const renderCard = (element) => {
    const newCard = new Card (element);
    const newElement = newCard.createCard();
    cardList.prepend(newElement)
};

function closePopupFullScreen (){
    closePopup(popupFullScreen);
};

buttonProfileEdit.addEventListener('click', openProfile);
buttonClosePopupProfile.addEventListener('click', closeProfile);
buttonAddCard.addEventListener('click',openCreateCard);
buttonClosePopupCreateCard.addEventListener('click', closeCreateCard);
buttonClosePopupFullScreen.addEventListener('click', closePopupFullScreen);
formProfileEdit.addEventListener('submit', submitProfile);
formCreateCard.addEventListener('submit',submitCreateCard);

initialCards.forEach(renderCard);

const profileValidator = new FormValidator(listSelector,formProfileEdit);
profileValidator.enableValidation();

const createCardValidator = new FormValidator(listSelector,formCreateCard);
createCardValidator.enableValidation();




