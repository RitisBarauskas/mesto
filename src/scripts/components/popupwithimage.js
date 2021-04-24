import Popup from './popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector, name, link) {
        super(popupSelector);
        this._name = name;
        this._link = link;
    }

    open() {
        super.open();
        this._image = this._popup.querySelector('.popup__image');
        this._title = this._popup.querySelector('.popup__title');
        this._image.src = this._link;
        this._image.alt = this._name;
        this._title.textContent = this._name;
    }
}