export default class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._closeButton = this._popup.querySelector('.popup__button-close');
      this._escapeClose = this._handleEscapeClose.bind(this);
    }

    open() {
      this._popup.classList.add('popup_is-opened');
      document.addEventListener('keydown', this._escapeClose);
    }
      
    close() {
      this._popup.classList.remove('popup_is-opened');
      document.removeEventListener('keydown', this._escapeClose);
    }

    _handleEscapeClose (evt) {
        if (evt.key === "Escape") {
          this.close();
        }
      }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => {
          this.close();
        });
        this._popup.addEventListener('mousedown', (evt) => {
          if (evt.target === evt.currentTarget) {
            this.close();
          }
        });
      }

}

