import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._itemList = this._popup.querySelector('.popup__container').querySelectorAll('.popup__input');
        this._form = this._popup.querySelector('.popup__form');
        this._buttonSubmit = this._popup.querySelector('.popup__button');
    }

    _getInputValues() {
        this._inputValues = {};
        this._itemList.forEach(inputElement => {
            this._inputValues[inputElement.name] = inputElement.value;
        });
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();        
        this._buttonSubmit.setAttribute('disabled', true);
        this._buttonSubmit.classList.add('popup__button_disabled');
    }
}