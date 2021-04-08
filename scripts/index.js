import {initialCards, validConfig} from './data.js';
import {Card} from './card.js';
import {FormValidator} from './validate.js';
import {openPopup, closePopup} from './utils.js';


const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupNewCard = document.querySelector('.popup_new-card');
const popupEditForm = document.querySelector('.popup_edit-profile');
const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const newCardName = popupNewCard.querySelector('input[name="name"]');
const newCardLink = popupNewCard.querySelector('input[name="link"]');
const nameInput = popupEditForm.querySelector('input[name="title"]');
const jobInput = popupEditForm.querySelector('input[name="subtitle"]');
const addButton = profile.querySelector('.profile__add-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubTitle = profile.querySelector('.profile__subtitle');

initialCards.forEach((item) => {
    const newCard = new Card('#place-card', item.name, item.link);
    const cardElement = newCard.generateCard();    
    placesList.prepend(cardElement);
})

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    })
})

editButton.addEventListener('click', function() {
    openPopup(popupEditForm);
    const newValidForm = new FormValidator(validConfig, '.popup_edit-profile')
    newValidForm.enableValidation();
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubTitle.textContent;
  });
  
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = jobInput.value;
    closePopup(popupEditForm);
}

popupEditForm.addEventListener('submit', formSubmitHandler)

addButton.addEventListener('click', () => {
    const newValidForm = new FormValidator(validConfig, '.popup_new-card')
    newValidForm.enableValidation();
    openPopup(popupNewCard)
});

popupNewCard.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const newCard = new Card('#place-card', newCardName.value, newCardLink.value);
    const cardElement = newCard.generateCard();
    placesList.prepend(cardElement);
    newCardLink.value = '';
    newCardName.value = '';      
    closePopup(popupNewCard);    
});
