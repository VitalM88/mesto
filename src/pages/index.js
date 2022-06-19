import './index.css';
import Card from '../scripts/components/Card.js';
import {initialCards, validationSettings} from '../scripts/utils/data.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';


// попап редактирования профиля

const formProfileElement = document.querySelector('.profileEditor-form');
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_description');

const userInfo = new UserInfo ({profileName: '.profile__name', profileJob: '.profile__description'});

const popupProfileEdit = new PopupWithForm ('.popup_profile', {
  handleSubmitForm: (data) => {
    userInfo.setUserInfo(data);
    popupProfileEdit.close();
  }
});

popupProfileEdit.setEventListeners();

function openProfilePopup() {
  const {profileJob, profileName} = userInfo.getUserInfo()
  nameInput.value = profileName;
  jobInput.value = profileJob;
  formValidators['profile-form'].disableValidation();
  popupProfileEdit.open();
};

const popupProfileOpenButton = document.querySelector('.profile__edit-button');

popupProfileOpenButton.addEventListener('click', openProfilePopup);


// попап добавления карточки

const popupPhotoAdd = new PopupWithForm ('.popup_photo', {
  handleSubmitForm: (data) => {
    cardsList.addItem(createCard(data));
    popupPhotoAdd.close();
  }
});

popupPhotoAdd.setEventListeners();

function openPhotoPopup() {
  popupPhotoAdd.open();
  formValidators['card-form'].disableValidation();
};

const popupPhotoOpenButton = document.querySelector('.profile__add-button');

popupPhotoOpenButton.addEventListener('click', openPhotoPopup);


//открытие изображений

const viewPhotoPopup = new PopupWithImage('.popup_open-photo');
viewPhotoPopup.setEventListeners();

function handleCardClick (photo, title) {
  viewPhotoPopup.open(photo, title);
}


// cоздание карточки

const cardTemplate = document.querySelector('#elements-template').content.querySelector('.elements__item');

function createCard (data) {
  const card = new Card(data, cardTemplate, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements__items');


//добавление начальных карточек

cardsList.renderItems(initialCards);


// Включение валидации

const formValidators = {}
const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, validationSettings)
    const formName = formElement.getAttribute('name')
    formValidators[formName] = validator;
    formValidators[formName].enableValidation();
  });
};

enableValidation(validationSettings);