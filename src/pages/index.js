import './index.css';
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  listSelector,
  initialCards,
  popupProfile,
  buttonProfileEdit,
  formProfileEdit,
  popupCreateCard,
  buttonAddCard,
  formCreateCard,
  cardList,
  popupFullScreen,
  nickNameSelector,
  aboutMeSelector,
  nickNameInput,
  aboutMeInput,
} from "../scripts/utils/utils.js";

const openProfile = (data) =>{
  nickNameInput.value = data.nickName;
  aboutMeInput.value = data.aboutMe;
  popupWithProfile.open();
  profileValidator.resetValidation();
};
const openCreateCard = () => {
  popupWithCreateCard.open();
  createCardValidator.resetValidation();
}

function createCard(element) {
  const newCard = new Card (element, () => {
    popupWithImage.open(element)
  });
  const cardElement = newCard.createCard() ;
  return cardElement
}
const addNewCard = (element) => {
  cardList.prepend(createCard(element))
}

const renderCard = (element) => {
  section.addItems(createCard(element))
};
const submitCreateCard = (element) => { 
  addNewCard(element);
};
const submitProfile = (element) => {
 userInfo.setUserInfo(element);
};

const userInfo = new UserInfo({nickNameSelector, aboutMeSelector});
const section = new Section ({items: initialCards, renderer: renderCard}, cardList);
const popupWithImage = new PopupWithImage(popupFullScreen)
const profileValidator = new FormValidator(listSelector,formProfileEdit);
const createCardValidator = new FormValidator(listSelector,formCreateCard);
const popupWithProfile = new PopupWithForm (popupProfile, submitProfile)
const popupWithCreateCard = new PopupWithForm (popupCreateCard, submitCreateCard)

profileValidator.enableValidation();
createCardValidator.enableValidation();
buttonProfileEdit.addEventListener('click',() => {
  openProfile(userInfo.getUserInfo())
});
buttonAddCard.addEventListener('click',openCreateCard);
popupWithImage.setEventListeners();
popupWithProfile.setEventListeners();
popupWithCreateCard.setEventListeners();
section.renderItems();