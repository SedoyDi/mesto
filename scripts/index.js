const profPup = document.querySelector('#profile');
const openBtnProfEdit = document.querySelector('.profile__edit');
const closeBtnPupProf = document.querySelector('#close-btn-pup-profile');
const formProfile = document.querySelector('#profile-edit');
const nickName = document.querySelector('.profile__nick-name');
const nickNameInput = document.querySelector('#name');
const profession = document.querySelector('.profile__profession');
const professionInput = document.querySelector('#prof');

const createPup = document.querySelector('#create-card');
const openBtnCreateCard = document.querySelector('.profile__add-photo');
const closeBtnPupCreateCard = document.querySelector('#close-btn-pup-card');
const formCreateCard = document.querySelector('#form-create');
const placeInput = document.querySelector('#place');
const placeLinkInput = document.querySelector('#place-link')

const maxImgPup = document.querySelector('#max-img');
const closeBtnPupMaxImg = document.querySelector('#close-btn-popup-max-img');
const fullscrin = document.querySelector('.popup__max-img');
const fullscrinTitle =document.querySelector('.popup__max-img-title');
//template
const templateCard = document.querySelector('#template-card').content;
const cardList = document.querySelector('#card-list');


//ищет элемент родитель, убирает класс 
function closePopup (evt) {
    evt.target.closest('.popup').classList.remove('popup_opened');    
};
//присваивает класс
function openPopup (popup) {
    popup.classList.add('popup_opened');
}

function openProfile () {
    nickNameInput.value = nickName.textContent;
    professionInput.value = profession.textContent;
    openPopup(profPup);
};
function submitProfile (evt){
    evt.preventDefault(); 
    nickName.textContent = nickNameInput.value
    profession.textContent = professionInput.value
    closePopup(evt);
}
function openCreateCard () {
    openPopup(createPup);
}
function submitCreateCard (evt) {
    const element = {name:'', link:''};
    element.name = placeInput.value;
    element.link = placeLinkInput.value;
    const newCard = createCard (element);
    cardList.prepend(newCard)
    closePopup(evt);
}

function createCard (element) {
    const cloneCard = templateCard.querySelector('.card').cloneNode(true);
    const placeImg = cloneCard.querySelector('.card__image');
    const placeTitle = cloneCard.querySelector('.card__title');
    const likeBtn = cloneCard.querySelector('.card__like-button');
    const deleteBtn = cloneCard.querySelector('.card__delete-button');
    placeImg.src = element.link;
    placeImg.alt = element.name;
    placeTitle.textContent = element.name;
    placeImg.addEventListener('click', openMaxImgPup);
    likeBtn.addEventListener('click', activitylike);
    deleteBtn.addEventListener('click', deleteCard);
    return cloneCard; 
};
function openMaxImgPup (evt) {
    fullscrin.src = evt.target.src;
    fullscrin.alt = evt.target.alt;
    fullscrinTitle.textContent = evt.target.alt;
    openPopup(maxImgPup);
};
function activitylike (evt) {
    evt.target.classList.toggle('card__like-button_active');
};
function deleteCard (evt) {
    evt.target.closest('.card').remove();
};

openBtnProfEdit.addEventListener('click', openProfile);
closeBtnPupProf.addEventListener('click', closePopup);
openBtnCreateCard.addEventListener('click',openCreateCard);
closeBtnPupCreateCard.addEventListener('click', closePopup);
closeBtnPupMaxImg.addEventListener('click', closePopup);
formProfile.addEventListener('submit', submitProfile);
formCreateCard.addEventListener('submit',submitCreateCard);

initialCards.forEach(function (element) {
    const newCard = createCard (element);
    cardList.append(newCard);
});