import './index.css';
import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import UserCard from '../scripts/components/UserCard.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupDelete from '../scripts/components/PopupDelete.js';
import {
  listSelector,
  buttonAddCard,
  buttonChengeAvatar,
  buttonProfileEdit,

  popupAvatar,
  popupProfile,
  popupDeleteCard,
  popupCreateCard,
  popupFullScreen,

  formCreateCard,
  formProfileEdit,
  formChangeAvatar,

  cardList,

  aboutMeSelector,
  nickNameSelector,

  avatarInput,
  aboutMeInput,
  nickNameInput,
} from '../scripts/constants/constants.js';

function openPopupDeleteCard (data) {
  popupDelete.open(data)
};

function openPopupProfile (data) {
  nickNameInput.value = data.name;
  aboutMeInput.value = data.about;
  popupWithProfile.open();
  profileValidator.resetValidation();
};

function openPopupCreateCard () {
  popupWithCreateCard.open();
  createCardValidator.resetValidation();
};

function openPopupChangeAvatar (data) {
  avatarInput.value = data.avatar;
  popupChangeAvatar.open();
  avatarValidator.resetValidation();
}

function createElCard(data) {
  const idUser = userInfo.getIdUser();
  if (data.owner._id === idUser){
    const newCard = new UserCard (
      data,
      idUser,
      () => popupWithImage.open(data),//handleCardClick
      (data) => {
        api.likeCard(data)
        .then((res) => {
          newCard.checkLikeCounter(res)
        })
        .catch((err) => console.log(err))
      },                              //colbackLikeActive
      (data) => {
        api.deleteLike(data)
        .then((res) => {
          newCard.checkLikeCounter(res)
        })
        .catch((err) => console.log(err))
      },                              //colbackLikeDelete
      openPopupDeleteCard,
    );
    newCard.checkLikeStatus();
    newCard.checkLikeCounter(data);
    const cardElement = newCard.createCard() ;
    return cardElement
  }else{
    const newCard = new Card (
      data,
      idUser,
      () => popupWithImage.open(data),//handleCardClick
      (data) => {
        api.likeCard(data)
        .then((res) => {
          newCard.checkLikeCounter(res)
        })
        .catch((err) => console.log(err))
      },                              //colbackLikeActive
      (data) => {
        api.deleteLike(data)
        .then((res) => {
          newCard.checkLikeCounter(res)
        })
        .catch((err) => console.log(err))
      },                              //colbackLikeDelete
    );
    newCard.checkLikeStatus();
    newCard.checkLikeCounter(data);
    const cardElement = newCard.createCard();
    return cardElement
  }
};

function addNewCard (data) {
  cardList.prepend(createElCard(data))
};

function submitCreateCard (data) {
  api.postNewCard(data)
  .then((res) => {
    addNewCard(res)
    popupWithCreateCard.close()
  })
  .catch((err) => console.log(err))
  .finally(() => popupWithCreateCard.showDownloadMessage(false))
};

function submitDeleteCard (id, method) {
  api.deleteCard(id)
  .then(() => {
    method;
    popupDelete.close();
  })
  .catch((err) => console.log(err))
  .finally(() => popupDelete.showDownloadMessage(false))
};

function submitProfile (data) {
  api.patchDataUser(data)
  .then((res) => {
    userInfo.getUserInfo();
    userInfo.setUserInfo(res);
    popupWithProfile.close();
  })
  .catch((err) => console.log(err))
  .finally(() => popupWithProfile.showDownloadMessage(false))
};

function submitChengeAvatar (data) {
  api.patchAvatarUser(data)
  .then((res) => {
    userInfo.getUserInfo();
    userInfo.setUserInfo(res);
    popupChangeAvatar.close();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => popupChangeAvatar.shshowDownloadMessage(false))
};

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '9f932bbc-acd7-4dae-8249-c98552659f56',
    'content-type': 'application/json',
  }
});

const userInfo = new UserInfo(nickNameSelector, aboutMeSelector);
const popupDelete = new PopupDelete (popupDeleteCard, submitDeleteCard);
const popupWithImage = new PopupWithImage (popupFullScreen);
const avatarValidator = new FormValidator(listSelector, formChangeAvatar);
const profileValidator = new FormValidator (listSelector,formProfileEdit);
const createCardValidator = new FormValidator (listSelector,formCreateCard);
const popupWithProfile = new PopupWithForm (popupProfile, submitProfile);
const popupWithCreateCard = new PopupWithForm (popupCreateCard, submitCreateCard);
const popupChangeAvatar = new PopupWithForm (popupAvatar,submitChengeAvatar);

avatarValidator.enableValidation();
profileValidator.enableValidation();
createCardValidator.enableValidation();

buttonAddCard.addEventListener('click',openPopupCreateCard);
buttonProfileEdit.addEventListener('click',() => openPopupProfile(userInfo.getUserInfo()));
buttonChengeAvatar.addEventListener('click',() => openPopupChangeAvatar(userInfo.getUserInfo()));

popupDelete.setEventListeners();
popupWithImage.setEventListeners();
popupWithProfile.setEventListeners();
popupChangeAvatar.setEventListeners();
popupWithCreateCard.setEventListeners();

api.getAllCard()
  .then((data) => {
  const section = new Section ({
    items: data,
    renderer: (el) => {
      section.addItems(createElCard(el))
    }},
    cardList);
  section.renderItems();
  })
  .catch((err) => {
    console.log(err)
  });

api.getUserData()
  .then((res) => {
    userInfo.setUserInfo(res);
  })
  .catch((err) => {
    console.log(err)
  });