export default class Card {
    constructor(data, cardTemplate, handleCardClick, handleLikeClick, handleDeleteClick, userId) {
      this._link = data.link;
      this._name = data.name;
      this._id = data._id;
      this._likes = data.likes;
      this._userId = userId;
      this._ownerId = data.owner._id;
      this._cardTemplate = cardTemplate;
      this._handleCardClick = handleCardClick;
      this._handleLikeClick = handleLikeClick;
      this._handleDeleteClick = handleDeleteClick;
      
    }

    _getTemplate() {
      const cardElement = this._cardTemplate.cloneNode(true);
      return cardElement;
      }

    _setEventListeners() {
      this._elementPhotoAdd = this._element.querySelector('.elements__photo');
      this._likeButton = this._element.querySelector('.elements__like');
      this._deleteButton = this._element.querySelector('.elements__delete');
      this._likesCounter = this._element.querySelector('.elements__like-counter');
      this._elementPhotoAdd.addEventListener('click', () => {
        this._handleCardClick(this._link, this._name);
      });

      this._likeButton.addEventListener('click', () => {
        this._handleLikeClick(this._id);
      });

      this._deleteButton.addEventListener('click', (evt) => {

        this._handleDeleteClick(this._id);
        //const deleteItem = evt.target.closest('.elements__item');
        //deleteItem.remove();
      });

      if (!(this._userId === this._ownerId)){
        this._deleteButton.style.display = "none";
      }


    }

    deleteCard() {
      this._element.remove();
    }

    updateLikes(newData) {
      this._likes = newData.likes;
      this._likesCounter.textContent = this._likes.length;
      if (this.isLiked()) {
        this._likeButton.classList.add('elements__like_active');
      } else {
        this._likeButton.classList.remove('elements__like_active');
      }
    }

    isLiked() {
      return this._likes.some((item) => item._id === this._userId);
    }

    generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._elementPhotoAdd.src = this._link;
      this._elementPhotoAdd.alt = this._name;
      this._likesCounter.textContent = this._likes.length;
      this._element.querySelector('.elements__title').textContent = this._name;

      return this._element;
    }

  }
