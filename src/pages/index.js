import './index.css';
import Api from '../scripts/components/Api.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupDelete from '../scripts/components/PopupDelete.js';
import { 
  addNewCard,
  createElCard
} from '../scripts/utils/utils.js';
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

export const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '9f932bbc-acd7-4dae-8249-c98552659f56',
    'content-type': 'application/json',
  }
});

const section = new Section ((el) => section.addItems(createElCard(el)), cardList);
export const userInfo = new UserInfo(nickNameSelector, aboutMeSelector);
export const popupDelete = new PopupDelete (popupDeleteCard,
  (id) => {
  api.deleteCard(id)
    .then((res) => {
    popupDelete.deleteCard()
    section.setItems(res)
    popupDelete.close();
  })
  .catch((err) => console.log(err))
  .finally(() => popupDelete.showDownloadMessage(false))
});

export const popupWithImage = new PopupWithImage (popupFullScreen);
const avatarValidator = new FormValidator(listSelector, formChangeAvatar);
const profileValidator = new FormValidator (listSelector,formProfileEdit);
const createCardValidator = new FormValidator (listSelector,formCreateCard);
const popupWithProfile = new PopupWithForm (popupProfile,
  (data) => {
  api.patchDataUser(data)
  .then((res) => {
    userInfo.getUserInfo();
    userInfo.setUserInfo(res);
    popupWithProfile.close();
  })
  .catch((err) => console.log(err))
  .finally(() => popupWithProfile.showDownloadMessage(false))
});

const popupWithCreateCard = new PopupWithForm (popupCreateCard,
  (data) => {
  api.postNewCard(data)
  .then((res) => {
    addNewCard(res)
    popupWithCreateCard.close()
  })
  .catch((err) => console.log(err))
  .finally(() => popupWithCreateCard.showDownloadMessage(false))
});
const popupChangeAvatar = new PopupWithForm (popupAvatar,
  (data) => {
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
buttonChengeAvatar.addEventListener('click',() => {
  const data = userInfo.getUserInfo();
  avatarInput.value = data.avatar;
  popupChangeAvatar.open();
  avatarValidator.resetValidation();
});

popupDelete.setEventListeners();
popupWithImage.setEventListeners();
popupWithProfile.setEventListeners();
popupChangeAvatar.setEventListeners();
popupWithCreateCard.setEventListeners();

api.getAllCard()
  .then((res) => {
    section.setItems(res)
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