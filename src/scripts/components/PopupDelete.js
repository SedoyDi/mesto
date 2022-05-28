import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor (selector, colbackDeleteCard) {
        super(selector)
        this._dataCard ={}
        this._colbackDeleteCard = colbackDeleteCard;
        this._textButton = this._popupSelector.querySelector('.submit-button');
        this._textButtonDefault = this._textButton.textContent;
        this._closeButton = this._popupSelector.querySelector('.popup__close-button');
        this._formElement = this._popupSelector.querySelector('.form');
      }
      open(data){
        this._dataCard = {id: data.id, cloneCard: data.cloneCard};
        super.open();
        return this._dataCard;
      }
      deleteCard  = () => {
        this._dataCard.cloneCard.remove();
        this._dataCard.cloneCard = null;
      }
      showDownloadMessage(isLoading) {
        if(isLoading){
          this._textButton.innerText = "Сохранение...";
        }else{
          this._textButton.innerText = this._textButtonDefault;
        }
      }
      setEventListeners(){
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.showDownloadMessage(true);
            this._colbackDeleteCard(this._dataCard.id)
        });
      }
}