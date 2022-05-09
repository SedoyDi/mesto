import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import {
  listSelector,
  initialCards,
  popupProfile,
  buttonProfileEdit,
  formProfileEdit,
  nickNameInput,
  nickName,
  profession,
  professionInput,
  popupCreateCard,
  buttonAddCard,
  formCreateCard,
  placeInput,
  placeLinkInput,
  cardList,
  popupFullScreen,
} from "../utils/utils.js";

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

const renderCard = (element) => {
  const popupWithImage = new PopupWithImage(popupFullScreen,element)
  popupWithImage.setEventListeners();
  const newCard = new Card (element, popupWithImage.open);
  section.addItems(newCard.createCard())
};

buttonProfileEdit.addEventListener('click', openProfile);
buttonAddCard.addEventListener('click',openCreateCard);
formProfileEdit.addEventListener('submit', submitProfile);
formCreateCard.addEventListener('submit',submitCreateCard);

const section = new Section ({items: initialCards, renderer: renderCard}, cardList);
section.renderItems();

const profileValidator = new FormValidator(listSelector,formProfileEdit);
profileValidator.enableValidation();

const createCardValidator = new FormValidator(listSelector,formCreateCard);
createCardValidator.enableValidation();