import {openPopup, fullScrin, fullScrinTitle, popupFullScreen} from './index.js'

export class Card {
    static _templateCard = document.querySelector('#template-card').content;

    constructor(element) {
        this._element = element;
    };
    createCard () {
        this._cloneCard = Card._templateCard.querySelector('.card').cloneNode(true);
        this._plaseImg = this._cloneCard.querySelector('.card__image');
        this._placeTitle = this._cloneCard.querySelector('.card__title');
        this._likeButton = this._cloneCard.querySelector('.card__like-button');
        this._deleteButton = this._cloneCard.querySelector('.card__delete-button');
        this._plaseImg.src = this._element.link;
        this._plaseImg.alt = this._element.name;
        this._placeTitle.textContent = this._element.name;
        this._plaseImg.addEventListener('click', this._openPopupFullScreen);
        this._likeButton.addEventListener('click', this._activitylike);
        this._deleteButton.addEventListener('click', this._deleteCard);
        return this._cloneCard;
    };
    _activitylike (evt) {
        evt.target.classList.toggle('card__like-button_active');
    };
    _deleteCard (evt) {
        evt.target.closest('.card').remove();
    };
    _openPopupFullScreen = (evt) => {
        fullScrin.src = evt.target.src;
        fullScrin.alt = evt.target.alt;
        fullScrinTitle.textContent = evt.target.alt;
        openPopup(popupFullScreen);
    };
};