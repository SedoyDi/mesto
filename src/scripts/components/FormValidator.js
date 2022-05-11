export default class FormValidator {
  constructor(listSelector, formElement) {
    this._listSelector = listSelector
    this._formElement = formElement
    this._inputList = Array.from(this._formElement.querySelectorAll(this._listSelector.inputSelector));
    this._submitButton = this._formElement.querySelector(this._listSelector.submitButtonSelector);
  };
  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };
  _showInputError (inputElement, errorMasage) {
    this._inputError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._listSelector.inputErrorClass);
    this._inputError.textContent = errorMasage;
  };
  _hideInputError (inputElement){
    this._inputError = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._listSelector.inputErrorClass);
    this._inputError.textContent = '';
  };
  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
    return !inputElement.validity.valid;
    })
  };
  _inactiveSubmitButton () {
    this._submitButton.classList.add(this._listSelector.inactiveButtonClass);
    this._submitButton.setAttribute('disabled', 'disabled');
  };
  _activeSubmitButton (){
    this._submitButton.classList.remove(this._listSelector.inactiveButtonClass);
    this._submitButton.removeAttribute('disabled');
  };
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._inactiveSubmitButton ()
    } else {
      this._activeSubmitButton ()
    }
  };
  _setEventListeners () {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
      this._isValid(inputElement)
      this._toggleButtonState(inputElement);
    });
  });
  };
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) =>{
      evt.preventDefault();
    });
      this._setEventListeners();
  };
  resetValidation = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError (inputElement);
    });
  }
};