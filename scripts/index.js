import Card from './Card.js';
import {initialCards, validationSettings} from './data.js';
import FormValidator from './FormValidator.js';

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscapeKey);
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscapeKey);
}

function handleOverlayClick (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function handleEscapeKey (evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

//закрытие попапов крестиком

const closeButtons = Array.from(document.querySelectorAll('.popup__button-close'));

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


//попап редактирования профиля

const popupProfile = document.querySelector('.popup_profile');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');


const formProfileElement = document.querySelector('.profileEditor-form');
const formProfileValidator = new FormValidator (formProfileElement, validationSettings);
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_description');

const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__description');

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formProfileValidator.disableValidation();
  openPopup(popupProfile);
};

function closeProfilePopup() {
  closePopup(popupProfile);
};

function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeProfilePopup();
}


popupProfile.addEventListener('click', handleOverlayClick);
popupProfileOpenButton.addEventListener('click', openProfilePopup);
formProfileElement.addEventListener('submit', handleProfileFormSubmit);


// попап добавления карточки

const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoOpenButton = document.querySelector('.profile__add-button');


const formPhotoElement = document.querySelector('.photoEditor-form');
const formPhotoValidator = new FormValidator (formPhotoElement, validationSettings);
const namePhotoInput = formPhotoElement.querySelector('.popup__input_type_name');
const descriptionPhotoInput = formPhotoElement.querySelector('.popup__input_type_description');

function openPhotoPopup() {
  openPopup(popupPhoto);
  formPhotoElement.reset();
  formPhotoValidator.disableValidation();
};

popupPhoto.addEventListener('click', handleOverlayClick);
popupPhotoOpenButton.addEventListener('click', openPhotoPopup);


//открытие изображений

const popupPhotoOpened = document.querySelector('.popup_open-photo');
const photoOpened = popupPhotoOpened.querySelector('.popup__photo');
const photoDescription = document.querySelector('.popup__photo-description');


function handleCardClick (photo, title) {
  photoOpened.src = photo;
  photoOpened.alt = title;
  photoDescription.textContent = title;
  openPopup(popupPhotoOpened);
}

popupPhotoOpened.addEventListener('click', handleOverlayClick);


// рендер карточки

const cardSelector = document.querySelector('#elements-template').content.querySelector('.elements__item');
const elementItems = document.querySelector('.elements__items');

function createCard (data) {
  const card = new Card(data, cardSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function renderCard(data) {
  const cardElement = createCard(data);
  elementItems.prepend(cardElement);
};


//добавление карточки

function handleSubmitPhotoForm (evt) {
  evt.preventDefault();
  const cardAdd = {};
  cardAdd.name = namePhotoInput.value;
  cardAdd.link = descriptionPhotoInput.value;
  renderCard(cardAdd);
  closePopup(popupPhoto);
};

formPhotoElement.addEventListener('submit', handleSubmitPhotoForm);


//добавление начальных карточек

initialCards.forEach(renderCard);


//включение валиацдии

formProfileValidator.enableValidation();
formPhotoValidator.enableValidation();


