const popupProfile = document.querySelector('.popup_profile');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__button-close');

function popupProfileOpenToggle() {
  popupProfile.classList.toggle('popup_is-opened');
}

popupProfileOpenButton.addEventListener('click', popupProfileOpenToggle);
popupProfileCloseButton.addEventListener('click', popupProfileOpenToggle);

let formElement = document.querySelector('.popup__content');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_description');

let profileInfo = document.querySelector('.profile__info')
let profileName = profileInfo.querySelector('.profile__name');
let profileJob = profileInfo.querySelector('.profile__description');

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupOpenToggle();
}

formElement.addEventListener('submit', formSubmitHandler);

// 5 спринт

const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoOpenButton = document.querySelector('.profile__add-button');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__button-close');

function popupPhotoOpenToggle() {
  popupPhoto.classList.toggle('popup_is-opened');
}

popupPhotoOpenButton.addEventListener('click', popupPhotoOpenToggle);
popupPhotoCloseButton.addEventListener('click', popupPhotoOpenToggle);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

