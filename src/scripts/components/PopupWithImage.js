import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupPhoto = this._popup.querySelector('.popup__photo');
    this._popupTitle = this._popup.querySelector('.popup__photo-description');
  }

  open (photo, title) {
    this._popupPhoto.src = photo;
    this._popupPhoto.alt = title;
    this._popupTitle.textContent = title;

    super.open();
  }
}