import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._itemList = this._popup.querySelector('.popup__container').querySelectorAll('.popup__input');
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
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }

    reset() {
        this._itemList.forEach(inputElement => {
            inputElement.value = '';
        });
        this._buttonSubmit = this._popup.querySelector('.popup__button')
        this._buttonSubmit.setAttribute('disabled', true);
        this._buttonSubmit.classList.add('popup__button_disabled');
    }
}