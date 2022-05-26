export default class Card {
    static _templateCard = document.querySelector('#template-card').content;
    constructor(data, handleCardClick, colbackLikeButton) {
        this._userInfo = data.owner;
        this._idCard = data._id;
        this._data = data;
        this._likes = data.likes.length;
        this._handleCardClick = handleCardClick;
        this._colbackLikeButton = colbackLikeButton;
        this._cloneCard = Card._templateCard.querySelector('.card').cloneNode(true);
        this._placeTitle = this._cloneCard.querySelector('.card__title');
        this._plaseImg = this._cloneCard.querySelector('.card__image');
        this._likeButton = this._cloneCard.querySelector('.card__like-button');
        this._cardLikeCounter = this._cloneCard.querySelector('.card__like-counter');
    };
    checkLikeCounter() {
        this._cardLikeCounter.textContent = this._likes;
    }
    createCard () {
        this._plaseImg.src = this._data.link;
        this._plaseImg.alt = this._data.name;
        this._placeTitle.textContent = this._data.name;
        this._setEventListeners();
        return this._cloneCard;
    };
    _setEventListeners() {
        this._plaseImg.addEventListener('click', () => {
            this._handleCardClick();
        });
        this._likeButton.addEventListener('click', () => {
            this._colbackLikeButton(this._userInfo, this._idCard);
            this._toggleLike();
        });
    }
    addlike() {
        this._likeButton.classList.add('card__like-button_active');
    };
    _toggleLike() {
        this._likeButton.classList.toggle('card__like-button_active');
    };
};