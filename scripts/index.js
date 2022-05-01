function openPopup(popup) {
  popup.classList.add('popup_is-opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
};


const popupProfile = document.querySelector('.popup_profile');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__button-close');

const formElement = document.querySelector('.profileEditor-form');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');

const profileInfo = document.querySelector('.profile__info')
const profileName = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__description');


function popupProfileOpen() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
};

function popupProfileClose() {
  closePopup(popupProfile);
};

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popupProfileClose();
}

popupProfileOpenButton.addEventListener('click', popupProfileOpen);
popupProfileCloseButton.addEventListener('click', popupProfileClose);
formElement.addEventListener('submit', formSubmitHandler);

// 5 спринт

// попап добавления изображения
const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoOpenButton = document.querySelector('.profile__add-button');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__button-close');

function popupPhotoOpen() {
  openPopup(popupPhoto);
};

function popupPhotoClose() {
  closePopup(popupPhoto);
  descriptionPhotoInput.value = "";
  namePhotoInput.value = "";
};

popupPhotoOpenButton.addEventListener('click', popupPhotoOpen);
popupPhotoCloseButton.addEventListener('click', popupPhotoClose);

// массив начальных изображений

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

// генерация карточки
const elementTemplate = document.querySelector('#elements-template').content;
const elementItems = document.querySelector('.elements__items');

const popupPhotoOpened = document.querySelector('.popup_open-photo');
const photoOpened = popupPhotoOpened.querySelector('.popup__photo');
const photoDescription = document.querySelector('.popup__photo-description');
const closePhotoButton = document.querySelector('.popup__photo-button-close');

function generateCard(nameCard, linkCard) {
  const elementItemAdd = elementTemplate.querySelector('.elements__item').cloneNode(true);
  const elementPhotoAdd = elementItemAdd.querySelector('.elements__photo');
  const elementTitleAdd = elementItemAdd.querySelector('.elements__title');

  elementPhotoAdd.src = linkCard;
  elementPhotoAdd.alt = nameCard;
  elementTitleAdd.textContent = nameCard;

  const likeButton = elementItemAdd.querySelector('.elements__like');
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  });

  const deleteButton = elementItemAdd.querySelector('.elements__delete');
  deleteButton.addEventListener('click', function (evt) {
    const deleteItem = evt.target.closest('.elements__item');
    deleteItem.remove();
  });

  function photoOpen() {
    photoOpened.src = elementPhotoAdd.src;
    photoOpened.alt = elementTitleAdd.textContent;
    photoDescription.textContent = elementTitleAdd.textContent;
    openPopup(popupPhotoOpened);
  }
  elementPhotoAdd.addEventListener('click', photoOpen);

  closePhotoButton.addEventListener('click', function () {
    closePopup(popupPhotoOpened);
  });

  return elementItemAdd;
};


// рендер картоки
const formPhotoElement = document.querySelector('.photoEditor-form');

const photoElement = document.querySelector('.popup_photo');
const namePhotoInput = photoElement.querySelector('.popup__input_type_name');
const descriptionPhotoInput = photoElement.querySelector('.popup__input_type_description');

function renderCard(nameCard, linkCard) {
  elementItems.prepend(generateCard(nameCard, linkCard));
};

// обработчик событий

function formSubmitPhotoHandler (evt) {
  evt.preventDefault();
  const cardName = namePhotoInput.value;
  const cardLink = descriptionPhotoInput.value;
  renderCard(cardName, cardLink);
  popupPhotoClose();
};

formPhotoElement.addEventListener('submit', formSubmitPhotoHandler);

//добавление начальный изображений

initialCards.forEach((card) => {
  const cardNameInitial = card.name;
  const cardLinkInitial = card.link;
  renderCard(cardNameInitial, cardLinkInitial);
});


