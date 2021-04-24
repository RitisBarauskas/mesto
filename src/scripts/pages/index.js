// import '../../pages/index.css';
import {initialCards, validConfig} from '../utils/data.js';
import {Card} from '../components/card.js';
import {FormValidator} from '../components/formvalidator.js';
import Section from '../components/section.js';
import {editButton, nameInput, jobInput, addButton}from '../utils/constants.js';
import PopupWithImage from '../components/popupwithimage.js';
import UserInfo from '../components/userinfo.js';
import PopupWithForm from '../components/popupwithform.js';

//Обрабатываем импортируемые константы. добавляем нужные
const profileInfo = new UserInfo('.profile__title', '.profile__subtitle');

//Накладываем валидацию на формы (редактирования профиля и добавления новой карточки)
const validFormProfile = new FormValidator(validConfig, '.popup_edit-profile').enableValidation();
const validFormNewCard = new FormValidator(validConfig, '.popup_new-card').enableValidation();

//Генерация карточек при помощи Section
const photoCards = new Section(
    {
        items: initialCards,
        renderer: (item) => createCard('#place-card', item.name, item.link)    
    }, '.places__list');

photoCards.renderItems();

//Функция наполнения и открытия попапа с большой картинкой - вызывает коллбэком в функции добавления карточки
function showBigPic(name, link) {
    const newPopup = new PopupWithImage('.popup_view-pic', name, link)
    newPopup.open()
    newPopup.setEventListeners();
}

//Попап добавления новой карточки наложен на слушатель кнопки
addButton.addEventListener('click', () => {
    const addCard = new PopupWithForm('.popup_new-card', (items) => { 
        createCard('#place-card', items.name, items.link)
        addCard.reset();
    });
    addCard.open();
    addCard.setEventListeners();
});

//Функция создания новой карточки
function createCard(selector, name, link) {
    const newCard = new Card({
        name: name,
        link: link,
        handleCardClick: () => showBigPic(name, link)
    }, selector).generateCard();
    photoCards.newAddItem(newCard);
  }

//Обрабатываем кнопку редактирования профиля
editButton.addEventListener('click', () => {
    const editForm = new PopupWithForm('.popup_edit-profile', () => {
        profileInfo.setUserInfo(nameInput.value, jobInput.value)
    });
    const defaultDataProfile = profileInfo.getUserInfo()
    nameInput.value = defaultDataProfile.title;
    jobInput.value = defaultDataProfile.subtitle;
    editForm.open();
    editForm.setEventListeners();    
  });
