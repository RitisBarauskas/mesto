class FormValidator {

    constructor(config, selector) {
        this.inputSelector = config.inputSelector;
        this.submitButtonSelector = config.submitButtonSelector;
        this.inactiveButtonClass = config.inactiveButtonClass;
        this.inputErrorClass = config.inputErrorClass;
        this.errorClass = config.errorClass;
        this.selector = selector;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.errorClass);
    }    
    
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.inputErrorClass);
        errorElement.classList.remove(this.errorClass);
        errorElement.textContent = '';
    }    
    
    _hasInvalidInput(inputList){
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }    
    
    _toggleButtonState(inputList, buttonElement){
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove(this.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }    
    
    _checkInputValidity(inputElement){
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    }    
    
    _setEventListeners(){
        const inputList = Array.from(this._formElement.querySelectorAll(this.inputSelector));
        const buttonElement = this._formElement.querySelector(this.submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            })
        })
    }
    
    
    enableValidation(){
        this._formElement = document.querySelector(this.selector);
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners();
    }
}

export {FormValidator};