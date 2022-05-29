import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor (popupSelector, hendleFormCallBack) {
        super (popupSelector)
        this._hendleFormCallBack = hendleFormCallBack;
        this._textButton = this._popup.querySelector('.submit-button');
        this._textButtonDefault = this._textButton.textContent;
        this._formElement = this._popup.querySelector('.form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'))
    }
    _getInputValues() {
        this.valueList = {};
        this._inputList.forEach((el) =>{
            this.valueList[el.name] = el.value
        });
        return this.valueList;
    }
    showLoadingMessage(isLoading) {
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
            this.showLoadingMessage(true);
            this._hendleFormCallBack(data);
        });
    }
    close() {
        super.close();
        this._formElement.reset();
    }
}