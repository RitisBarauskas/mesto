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
const bigPicTemplate = document.querySelector('#view-pic').content;
const placesList = document.querySelector('.places__list');

function newCard(link, name){
    const placeCardElement = placeCardTemplate.querySelector('.element').cloneNode(true);
    placeCardElement.querySelector('.element__image').src = link;
    placeCardElement.querySelector('.element__image').alt = name;
    placeCardElement.querySelector('.element__title').textContent = name;
    placeCardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.classList.toggle('element__like_active');
      });
    placeCardElement.querySelector('.element__trash').addEventListener('click', function (evt) {
        const eventTarget = evt.target;
        eventTarget.parentElement.remove();
      });
    placeCardElement.querySelector('.element__image').addEventListener('click', function (evt) {
        openPopup('.popup_view-pic');
        const bigPic = bigPicTemplate.querySelector('.popup__container').cloneNode(true);
        bigPic.querySelector('.popup__title').textContent = name;
        console.log(name);
        bigPic.querySelector('.popup__image').src = link;
        bigPic.querySelector('.popup__image').alt = name;
        const popup = document.querySelector('.popup_view-pic');
        popup.append(bigPic);
        const closeBigPic = popup.querySelector('.popup__close');
        closeBigPic.addEventListener('click', function() {
            bigPic.remove();
            closePopup('.popup_view-pic');
        });
      });
    placesList.prepend(placeCardElement);
}

initialCards.forEach(function (item) {
    newCard(item.link, item.name);
})


function openPopup(popupClass) {
    const popup = document.querySelector(popupClass);
    popup.classList.add('popup_opened');
    if (popupClass === '.popup_edit-profile' && popup.classList.contains('popup_opened')) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubTitle.textContent;
    }
}

function closePopup(popupClass) {
    const popup = document.querySelector(popupClass);
    popup.classList.remove('popup_opened');
}


const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const editForm = document.querySelector('.popup_edit-profile');
const nameInput = editForm.querySelector('input[name="title"]');
const jobInput = editForm.querySelector('input[name="subtitle"]');
const closeEditForm = editForm.querySelector('.popup__close');
const addButton = profile.querySelector('.profile__add-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubTitle = profile.querySelector('.profile__subtitle');
const saveEditForm = editForm.querySelector('.popup__button');
const newCardForm = document.querySelector('.popup_new-card');
const closeNewCard = newCardForm.querySelector('.popup__close');

editButton.addEventListener('click', () => openPopup('.popup_edit-profile'));
closeEditForm.addEventListener('click', () => closePopup('.popup_edit-profile'));
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = jobInput.value;
    closePopup('.popup_edit-profile');
}
editForm.addEventListener('submit', formSubmitHandler)

addButton.addEventListener('click', () => openPopup('.popup_new-card'));
closeNewCard.addEventListener('click', () => closePopup('.popup_new-card'));
newCardForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    const newCardName = newCardForm.querySelector('input[name="name"]');
    const newCardLink = newCardForm.querySelector('input[name="link"]');
    newCard(newCardLink.value, newCardName.value);
    newCardLink.value = '';
    newCardName.value = '';
    closePopup('.popup_new-card');    
});


