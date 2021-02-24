let editForm = document.querySelector('.edit-form');
let closeButton = editForm.querySelector('.edit-form__close');
let saveButton = editForm.querySelector('.edit-form__button');
let nameInput = editForm.querySelector('[name="title"]');
let jobInput = editForm.querySelector('[name="subtitle"]');
let profile = document.querySelector('.profile')
let editButton = profile.querySelector('.profile__edit-button');
let profileTitle = profile.querySelector('.profile__title');
let profileSubTitle = profile.querySelector('.profile__subtitle');

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = jobInput.value;
    popup();    
}

function popup() {
    editForm.classList.toggle('edit-form_opened');
    if (editForm.classList.contains('edit-form_opened')) {
        nameInput.setAttribute("value", profileTitle.textContent);
        jobInput.setAttribute("value", profileSubTitle.textContent);
    }
}

editButton.addEventListener('click', popup);
closeButton.addEventListener('click', popup);
editForm.addEventListener('submit', formSubmitHandler); 
