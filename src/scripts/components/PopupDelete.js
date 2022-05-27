import PopupWithForm from "./PopupWithForm.js";

export default class PopupDelete extends PopupWithForm {
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
      _deleteCard  = () => {
        this._dataCard.cloneCard.remove();
        this._dataCard.cloneCard = null;
      }

      setEventListeners(){
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.showDownloadMessage(true);
            this._colbackDeleteCard(this._dataCard.id, this._deleteCard)
        });
      }
}