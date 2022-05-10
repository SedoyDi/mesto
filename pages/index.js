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
  profileValidator.toggleButtonState();
};
const openCreateCard = () => {
  popupWithCreateCard.open();
  createCardValidator.toggleButtonState();
}
const renderCard = (element) => {
  const popupWithImage = new PopupWithImage(popupFullScreen,element)
  popupWithImage.setEventListeners();
  const newCard = new Card (element, popupWithImage.open);
  section.addItems(newCard.createCard())
};
const submitCreateCard = (element) => { 
  renderCard(element);
};
const submitProfile = (element) => {
 userInfo.setUserInfo(element);
};
const userInfo = new UserInfo({nickNameSelector, aboutMeSelector});
const section = new Section ({items: initialCards, renderer: renderCard}, cardList);
section.renderItems();
const profileValidator = new FormValidator(listSelector,formProfileEdit);
profileValidator.enableValidation();
const createCardValidator = new FormValidator(listSelector,formCreateCard);
createCardValidator.enableValidation();
const popupWithProfile = new PopupWithForm (popupProfile, submitProfile)
const popupWithCreateCard = new PopupWithForm (popupCreateCard, submitCreateCard)

buttonProfileEdit.addEventListener('click',() => {
  openProfile(userInfo.getUserInfo())
});
buttonAddCard.addEventListener('click',openCreateCard);
popupWithProfile.setEventListeners();
popupWithCreateCard.setEventListeners();