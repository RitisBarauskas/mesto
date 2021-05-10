import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    open(name, link) {
        super.open();
        this._image = this._popup.querySelector('.popup__image');
        this._title = this._popup.querySelector('.popup__title');
        this._image.src = link;
        this._image.alt = name;
        this._title.textContent = name;
    }
}