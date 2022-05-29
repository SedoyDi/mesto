import './index.css';
import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupDelete from '../scripts/components/PopupDelete.js';
import {
  templateCardSelector,

  listSelector,
  buttonAddCard,
  buttonChangeAvatar,
  buttonProfileEdit,

  popupAvatarSelector,
  popupProfileSelector,
  popupDeleteCardSelector,
  popupCreateCardSelector,
  popupFullScreenSelector,

  formCreateCard,
  formProfileEdit,
  formChangeAvatar,

  cardList,

  avatarSelector,
  aboutMeSelector,
  nickNameSelector,

  aboutMeInput,
  nickNameInput,
} from '../scripts/constants/constants.js';

const createElCard = (data) => {
  const idUser = userInfo.getIdUser();
  const newCard = new Card (
    templateCardSelector,
    data,
    idUser,
    () => popupWithImage.open(data),//handleCardClick
    (data) => {
      api.likeCard(data)
      .then((res) => {
      newCard.changeDataLikeCounter(res);
        newCard.checkLikeCounter(res);
        newCard.toggleLike();
      })
      .catch((err) => console.log(err))
    },                              //handleLikeActive
    (data) => {
      api.deleteLike(data)
      .then((res) => {
        newCard.changeDataLikeCounter(res);
        newCard.checkLikeCounter(res);
        newCard.toggleLike();
      })
      .catch((err) => console.log(err))
    },                              //handleLikeDelete
    (data) => { 
      popupDelete.open(data) 
    }                               //handleDeleteCard
  );
  const cardElement = newCard.createCard();
  return cardElement
};

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '9f932bbc-acd7-4dae-8249-c98552659f56',
    'content-type': 'application/json',
  }
});

const section = new Section ((el) => section.appendItems(createElCard(el)), cardList);
const userInfo = new UserInfo(avatarSelector, nickNameSelector, aboutMeSelector);
const popupDelete = new PopupDelete (popupDeleteCardSelector,
  (id) => {
  api.deleteCard(id)
    .then(() => {
    popupDelete.deleteCard()
    popupDelete.close();
  })
  .catch((err) => console.log(err))
  .finally(() => popupDelete.showLoadingMessage(false))
});

const popupWithImage = new PopupWithImage (popupFullScreenSelector);
const avatarValidator = new FormValidator(listSelector, formChangeAvatar);
const profileValidator = new FormValidator (listSelector,formProfileEdit);
const createCardValidator = new FormValidator (listSelector,formCreateCard);

const popupWithProfile = new PopupWithForm (popupProfileSelector,
  (data) => {
  api.patchDataUser(data)
  .then((res) => {
    userInfo.setUserInfo(res);
    popupWithProfile.close();
  })
  .catch((err) => console.log(err))
  .finally(() => popupWithProfile.showLoadingMessage(false))
});

const popupWithCreateCard = new PopupWithForm (popupCreateCardSelector,
  (data) => {
  api.postNewCard(data)
  .then((res) => {
    section.prependItems(createElCard(res))
    popupWithCreateCard.close()
  })
  .catch((err) => console.log(err))
  .finally(() => popupWithCreateCard.showLoadingMessage(false))
});

const popupChangeAvatar = new PopupWithForm (popupAvatarSelector,
  (data) => {
  api.patchAvatarUser(data)
  .then((res) => {
    userInfo.setUserInfo(res);
    popupChangeAvatar.close();
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => popupChangeAvatar.showLoadingMessage(false))
});

avatarValidator.enableValidation();
profileValidator.enableValidation();
createCardValidator.enableValidation();

buttonAddCard.addEventListener('click',() => {
  popupWithCreateCard.open();
  createCardValidator.resetValidation();
});
buttonProfileEdit.addEventListener('click',() => {
  const data = userInfo.getUserInfo();
  nickNameInput.value = data.name;
  aboutMeInput.value = data.about;
  popupWithProfile.open();
  profileValidator.resetValidation();
});
buttonChangeAvatar.addEventListener('click',() => {
  popupChangeAvatar.open();
  avatarValidator.resetValidation();
});

popupDelete.setEventListeners();
popupWithImage.setEventListeners();
popupWithProfile.setEventListeners();
popupChangeAvatar.setEventListeners();
popupWithCreateCard.setEventListeners();

api.getAllData()
  .then((res) => {
    const [dataCard, dataUser] = res;
    section.setItems(dataCard);
    userInfo.setUserInfo(dataUser);
    section.renderItems();
  })
  .catch((err) => {
    console.log(err)
  });