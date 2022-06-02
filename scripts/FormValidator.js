export default class FormValidator {
  constructor(formElement, validationSettings) {
    this._formElement = formElement;
    this._validationSettings = validationSettings;
  }

  _showInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._validationSettings.errorClass);
  }

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._validationSettings.errorClass);
  }

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError (inputElement);
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
    if (this._hasInvalidInput (inputList)) {
      buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _setEventListeners (formElement) {
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  disableValidation () {
    const inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation () {
    const formList = Array.from(document.querySelectorAll(this._validationSettings.formSelector));
    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  }
}