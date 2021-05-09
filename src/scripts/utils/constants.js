const popupEditForm = document.querySelector('.popup_edit-profile');
const editButton = document.querySelector('.profile__edit-button');
const nameInput = popupEditForm.querySelector('input[name="title"]');
const jobInput = popupEditForm.querySelector('input[name="subtitle"]');
const addButton = document.querySelector('.profile__add-button');
const popupEditAvatar = document.querySelector('.popup_edit-avatar');
const edtiAvatarButton = document.querySelector('.profile__edit-avatar');
const avtarLink = popupEditAvatar.querySelector('input[name="link-avatar"]');

export {editButton, nameInput, jobInput, addButton, edtiAvatarButton, avtarLink, popupEditAvatar}