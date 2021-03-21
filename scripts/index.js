const initialCards = [
    {
      name: 'Алапаевск',
      link: 'images/places/alapaevsk.jpg'
    },
    {
      name: 'Башкирия',
      link: 'images/places/bashkiria.jpg'
    },
    {
      name: 'Пермский край',
      link: 'images/places/permsky.jpg'
    },
    {
      name: 'Пещера Чудесница (р. Чусовая)',
      link: 'images/places/chusovaya.jpg'
    },
    {
      name: 'р. Усьва (Пермский край)',
      link: 'images/places/usva.jpg'
    },
    {
      name: 'р. Зилим (Башкирия)',
      link: 'images/places/zilim.jpg'
    }
  ];

const placeCardTemplate = document.querySelector('#place-card').content;
const popupBigPic = document.querySelector('.popup_view-pic');
const popupNewCard = document.querySelector('.popup_new-card');
const popupEditForm = document.querySelector('.popup_edit-profile');
const placesList = document.querySelector('.places__list');
const profile = document.querySelector('.profile');
const newCardName = popupNewCard.querySelector('input[name="name"]');
const newCardLink = popupNewCard.querySelector('input[name="link"]');
const editButton = profile.querySelector('.profile__edit-button');
const nameInput = popupEditForm.querySelector('input[name="title"]');
const jobInput = popupEditForm.querySelector('input[name="subtitle"]');
const closeEditForm = popupEditForm.querySelector('.popup__close');
const addButton = profile.querySelector('.profile__add-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubTitle = profile.querySelector('.profile__subtitle');
const closeNewCard = popupNewCard.querySelector('.popup__close');
const popupBigPicImage = popupBigPic.querySelector('.popup__image');
const popupBigPicTitle = popupBigPic.querySelector('.popup__title');



function newCard(link, name){
    const placeCardElement = placeCardTemplate.querySelector('.element').cloneNode(true);
    const placeElementImage = placeCardElement.querySelector('.element__image');
    placeElementImage.src = link;
    placeElementImage.alt = name;
    placeCardElement.querySelector('.element__title').textContent = name;
    placeCardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('element__like_active');
      });
    placeCardElement.querySelector('.element__trash').addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.parentElement.remove();
      });
    placeElementImage.addEventListener('click', function (evt) {
        openPopup(popupBigPic);
        popupBigPicImage.src = link;
        popupBigPicImage.alt = name;
        popupBigPicTitle.textContent = name;
      });
    placesList.prepend(placeCardElement);
}

initialCards.forEach(function (item) {
    newCard(item.link, item.name);
})

popupBigPic.querySelector('.popup__close').addEventListener('click', () => closePopup(popupBigPic));

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}


editButton.addEventListener('click', function() {
  openPopup(popupEditForm);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubTitle.textContent;
});
closeEditForm.addEventListener('click', () => closePopup(popupEditForm));
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = jobInput.value;
    closePopup(popupEditForm);
}
popupEditForm.addEventListener('submit', formSubmitHandler)

addButton.addEventListener('click', () => openPopup(popupNewCard));
closeNewCard.addEventListener('click', () => closePopup(popupNewCard));
popupNewCard.addEventListener('submit', function(evt) {
    evt.preventDefault();
    newCard(newCardLink.value, newCardName.value);
    newCardLink.value = '';
    newCardName.value = '';
    closePopup(popupNewCard);    
});

popupBigPic.addEventListener('mousedown', (evt) => {
    if (evt.target.closest('.popup__container') === null){
        closePopup(popupBigPic);
    }
});
popupEditForm.addEventListener('mousedown', (evt) => {
    if (evt.target.closest('.popup__container') === null){
        closePopup(popupEditForm);
    }
});
popupNewCard.addEventListener('mousedown', (evt) => {
    if (evt.target.closest('.popup__container') === null){
        closePopup(popupNewCard);
    }
});

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        closePopup(popupBigPic);
        closePopup(popupEditForm);
        closePopup(popupNewCard);
    }
})