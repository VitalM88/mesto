import './index.css';
import Card from '../components/Card.js';
import {initialCards, validationSettings} from '../utils/data.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';


// попап редактирования профиля

const formProfileElement = document.querySelector('.profileEditor-form');
const formProfileValidator = new FormValidator (formProfileElement, validationSettings);
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
  nameInput.value = userInfo.getUserInfo().profileName;
  jobInput.value = userInfo.getUserInfo().profileJob;
  formProfileValidator.disableValidation();
  popupProfileEdit.open();
};


const popupProfileOpenButton = document.querySelector('.profile__edit-button');

popupProfileOpenButton.addEventListener('click', openProfilePopup);



// попап добавления карточки

const formPhotoElement = document.querySelector('.photoEditor-form');
const formPhotoValidator = new FormValidator (formPhotoElement, validationSettings);

const popupPhotoAdd = new PopupWithForm ('.popup_photo', {
  handleSubmitForm: (data) => {
    cardsList.addItem(createCard(data));
    popupPhotoAdd.close();
  }
});

popupPhotoAdd.setEventListeners();

function openPhotoPopup() {
  popupPhotoAdd.open('.popup_photo');
  formPhotoValidator.disableValidation();
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

const cardSelector = document.querySelector('#elements-template').content.querySelector('.elements__item');

function createCard (data) {
  const card = new Card(data, cardSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements__items');


//добавление начальных карточек

initialCards.forEach((element) => {cardsList.addItem(createCard(element))});


//включение валиацдии

formProfileValidator.enableValidation();
formPhotoValidator.enableValidation();


