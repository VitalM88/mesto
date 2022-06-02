import { photoOpen } from "./index.js";

export default class Card {
    constructor(data) {
      this._link = data.link;
      this._name = data.name;
    }
  
    _getTemplate() {
      const cardElement = document
      .querySelector('#elements-template')
      .content.querySelector('.elements__item')
      .cloneNode(true);
      return cardElement;
      }
  
    _setEventListeners() {
      const elementPhotoAdd = this._element.querySelector('.elements__photo');
      const elementTitleAdd = this._element.querySelector('.elements__title');
      const likeButton = this._element.querySelector('.elements__like');
      const deleteButton = this._element.querySelector('.elements__delete');
  
      elementPhotoAdd.addEventListener('click', () => {
        photoOpen(elementPhotoAdd, elementTitleAdd);
      });
  
      likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
      });
  
      deleteButton.addEventListener('click', function (evt) {
        const deleteItem = evt.target.closest('.elements__item');
        deleteItem.remove();
      });
  
    }
  
    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.elements__photo').src = this._link;
      this._element.querySelector('.elements__photo').alt = this._name;
      this._element.querySelector('.elements__title').textContent = this._name;
      return this._element;
    }
  
  }