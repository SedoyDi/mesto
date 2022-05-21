import './index.css';
import Api from "../scripts/components/Api.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  listSelector,
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

function openProfile (data) {
  nickNameInput.value = data.nickName;
  aboutMeInput.value = data.aboutMe;
  popupWithProfile.open();
  profileValidator.resetValidation();
};
function openCreateCard () {
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

function addNewCard (element) {
  cardList.prepend(createCard(element))
}

function submitCreateCard (element) { 
  addNewCard(element);
};
function submitProfile (element) {
 userInfo.setUserInfo(element);
};

const api = new Api ({
  url: "https://mesto.nomoreparties.co/v1/cohort-41",
  headers: {
    authorization: "9f932bbc-acd7-4dae-8249-c98552659f56",
    "content-type": "application/json",
  }
});

const userInfo = new UserInfo({nickNameSelector, aboutMeSelector});
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

api.getAllCard()
  .then((data) => {
  const section = new Section ({
    items: data,
    renderer: (el) => {section.addItems(createCard(el))}},
    cardList);
  section.renderItems();
  })
  .catch((err) => {
    console.log(err)
  });
