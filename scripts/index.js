
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
};

const popupProfile = document.querySelector('.popup_profile');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupProfileCloseButton = popupProfile.querySelector('.popup__button-close');

const formProfileElement = document.querySelector('.profileEditor-form');
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_description');

const profileInfo = document.querySelector('.profile__info')
const profileName = profileInfo.querySelector('.profile__name');
const profileJob = profileInfo.querySelector('.profile__description');
const popupProfileInputList = Array.from(popupProfile.querySelectorAll('.popup__input'));
const popupProfileSubmitButton = popupProfile.querySelector('.popup__submit');
const currentPopup = document.querySelector('.popup_is-opened');


function popupProfileOpen() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupProfileInputList.forEach((inputElement) => {
    hideInputError(popupProfile, inputElement);
  });
  toggleButtonState(popupProfileInputList, popupProfileSubmitButton);
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

document.addEventListener('keydown', popupEscapePressed)
popupProfile.addEventListener('click', popupOverlayClick)
popupProfileOpenButton.addEventListener('click', popupProfileOpen);
popupProfileCloseButton.addEventListener('click', popupProfileClose);
formProfileElement.addEventListener('submit', popupProfileSubmitHandler);


// 5 спринт

// попап добавления изображения
const popupPhoto = document.querySelector('.popup_photo');
const popupPhotoOpenButton = document.querySelector('.profile__add-button');
const popupPhotoCloseButton = popupPhoto.querySelector('.popup__button-close');
const popupPhotoInputList = Array.from(popupPhoto.querySelectorAll('.popup__input'));
const popupPhotoSubmitButton = popupPhoto.querySelector('.popup__submit');

function popupPhotoOpen() {
  openPopup(popupPhoto);
  formPhotoElement.reset();
  popupPhotoInputList.forEach((inputElement) => {
    hideInputError(popupPhoto, inputElement);
  });
  toggleButtonState(popupPhotoInputList, popupPhotoSubmitButton);
};

popupPhoto.addEventListener('click', popupOverlayClick);
popupPhotoOpenButton.addEventListener('click', popupPhotoOpen);
popupPhotoCloseButton.addEventListener('click', function() {
  closePopup(popupPhoto);
});

// генерация карточки

const elementTemplate = document.querySelector('#elements-template').content;
const elementItems = document.querySelector('.elements__items');

const popupPhotoOpened = document.querySelector('.popup_open-photo');
const photoOpened = popupPhotoOpened.querySelector('.popup__photo');
const photoDescription = document.querySelector('.popup__photo-description');
const closePhotoButton = document.querySelector('.popup__photo-button-close');

function photoOpen(photo, title) {
  photoOpened.src = photo.src;
  photoOpened.alt = title.textContent;
  photoDescription.textContent = title.textContent;
  openPopup(popupPhotoOpened);
}

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


  elementPhotoAdd.addEventListener('click', () => {
    photoOpen(elementPhotoAdd, elementTitleAdd);
  });

  return elementItemAdd;
};


popupPhotoOpened.addEventListener('click', popupOverlayClick);
closePhotoButton.addEventListener('click', () => {
  closePopup(popupPhotoOpened);
});

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
  closePopup(popupPhoto);
};

formPhotoElement.addEventListener('submit', formSubmitPhotoHandler);

//добавление начальный изображений

initialCards.forEach((card) => {
  const cardNameInitial = card.name;
  const cardLinkInitial = card.link;
  renderCard(cardNameInitial, cardLinkInitial);
});




