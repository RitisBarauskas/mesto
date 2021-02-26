let editForm = document.querySelector('.popup');
let closeButton = editForm.querySelector('.popup__close');
let saveButton = editForm.querySelector('.popup__button');
let nameInput = editForm.querySelector('input[name="title"]');
let jobInput = editForm.querySelector('input[name="subtitle"]');
let profileForm = editForm.querySelector('.popup__form');
let profile = document.querySelector('.profile')
let editButton = profile.querySelector('.profile__edit-button');
let profileTitle = profile.querySelector('.profile__title');
let profileSubTitle = profile.querySelector('.profile__subtitle');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = jobInput.value;
    openPopup();    
}

function openPopup() {
    editForm.classList.toggle('popup_opened');
    if (editForm.classList.contains('popup_opened')) {
        nameInput.value = profileTitle.textContent;
        jobInput.value = profileSubTitle.textContent;
    }
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', openPopup);
profileForm.addEventListener('submit', formSubmitHandler); 
