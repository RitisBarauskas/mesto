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

const popups = document.querySelectorAll('.popup');
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
const addButton = profile.querySelector('.profile__add-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubTitle = profile.querySelector('.profile__subtitle');
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
    placeElementImage.addEventListener('click', () => {
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

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
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
    newCard(newCardLink.value, newCardName.value);
    newCardLink.value = '';
    newCardName.value = '';
    closePopup(popupNewCard);    
});


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
