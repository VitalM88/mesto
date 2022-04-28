const popupProfile = document.querySelector('.popup_profile');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__button-close');

function popupProfileOpenToggle() {
  popupProfile.classList.toggle('popup_is-opened');
}

popupProfileOpenButton.addEventListener('click', popupProfileOpenToggle);
popupProfileCloseButton.addEventListener('click', popupProfileOpenToggle);

let formElement = document.querySelector('.profileEditor-form');
let nameInput = formElement.querySelector('.popup__input_type_name');
let jobInput = formElement.querySelector('.popup__input_type_description');

let profileInfo = document.querySelector('.profile__info')
let profileName = profileInfo.querySelector('.profile__name');
let profileJob = profileInfo.querySelector('.profile__description');

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupProfileOpenToggle();
}

formElement.addEventListener('submit', formSubmitHandler);

// 5 спринт

// попап добавления изображения
const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoOpenButton = document.querySelector('.profile__add-button');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__button-close');

function popupPhotoOpenToggle() {
  popupPhoto.classList.toggle('popup_is-opened');
}

popupPhotoOpenButton.addEventListener('click', popupPhotoOpenToggle);
popupPhotoCloseButton.addEventListener('click', popupPhotoOpenToggle);

// массив начальных изображений

let initialCards = [
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

// удаление изображения

function deletePhoto() {
  const deleteButton = document.querySelector('.elements__delete');
  deleteButton.addEventListener('click', function (evt) {
    const deleteItem = evt.target.closest('.elements__item');
    deleteItem.remove();
  });
};

// лайк изображения

function likePhoto () {
  const likeButton = document.querySelector('.elements__like');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });
};

// открытие изображения

function openPhoto () {

const targetPhoto = document.querySelector('.elements__photo');
const targetPhotoDescription =  document.querySelector('.elements__title');

const popupPhotoOpened = document.querySelector('.popup_open-photo');
const photoOpened = popupPhotoOpened.querySelector('.popup__photo');
const photoDescription = document.querySelector('.popup__photo-description');

function photoOpenToggle() {
  popupPhotoOpened.classList.toggle('popup_is-opened');
  photoOpened.src = targetPhoto.src;
  photoDescription.textContent = targetPhotoDescription.textContent;

}
targetPhoto.addEventListener('click', photoOpenToggle);
};

// закрытие изображения
const closePhoto = document.querySelector('.popup_open-photo');
const closePhotoButton = document.querySelector('.popup__photo-button-close');
closePhotoButton.addEventListener('click', function () {
  closePhoto.classList.toggle('popup_is-opened');
});


// добавление начальных изображений

const elementTemplate = document.querySelector('#elements-template').content;
const elementItems = document.querySelector('.elements__items');

initialCards.forEach((element) => {

const elementItem = elementTemplate.querySelector('.elements__item').cloneNode(true);
const elementPhoto = elementItem.querySelector('.elements__photo');
const elementTitle = elementItem.querySelector('.elements__title');


elementPhoto.src = element.link;
elementPhoto.alt = element.name;
elementTitle.textContent = element.name;

elementItems.prepend(elementItem);
deletePhoto();
likePhoto ();
openPhoto ();
});

// добавление изображения пользователя

const formPhotoElement = document.querySelector('.photoEditor-form');

const PhotoElement = document.querySelector('.popup_photo');
const namePhotoInput = PhotoElement.querySelector('.popup__input_type_name');
const descriptionPhotoInput = PhotoElement.querySelector('.popup__input_type_description');


function formSubmitPhotoHandler (evt) {
  evt.preventDefault();

  const elementItemAdd = elementTemplate.querySelector('.elements__item').cloneNode(true);
  const elementPhotoAdd = elementItemAdd.querySelector('.elements__photo');
  const elementTitleAdd = elementItemAdd.querySelector('.elements__title');

  elementPhotoAdd.src = descriptionPhotoInput.value;
  elementPhotoAdd.alt = namePhotoInput.value;
  elementTitleAdd.textContent = namePhotoInput.value;

  elementItems.prepend(elementItemAdd);
  deletePhoto();
  likePhoto ();
  openPhoto ();
  popupPhotoOpenToggle();
}

formPhotoElement.addEventListener('submit', formSubmitPhotoHandler);

