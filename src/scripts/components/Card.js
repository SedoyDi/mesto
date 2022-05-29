export default class Card {
    constructor(templateCardSelector, data, idUser, handleCardClick, handleLikeActive, handleLikeDelete, handleDeleteCard) {
        this._data = data;
        this._idUser = idUser;
        this._handleCardClick = handleCardClick;
        this._handleLikeActive = handleLikeActive;
        this._handleLikeDelete = handleLikeDelete;
        this._handleDeleteCard = handleDeleteCard;
        this._cloneCard = this._getCloneCard(templateCardSelector);
        this._plaseImg = this._cloneCard.querySelector('.card__image');
        this._likeButton = this._cloneCard.querySelector('.card__like-button');
        this._placeTitle = this._cloneCard.querySelector('.card__title');
        this._cardLikeCounter = this._cloneCard.querySelector('.card__like-counter');
        this._deleteButton = this._cloneCard.querySelector('.card__delete-button');
    };
    _getCloneCard (selector) {
        return document.querySelector(selector).content.querySelector('.card').cloneNode(true);
    }
    _isLiked() {
        return this._data.likes.some((el) => el._id === this._idUser);
    }
    _setLikeStatus() {
        if(this._isLiked()){
            this._addlike();
        }
    }
    checkLikeCounter(data) {
        this._cardLikeCounter.textContent = data.likes.length;
    }
    changeDataLikeCounter(data) {
        this._data.likes = data.likes;
    }
    createCard () {
        if(this._data.owner._id === this._idUser) {
            this._deleteButton.classList.add('card__delete-button_show');
            this._deleteButton.addEventListener('click', () => { 
                this._handleDeleteCard({id: this._data._id, cloneCard: this._cloneCard}) 
            });
        }
        this._plaseImg.src = this._data.link;
        this._plaseImg.alt = this._data.name;
        this._placeTitle.textContent = this._data.name;
        this._setEventListeners();
        this._setLikeStatus();
        this.checkLikeCounter(this._data);
        return this._cloneCard;
    };
    _setEventListeners() {
        this._plaseImg.addEventListener('click', () => {
            this._handleCardClick();
        });
        this._likeButton.addEventListener('click', () => {
            if(!this._isLiked()){
            this._handleLikeActive(this._data);
        }else{
            this._handleLikeDelete(this._data);
        }
        });
    }
    _addlike() {
        this._likeButton.classList.add('card__like-button_active');
    };
    toggleLike() {
        this._likeButton.classList.toggle('card__like-button_active');
    };
};