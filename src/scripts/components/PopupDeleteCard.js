import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(idCard) {
        super(popupSelector);
        this._idCard = idCard;
    }

    deleteCard() {
        console.log('hellow');
    }
}