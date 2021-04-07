import {initialCards} from './data.js';
import {Card} from './card.js';
import {ValidateForm} from './validate.js';

const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupBigPic = document.querySelector('.popup_view-pic');
const popupNewCard = document.querySelector('.popup_new-card');
const popupEditForm = document.querySelector('.popup_edit-profile');
const popupBigPicImage = popupBigPic.querySelector('.popup__image');
const popupBigPicTitle = popupBigPic.querySelector('.popup__title');
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
    cardElement.querySelector('.element__image').addEventListener('click', () => {
        openPopup(popupBigPic);
        popupBigPicImage.src = item.link;
        popupBigPicImage.alt = item.name;
        popupBigPicTitle.textContent = item.name;
      });
    placesList.prepend(cardElement);
})

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    })
})

const closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
}

editButton.addEventListener('click', function() {
    openPopup(popupEditForm);
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
  addButton.addEventListener('click', () => openPopup(popupNewCard));
  popupNewCard.addEventListener('submit', function(evt) {
      evt.preventDefault();
      const newCard = new Card('#place-card', newCardName.value, newCardLink.value);
      newCard.generateCard();
      newCardLink.value = '';
      newCardName.value = '';
      closePopup(popupNewCard);    
  });