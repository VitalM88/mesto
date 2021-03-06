export default class FormValidator {
  constructor(formElement, validationSettings) {
    this._formElement = formElement;
    this._validationSettings = validationSettings;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
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

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState () {
    if (this._hasInvalidInput ()) {
      this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners () {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  disableValidation () {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  enableValidation () {
    this._setEventListeners();
  }
}
