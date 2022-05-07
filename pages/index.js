import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  listSelector,
  initialCards,
  popupProfile,
  buttonProfileEdit,
  buttonClosePopupProfile,
  formProfileEdit,
  nickNameInput,
  nickName,
  profession,
  professionInput,
  popupCreateCard,
  buttonAddCard,
  buttonClosePopupCreateCard,
  formCreateCard,
  placeInput,
  placeLinkInput,
  popupFullScreen,
  buttonClosePopupFullScreen,
  cardList,
} from "../utils/utils.js";

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
    profileValidator.toggleButtonState();
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
    createCardValidator.toggleButtonState();
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