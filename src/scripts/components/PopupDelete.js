import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
    constructor (popupSelector, handleDeleteCard) {
        super(popupSelector)
        this._dataCard ={}
        this._handleDeleteCard = handleDeleteCard;
        this._textButton = this._popup.querySelector('.submit-button');
        this._textButtonDefault = this._textButton.textContent;
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._formElement = this._popup.querySelector('.form');
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
      showLoadingMessage(isLoading) {
        if(isLoading){
          this._textButton.innerText = "Удаление...";
        }else{
          this._textButton.innerText = this._textButtonDefault;
        }
      }
      setEventListeners(){
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.showLoadingMessage(true);
            this._handleDeleteCard(this._dataCard.id)
        });
      }
}