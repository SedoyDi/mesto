const closeButtonList = document.querySelectorAll('.popup__close-button');
const cardlist = document.querySelector('#card-list');
const templatecard = document.querySelector('#template-card').content;
const formProfile = document.querySelector('#profile-edit');
const openProfileButton = document.querySelector('.profile__edit');
const popupProfile = document.querySelector('#profile');
const nicknameInput = document.querySelector('#name');
const profesionInput = document.querySelector('#prof');
const nickname = document.querySelector('.profile__nick-name');
const profesion = document.querySelector('.profile__profession');
const saveButton = document.querySelector('#save-button');
const formCreateCard = document.querySelector('#form-create');
const openCreateCardButton = document.querySelector('.profile__add-photo');
const popupCreateCard = document.querySelector('#create-card');
const placeInput = document.querySelector('#place');
const placeImgLink = document.querySelector('#plac-link');
const popupImg = document.querySelector('#max-img');

initialCards.forEach(function (element) {  
    const cardElement = templatecard.cloneNode(true);
    const imgElement = cardElement.querySelector('.card__image');
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
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__like-button').addEventListener('click', evt =>
      evt.target.classList.toggle('card__like-button_active')
    );
    cardElement.querySelector('.card__delete-button').addEventListener('click', evt =>
      evt.target.closest('.card').remove()
    );
    cardlist.append(cardElement);
});

closeButtonList.forEach(elt =>
  elt.addEventListener('click', () => elt.closest('.popup').classList.remove('popup_opened'))
);
function openProfile() {
    nicknameInput.value = nickname.textContent;
    profesionInput.value =profesion.textContent;
    popupProfile.classList.add('popup_opened');
};
function openCreateCard () {
    popupCreateCard.classList.add('popup_opened');
};

openCreateCardButton.addEventListener('click', openCreateCard);
openProfileButton.addEventListener('click', openProfile);

function formSubmitProffile (evt) {
  evt.preventDefault(); 
  nickname.textContent = nicknameInput.value;
  profesion.textContent = profesionInput.value;
  popupProfile.classList.remove('popup_opened');
}

formProfile.addEventListener('submit', formSubmitProffile);

function formSubmitCreateCard (evt) {
  evt.preventDefault();
  const cardElement = templatecard.cloneNode(true);
  const imgElement = cardElement.querySelector('.card__image');
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
  cardElement.querySelector('.card__title').textContent = placeInput.value;
  cardElement.querySelector('.card__like-button').addEventListener('click', evt =>
    evt.target.classList.toggle('card__like-button_active')
  );
  cardElement.querySelector('.card__delete-button').addEventListener('click', evt =>
    evt.target.closest('.card').remove()
  );
  cardlist.prepend(cardElement);
  popupCreateCard.classList.remove('popup_opened')
};
formCreateCard.addEventListener('submit', formSubmitCreateCard);