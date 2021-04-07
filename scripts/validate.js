class FormValidator {
    constructor(config, selector) {
        this.config = config;
        this.selector = selector;
    }

    _setEventListeners(form) {
        this.inputList = Array.from(form.querySelectorAll(this.config.inputSelector));
        this.buttonElement = form.querySelector(this.config.submitButtonSelector);
        _toggleButtonState(this.inputList, this.buttonElement);
        this.inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                checkInputValidity(form, inputElement);
                toggleButtonState(this.inputList, this.buttonElement);
            })
        })
    }

    enableValidation() {
        this._form = document.querySelector(this.selector);
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners();
    }
}

export {FormValidator};