class FormValidator {

    constructor(config, selector) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;
        this._selector = selector;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    }    
    
    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    }    
    
    _disableButton(buttonElement) {
        buttonElement.classList.add(this._inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } 

    _hasInvalidInput(inputList){
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        })
    }    
    
    _toggleButtonState(inputList, buttonElement){
        if (this._hasInvalidInput(inputList)) {
            this._disableButton(buttonElement)
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
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
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._formElement.addEventListener('reset', () => {
            inputList.forEach((inputElement) => {
                this._hideInputError(inputElement);
            })
            this._disableButton(buttonElement);
        });
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            })
        })
    }
    
    
    enableValidation(){
        this._formElement = document.querySelector(this._selector);
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        this._setEventListeners();
    }
}

export {FormValidator};