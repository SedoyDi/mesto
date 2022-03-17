const closeButtonList = document.querySelectorAll('.popup__close-button');
const initialCards = [
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

const cardlist = document.querySelector('#cardlist');
const templatecard = document.querySelector('#templatecard').content;

const formProffile = document.querySelector('#profile-edit');
const openProffileButton = document.querySelector('.profile__edit');
const popupProffile = document.querySelector('#proffile');
const nicknameInput = document.querySelector('#name');
const profesionInput = document.querySelector('#prof');
const nickname = document.querySelector('.profile__nickname');
const profesion = document.querySelector('.profile__profession');
const saveButton = document.querySelector('#saveButton');

const formCreateCard = document.querySelector('#formCreate');
const openCreateCardButton = document.querySelector('.profile__add-photo');
const popupCreateCard = document.querySelector('#createCard');
const placeInput = document.querySelector('#place');
const placeImgLink = document.querySelector('#placeLink');
const popupImg = document.querySelector('#max-img');


initialCards.forEach(function (element) {  
    const cardElement = templatecard.cloneNode(true);
    const imgElement = cardElement.querySelector('.photo-grid__image');
    const enlargedImgTitle = document.querySelector('.popup__max-img-title');

    imgElement.alt = element.name;
    imgElement.src = element.link;
    imgElement.addEventListener('click', (evt) => {
      const enlargedImg = document.querySelector('.popup__max-img');
      enlargedImg.alt = element.name;
      enlargedImg.src = element.link;
      enlargedImgTitle.textContent = element.name;
      popupImg.classList.add('popup_opened');
    });
    cardElement.querySelector('.photo-grid__title').textContent = element.name;
    cardElement.querySelector('.photo-grid__like-button').addEventListener('click', evt =>
      evt.target.classList.toggle('photo-grid__like-button_active')
    );
    cardElement.querySelector('.photo-grid__delete-button').addEventListener('click', evt =>
      evt.target.closest('.photo-grid__element').remove()
    );
    cardlist.append(cardElement);
});

closeButtonList.forEach(elt =>
  elt.addEventListener('click', () => elt.closest('.popup').classList.remove('popup_opened'))
);
function openProffile() {
    nicknameInput.value = nickname.textContent;
    profesionInput.value =profesion.textContent;
    popupProffile.classList.add('popup_opened');
};
function openCreateCard () {
    popupCreateCard.classList.add('popup_opened');
};

openCreateCardButton.addEventListener('click', openCreateCard);
openProffileButton.addEventListener('click', openProffile);

function formSubmitProffile (evt) {
  evt.preventDefault(); 
  nickname.textContent = nicknameInput.value;
  profesion.textContent = profesionInput.value;
  popupProffile.classList.remove('popup_opened');
}

formProffile.addEventListener('submit', formSubmitProffile);

function formSubmitCreateCard (evt) {
  evt.preventDefault();
  const cardElement = templatecard.cloneNode(true);
  const imgElement = cardElement.querySelector('.photo-grid__image');
  const enlargedImgTitle = document.querySelector('.popup__max-img-title');

  imgElement.alt = placeInput.value;
  imgElement.src = placeImgLink.value;
  imgElement.addEventListener('click', (evt) => {
    const enlargedImg = document.querySelector('.popup__max-img');
    enlargedImg.alt = placeInput.value;
    enlargedImg.src = placeImgLink.value;
    enlargedImgTitle.textContent = placeInput.value;
    popupImg.classList.add('popup_opened');
  });
  cardElement.querySelector('.photo-grid__title').textContent = placeInput.value;
  cardElement.querySelector('.photo-grid__like-button').addEventListener('click', evt =>
    evt.target.classList.toggle('photo-grid__like-button_active')
  );
  cardElement.querySelector('.photo-grid__delete-button').addEventListener('click', evt =>
    evt.target.closest('.photo-grid__element').remove()
  );
  cardlist.prepend(cardElement);
  popupCreateCard.classList.remove('popup_opened')
};
formCreateCard.addEventListener('submit', formSubmitCreateCard);