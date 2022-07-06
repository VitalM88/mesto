import './index.css';
import Card from '../scripts/components/Card.js';
import {validationSettings} from '../scripts/utils/data.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: 'ac2a0063-32ab-49d9-9acb-d22769eece18',
    'Content-Type': 'application/json'
  }
});


// получение данных пользователя

api.getUserInfo()
  .then((userData) => {
    userInfo.setUserInfo(userData);
    userId = userData._id
    console.log(userData);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

let userId;


// получение карточек с сервера

api.getInitialCards()
  .then((initialCards) => {
    cardsList.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });


// попап редактирования профиля

const formProfileElement = document.querySelector('.profileEditor-form');
const nameInput = formProfileElement.querySelector('.popup__input_type_name');
const jobInput = formProfileElement.querySelector('.popup__input_type_description');

const userInfo = new UserInfo ({profileName: '.profile__name', profileJob: '.profile__description', profileAvatar: '.profile__avatar'});

const popupProfileEdit = new PopupWithForm ('.popup_profile', {
  handleSubmitForm: (data) => {
    popupProfileEdit.dataLoading(true);
    api.editUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupProfileEdit.dataLoading(false);
        popupProfileEdit.close();
      });  
    
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


// попап обновления аватара

const popupAvatarEdit = new PopupWithForm ('.popup_avatar', {
  handleSubmitForm: (data) => {
    popupAvatarEdit.dataLoading(true);
    api.editAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAvatarEdit.dataLoading(false);
        popupAvatarEdit.close();
      }); 
  }
});

popupAvatarEdit.setEventListeners();

function openAvatarPopup() {
  formValidators['avatar-form'].disableValidation();
  popupAvatarEdit.open();
};

const popupAvatarOpen = document.querySelector('.profile__avatar');

popupAvatarOpen.addEventListener('click', openAvatarPopup);


// попап добавления карточки

const popupPhotoAdd = new PopupWithForm ('.popup_photo', {
  handleSubmitForm: (data) => {
    popupPhotoAdd.dataLoading(true);
    api.addCard(data)
    .then((data) => {
      cardsList.addItem(createCard(data));
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupPhotoAdd.dataLoading(false);
      popupPhotoAdd.close();
    }); 
  }
});

popupPhotoAdd.setEventListeners();

function openPhotoPopup() {
  popupPhotoAdd.open();
  formValidators['card-form'].disableValidation();
};

const popupPhotoOpenButton = document.querySelector('.profile__add-button');

popupPhotoOpenButton.addEventListener('click', openPhotoPopup);


// открытие изображений

const viewPhotoPopup = new PopupWithImage('.popup_open-photo');
viewPhotoPopup.setEventListeners();

function handleCardClick (photo, title) {
  viewPhotoPopup.open(photo, title);
}


// попап подтверждение

const popupWithConfirmation = new PopupWithConfirmation('.popup_confirmation');
popupWithConfirmation.setEventListeners();


// cоздание карточки

const cardTemplate = document.querySelector('#elements-template').content.querySelector('.elements__item');

function createCard (data) {
  const card = new Card(data, cardTemplate, handleCardClick,
    (dataId) => {
      if (!card.isLiked()) {
        api.setLike(dataId)
        .then((res) => {
          card.updateLikes(res);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      } else {
        api.deleteLike(dataId)
        .then((res) => {
          card.updateLikes(res);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
      }
    },
    (dataId) => {
      popupWithConfirmation.open();
      popupWithConfirmation.setConfirm(() => {
          api.deleteCard(dataId)
          .then(() => {
            popupWithConfirmation.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    userId
  );
  const cardElement = card.generateCard();
  card.updateLikes(data);
  return cardElement;
}

const cardsList = new Section({
  renderer: (card) => {
    cardsList.addItem(createCard(card));
  },
}, '.elements__items');


// включение валидации

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
