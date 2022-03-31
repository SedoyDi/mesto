function isValid (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };
  
  function showInputError (formElement, inputElement, errorMasage) {
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    inputError.textContent = errorMasage;
  };
  function hideInputError (formElement, inputElement){
    const inputError = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    inputError.textContent = '';
  };
  
  function hasInvalidInput (inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      })
  };
  
  function toggleButtonState (inputList, submitButton) {
    if (hasInvalidInput(inputList)) {
      submitButton.classList.add('form__submit_inactive');
      submitButton.setAttribute('disabled', 'disabled');
    } else {
      submitButton.classList.remove('form__submit_inactive');
      submitButton.removeAttribute('disabled');
    }
  };
  
  function setEventListeners (formElement){
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const submitButton = formElement.querySelector('.submit-button')
    toggleButtonState(inputList, submitButton);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement)
        toggleButtonState(inputList, submitButton);
      });
    });
  };
  
  function enableValidation () {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
  };
  
  enableValidation();