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
  popupDeleteCard,
} from '../scripts/utils/utils.js';


function openDeleteCard (data) {
  popupDelete.open(data)
};

function submitDeleteCard (id) {
  api.deleteCard(id)
  .then()
  .catch((err) => {
    console.log(err)
  })
}

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

function createElCard(data) {
  if (data.owner._id === 'fce53b24c8688f9bda5eb610'){
    const newCard = new UserCard (
      data,
      () => {
      popupWithImage.open(data)
      },
      openDeleteCard
    );
    const cardElement = newCard.createCard() ;
    newCard.checkLikeCounter();
    return cardElement
  }else{
    const newCard = new Card (
      data,
      () => {
      popupWithImage.open(data)
    });
    const cardElement = newCard.createCard() ;
    newCard.checkLikeCounter();
    return cardElement
  }
}

function addNewCard (data) {
  cardList.prepend(createElCard(data))
}

function submitCreateCard (data) {
  api.postNewCard(data)
  .then((res) =>{
      addNewCard(res)
  })
  .catch((err) => {
    console.log(err)
  })
};

function submitProfile (data) {
 userInfo.setUserInfo(data);
};

const api = new Api ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-41',
  headers: {
    authorization: '9f932bbc-acd7-4dae-8249-c98552659f56',
    'content-type': 'application/json',
  }
});

const popupDelete = new PopupDelete (popupDeleteCard, submitDeleteCard)
const popupWithImage = new PopupWithImage (popupFullScreen)
const profileValidator = new FormValidator (listSelector,formProfileEdit);
const createCardValidator = new FormValidator (listSelector,formCreateCard);
const popupWithProfile = new PopupWithForm (popupProfile, submitProfile)
const popupWithCreateCard = new PopupWithForm (popupCreateCard, submitCreateCard)

profileValidator.enableValidation();
createCardValidator.enableValidation();

buttonAddCard.addEventListener('click',openCreateCard);
popupDelete.setEventListeners();
popupWithImage.setEventListeners();
popupWithProfile.setEventListeners();
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
  .then((data) => {
    const userInfo = new UserInfo({
      nickNameSelector,
      aboutMeSelector
    },
    data);
    buttonProfileEdit.addEventListener('click',() => {
      openProfile(userInfo.getUserInfo())
    });
  })
