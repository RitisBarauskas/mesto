function showInputError(formElement, inputElement, errorMessage) {
    // Добавляем ошибки
}

function hideInputError(formElement, inputElement) {
    // Удаляем ошибки
}

function checkInputValidity(formElement, inputElement) {
    //Проверяем на валидацию
}

function setEventListener(formElement) {
    // Обрабатываем все поля полученных форм
}

function enableValidation(arr) {
    // Обработаем все формы
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }); 