export default class Card {
    constructor(data, cardTemplate, handleCardClick) {
      this._link = data.link;
      this._name = data.name;
      this._cardTemplate = cardTemplate;
      this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
      const cardElement = this._cardTemplate.cloneNode(true);
      return cardElement;
      }

    _setEventListeners() {
      this._elementPhotoAdd = this._element.querySelector('.elements__photo');
      this._likeButton = this._element.querySelector('.elements__like');
      this._deleteButton = this._element.querySelector('.elements__delete');

      this._elementPhotoAdd.addEventListener('click', () => {
        this._handleCardClick(this._link, this._name);
      });

      this._likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('elements__like_active');
      });

      this._deleteButton.addEventListener('click', function (evt) {
        const deleteItem = evt.target.closest('.elements__item');
        deleteItem.remove();
      });

    }

    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._elementPhotoAdd.src = this._link;
      this._elementPhotoAdd.alt = this._name;
      this._element.querySelector('.elements__title').textContent = this._name;
      return this._element;
    }

  }
