import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor (selector, submitFormСolback) {
        super (selector)
        this._submitFormСolback = submitFormСolback;
        this._textButton = this._popupSelector.querySelector('.submit-button');
        this._textButtonDefault = this._textButton.textContent;
        this._formElement = this._popupSelector.querySelector('.form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'))
    }
    _getInputValues() {
        this.valueList = {};
        this._inputList.forEach((el) =>{
            this.valueList[el.name] = el.value
        });
        return this.valueList;
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
            const data = this._getInputValues()
            this.showDownloadMessage(true);
            this._submitFormСolback(data);
        });
    }
    close() {
        super.close();
        this._formElement.reset();
    }
}