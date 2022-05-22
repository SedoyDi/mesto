import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor (selector, colbackDeleteCard) {
        super(selector)
        this._dataCard ={}
        this._colbackDeleteCard = colbackDeleteCard;
        this._closeButton = this._popupSelector.querySelector('.popup__close-button');
        this._formElement = this._popupSelector.querySelector('.form');
      }
      open(data){
        this._dataCard = {id: data.id, cloneCard: data.cloneCard};
        super.open();
        return this._dataCard;
      }
      setEventListeners(){
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._colbackDeleteCard(this._dataCard.id)
            this._dataCard.cloneCard.remove();
            this._dataCard.cloneCard = null;
            this.close();
        });
      }
}