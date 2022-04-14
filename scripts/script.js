const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__button-close');

function popupOpenToggle() {
  popup.classList.toggle('popup_is-opened');
}

popupOpenButton.addEventListener('click', popupOpenToggle);
popupCloseButton.addEventListener('click', popupOpenToggle);



let formElement = document.querySelector('.popup__content');
let nameInput = formElement.querySelector('.popup__input-name');
let jobInput = formElement.querySelector('.popup__input-description');

let profileInfo = document.querySelector('.profile__info')
let profileName = profileInfo.querySelector('.profile__name');
let profileJob = profileInfo.querySelector('.profile__description');


function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

}


formElement.addEventListener('submit', formSubmitHandler);
