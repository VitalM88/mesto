import Card from './Card.js';
import {initialCards, validationSettings} from './data.js';
import FormValidator from './FormValidator.js';

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

function popupOverlayClick (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

function popupEscapePressed (evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}


//попап редактирования профиля

const popupProfile = document.querySelector('.popup_profile');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__button-close');

const formProfileElement = document.querySelector('.profileEditor-form');
const formProfileValidator = new FormValidator (formProfileElement, validationSettings);
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_description');

const profileInfo = document.querySelector('.profile__info');
const profileName = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__description');

function popupProfileOpen() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  formProfileValidator.disableValidation();
  openPopup(popupProfile);
};

function popupProfileClose() {
  closePopup(popupProfile);
};

function popupProfileSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupProfileClose();
}

document.addEventListener('keydown', popupEscapePressed);
popupProfile.addEventListener('click', popupOverlayClick);
popupProfileOpenButton.addEventListener('click', popupProfileOpen);
popupProfileCloseButton.addEventListener('click', popupProfileClose);
formProfileElement.addEventListener('submit', popupProfileSubmitHandler);


// попап добавления карточки

const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoOpenButton = document.querySelector('.profile__add-button');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__button-close');

const formPhotoElement = document.querySelector('.photoEditor-form');
const formPhotoValidator = new FormValidator (formPhotoElement, validationSettings);
const namePhotoInput = formPhotoElement.querySelector('.popup__input_type_name');
const descriptionPhotoInput = formPhotoElement.querySelector('.popup__input_type_description');

function popupPhotoOpen() {
  openPopup(popupPhoto);
  formPhotoElement.reset();
  formPhotoValidator.disableValidation();
};

popupPhoto.addEventListener('click', popupOverlayClick);
popupPhotoOpenButton.addEventListener('click', popupPhotoOpen);
popupPhotoCloseButton.addEventListener('click', function() {
  closePopup(popupPhoto);
});


//открытие изображений

const popupPhotoOpened = document.querySelector('.popup_open-photo');
const photoOpened = popupPhotoOpened.querySelector('.popup__photo');
const photoDescription = document.querySelector('.popup__photo-description');
const closePhotoButton = document.querySelector('.popup__photo-button-close');

export function photoOpen(photo, title) {
  photoOpened.src = photo.src;
  photoOpened.alt = title.textContent;
  photoDescription.textContent = title.textContent;
  openPopup(popupPhotoOpened);
}

popupPhotoOpened.addEventListener('click', popupOverlayClick);
closePhotoButton.addEventListener('click', () => {
  closePopup(popupPhotoOpened);
});


// рендер карточки

const elementItems = document.querySelector('.elements__items');

function renderCard(data) {
  const card = new Card(data);
  const cardElement = card.generateCard();
  elementItems.prepend(cardElement);
};


//добавление карточки

function formSubmitPhotoHandler (evt) {
  evt.preventDefault();
  const cardAdd = {};
  cardAdd.name = namePhotoInput.value;
  cardAdd.link = descriptionPhotoInput.value;
  renderCard(cardAdd);
  closePopup(popupPhoto);
};

formPhotoElement.addEventListener('submit', formSubmitPhotoHandler);


//добавление начальных карточек

initialCards.forEach((card) => {
  renderCard(card);
});


//включение валиацдии

formProfileValidator.enableValidation();
formPhotoValidator.enableValidation();


