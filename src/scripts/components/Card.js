export default class Card {
    static _templateCard = document.querySelector('#template-card').content;
    constructor(data, idUser, handleCardClick, colbackLikeActive, colbackLikeDelete) {
        this._idUser = idUser;
        this._data = data;
        this._handleCardClick = handleCardClick;
        this._colbackLikeActive = colbackLikeActive;
        this._colbackLikeDelete = colbackLikeDelete;
        this._cloneCard = Card._templateCard.querySelector('.card').cloneNode(true);
        this._plaseImg = this._cloneCard.querySelector('.card__image');
        this._likeButton = this._cloneCard.querySelector('.card__like-button');
        this._placeTitle = this._cloneCard.querySelector('.card__title');
        this._cardLikeCounter = this._cloneCard.querySelector('.card__like-counter');

    };
    _test() {
        return this._data.likes.some((el) => el._id === this._idUser);
    }
    checkLikeStatus() {
        if(this._test()){
            this._addlike();
        }
    }
    checkLikeCounter (data) {
        this._cardLikeCounter.textContent = data.likes.length;
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
            if(!this._test()){
            this._colbackLikeActive(this._data);
            this._toggleLike();
        }else{
            this._colbackLikeDelete(this._data);
            this._toggleLike();
        }
        });
    }
    _addlike() {
        this._likeButton.classList.add('card__like-button_active');
    };
    _toggleLike() {
        this._likeButton.classList.toggle('card__like-button_active');
        this.checkLikeCounter
    };
};