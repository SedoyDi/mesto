const selectorList = {
  formSelector: '.form', 
  inputSelector: '.form__input',
  submitButtonSelector: '.submit-button',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error',
};

function isValid (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  function showInputError (formElement, inputElement, errorMasage) {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectorList.inputErrorClass);
    inputError.textContent = errorMasage;
  };
  function hideInputError (formElement, inputElement){
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectorList.inputErrorClass);
    inputError.textContent = '';
  };
  
  function hasInvalidInput (inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
  };

  function inactiveSubmitButton (submitButton) {
    submitButton.classList.add(selectorList.inactiveButtonClass);
    submitButton.setAttribute('disabled', 'disabled');
  };

  function activeSubmitButton (submitButton){
    submitButton.classList.remove(selectorList.inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  };
  function toggleButtonState (inputList, submitButton) {
    if (hasInvalidInput(inputList)) {
      inactiveSubmitButton (submitButton)
    } else {
      activeSubmitButton (submitButton)
    }
  };
  
  function setEventListeners (formElement){
    const inputList = Array.from(formElement.querySelectorAll(selectorList.inputSelector));
    const submitButton = formElement.querySelector(selectorList.submitButtonSelector)
    toggleButtonState(inputList, submitButton);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement)
        toggleButtonState(inputList, submitButton);
      });
    });
  };
  
  const enableValidation = (selectorList) => {
    const formList = Array.from(document.querySelectorAll(selectorList.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  };

  enableValidation(selectorList);