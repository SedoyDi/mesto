export const listSelector = {
    inputSelector: '.form__input',
    submitButtonSelector: '.submit-button',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input_type_error',
  };
  
export const initialCards = [
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
  
export const popupProfile = document.querySelector('#profile');
export const buttonProfileEdit = document.querySelector('.profile__edit');
export const buttonClosePopupProfile = document.querySelector('#close-btn-pup-profile');
export const formProfileEdit = document.querySelector('#profile-edit');
export const nickNameInput = document.querySelector('#name-input');
export const nickName = document.querySelector('.profile__nick-name');
export const profession = document.querySelector('.profile__profession');
export const professionInput = document.querySelector('#profession-input');
export const popupCreateCard = document.querySelector('#create-card');
export const buttonAddCard = document.querySelector('.profile__add-photo');
export const buttonClosePopupCreateCard = document.querySelector('#close-btn-pup-card');
export const formCreateCard = document.querySelector('#form-create');
export const placeInput = document.querySelector('#place-input');
export const placeLinkInput = document.querySelector('#place-link-input')
export const popupFullScreen = document.querySelector('#max-img');
export const buttonClosePopupFullScreen = document.querySelector('#close-btn-popup-max-img');
export const fullScrin = document.querySelector('.popup__max-img');
export const fullScrinTitle =document.querySelector('.popup__max-img-title');
export const cardList = document.querySelector('#card-list');