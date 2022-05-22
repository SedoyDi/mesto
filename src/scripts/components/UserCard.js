import Card from "./Card.js";

export default class UserCard extends Card{
    static _templateCard = document.querySelector('#template-userCard').content;
    constructor(data, handleCardClick, colbackDeleteCard) {
        super (data, handleCardClick);
        this._colbackDeleteCard = colbackDeleteCard;
        this._cloneCard = UserCard._templateCard.querySelector('.card').cloneNode(true);
        this._placeTitle = this._cloneCard.querySelector('.card__title');
        this._plaseImg = this._cloneCard.querySelector('.card__image');
        this._likeButton = this._cloneCard.querySelector('.card__like-button');
        this._cardLikeCounter = this._cloneCard.querySelector('.card__like-counter');
        this._deleteButton = this._cloneCard.querySelector('.card__delete-button');
    };

    _setEventListeners() {
        super._setEventListeners();
        this._deleteButton.addEventListener('click', () => {
            this._colbackDeleteCard({id: this._data._id, cloneCard: this._cloneCard})
        });
    }
};