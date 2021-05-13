const popupEditForm = document.querySelector('.popup_edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = popupEditForm.querySelector('input[name="title"]');
const jobInput = popupEditForm.querySelector('input[name="subtitle"]');
const addButton = document.querySelector('.profile__add-button');
const popupEditAvatar = document.querySelector('.popup_edit-avatar');
const edtiAvatarButton = document.querySelector('.profile__edit-avatar');
const avtarLink = popupEditAvatar.querySelector('input[name="linkAvatar"]');
const buttonFormSubmit = document.querySelector('.popup_delete-card').querySelector('.popup__button');
const buttonNewCard = document.querySelector('.popup_new-card').querySelector('.popup__button');
const buttonEditProfile = document.querySelector('.popup_edit-profile').querySelector('.popup__button');
const buttonChangeAvatar = document.querySelector('.popup_edit-avatar').querySelector('.popup__button');

export {editButton, nameInput, jobInput, addButton, edtiAvatarButton, avtarLink, popupEditAvatar, buttonFormSubmit, buttonNewCard, buttonEditProfile, buttonChangeAvatar}