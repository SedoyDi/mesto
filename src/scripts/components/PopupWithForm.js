import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor (selector, submitFormСolback) {
        super (selector)
        this._submitFormСolback = submitFormСolback;
        this._formElement = this._popupSelector.querySelector('.form');
        this._inputList = Array.from(this._formElement.querySelectorAll('.form__input'))
    }

    _getInputValues = () =>{
        this.valueList = {likes: []};
        this._inputList.forEach((el) =>{
            this.valueList[el.name] = el.value
        });
        return this.valueList;
    }

    setEventListeners(){
        super.setEventListeners();
        
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitFormСolback(this._getInputValues());
            this.close();
        });
    }
    close() {
        super.close();
        this._formElement.reset();
    }
}