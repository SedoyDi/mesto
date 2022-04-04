function isValid (formElement, inputElement,{...rest}) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, rest);
    } else {
      hideInputError(formElement, inputElement, rest);
    }
  };
  
  function showInputError (formElement, inputElement, errorMasage, {inputErrorClass, ...rest}) {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    inputError.textContent = errorMasage;
  };
  function hideInputError (formElement, inputElement, {inputErrorClass, ...rest}){
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    inputError.textContent = '';
  };
  
  function hasInvalidInput (inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
  };

  function inactiveSubmitButton (submitButton, {inactiveButtonClass}) {
    submitButton.classList.add(inactiveButtonClass);
    submitButton.setAttribute('disabled', 'disabled');
  };

  function activeSubmitButton (submitButton, {inactiveButtonClass}){
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.removeAttribute('disabled');
  };
  function toggleButtonState (inputList, submitButton,{...rest}) {
    if (hasInvalidInput(inputList)) {
      inactiveSubmitButton (submitButton, rest)
    } else {
      activeSubmitButton (submitButton, rest)
    }
  };
  
  function setEventListeners (formElement, {inputSelector, submitButtonSelector, ...rest}){
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const submitButton = formElement.querySelector(submitButtonSelector)
    toggleButtonState(inputList, submitButton, rest);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, rest)
        toggleButtonState(inputList, submitButton, rest);
      });
    });
  };
  
  const enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, rest);
    });
  };

  enableValidation({
    formSelector: '.form', 
    inputSelector: '.form__input',
    submitButtonSelector: '.submit-button',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input_type_error',
  });