const popupProfile = document.querySelector('#profile');
const buttonProfileEdit = document.querySelector('.profile__edit');
const buttonClosePopupProfile = document.querySelector('#close-btn-pup-profile');
const formProfileEdit = document.querySelector('#profile-edit');
const nickNameInput = document.querySelector('#name-input');
const nickName = document.querySelector('.profile__nick-name');
const profession = document.querySelector('.profile__profession');
const professionInput = document.querySelector('#profession-input');
const popupCreateCard = document.querySelector('#create-card');
const buttonAddCard = document.querySelector('.profile__add-photo');
const buttonClosePopupCreateCard = document.querySelector('#close-btn-pup-card');
const formCreateCard = document.querySelector('#form-create');
const placeInput = document.querySelector('#place-input');
const placeLinkInput = document.querySelector('#place-link-input')
const popupFullScreen = document.querySelector('#max-img');
const buttonClosePopupFullScreen = document.querySelector('#close-btn-popup-max-img');
const fullScrin = document.querySelector('.popup__max-img');
const fullScrinTitle =document.querySelector('.popup__max-img-title');
const templateCard = document.querySelector('#template-card').content;
const cardList = document.querySelector('#card-list');

function closePopup (popup) {
    popup.classList.remove('popup_opened');
};

function openPopup (popup) {
    popup.classList.add('popup_opened');
}

function closeClickOverlay (e){
  if (!e.target.closest('.popup-content')){
    closePopup(e.target.closest('.popup'));
  }
};

function openProfile () {
    nickNameInput.value = nickName.textContent;
    professionInput.value = profession.textContent;
    openPopup(popupProfile);
    popupProfile.addEventListener('click', closeClickOverlay)
};

function submitProfile (evt){
    evt.preventDefault(); 
    nickName.textContent = nickNameInput.value
    profession.textContent = professionInput.value
    closePopup(popupProfile);
};

function closeProfile (){
    closePopup (popupProfile)
};

function openCreateCard () {
    formCreateCard.reset()
    openPopup(popupCreateCard);
    popupCreateCard.addEventListener('click', closeClickOverlay)
};

function submitCreateCard (evt) {
    evt.preventDefault();
    renderCard({name: placeInput.value, link: placeLinkInput.value});
    closePopup(popupCreateCard);
};

function closeCreateCard () {
    closePopup(popupCreateCard)
};

function renderCard(element) {
    const newCard = createCard (element);
    cardList.prepend(newCard)
};

function createCard (element) {
    const cloneCard = templateCard.querySelector('.card').cloneNode(true);
    const placeImg = cloneCard.querySelector('.card__image');
    const placeTitle = cloneCard.querySelector('.card__title');
    const likeBtn = cloneCard.querySelector('.card__like-button');
    const deleteBtn = cloneCard.querySelector('.card__delete-button');
    placeImg.src = element.link;
    placeImg.alt = element.name;
    placeTitle.textContent = element.name;
    placeImg.addEventListener('click', openPopupFullScreen);
    likeBtn.addEventListener('click', activitylike);
    deleteBtn.addEventListener('click', deleteCard);
    return cloneCard; 
};

function openPopupFullScreen (evt) {
    fullScrin.src = evt.target.src;
    fullScrin.alt = evt.target.alt;
    fullScrinTitle.textContent = evt.target.alt;
    openPopup(popupFullScreen);
    popupFullScreen.addEventListener('click', closeClickOverlay)
};

function closePopupFullScreen (){
    closePopup(popupFullScreen);
};
function activitylike (evt) {
    evt.target.classList.toggle('card__like-button_active');
};
function deleteCard (evt) {
    evt.target.closest('.card').remove();
};

buttonProfileEdit.addEventListener('click', openProfile);
buttonClosePopupProfile.addEventListener('click', closeProfile);
buttonAddCard.addEventListener('click',openCreateCard);
buttonClosePopupCreateCard.addEventListener('click', closeCreateCard);
buttonClosePopupFullScreen.addEventListener('click', closePopupFullScreen);
formProfileEdit.addEventListener('submit', submitProfile);
formCreateCard.addEventListener('submit',submitCreateCard);

document.addEventListener('keydown', function (evt){
  if(evt.key === 'Escape'){
    const popupActiv = document.querySelector('.popup_opened');
    closePopup(popupActiv);
  };
});

initialCards.forEach(renderCard);

