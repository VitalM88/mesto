
const validationSettings = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}



class FormValidator {
  constructor(formElement, validationSettings) {
    this._formElement = formElement;
    this._validationSettings = validationSettings;
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationSettings.errorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._validationSettings.errorClass);
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError (inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError (inputElement);
    }
  }

  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState (inputList, buttonElement) {
    if (hasInvalidInput (inputList)) {
      buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners () {
    const inputList = Array.from(formElement.querySelectorAll(this._validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(this._validationSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation () {
    const formList = Array.from(document.querySelectorAll(this._validationSettings.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(formElement);
    });
  }

}

const formProfileValidator = new FormValidator (formProfileElement, validationSettings);
const formPhotoValidator = new FormValidator (formPhotoElement, validationSettings);
formProfileValidator.enableValidation();
formPhotoValidator.enableValidation();





/*


function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorClass);
}

function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(validationSettings.errorClass);
}

function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError (formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError (formElement, inputElement);
  }
}

function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function enableValidation () {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation(validationSettings);



function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState (inputList, buttonElement) {
  if (hasInvalidInput (inputList)) {
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}


*/
