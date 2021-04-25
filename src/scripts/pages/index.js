import '../../pages/index.css';
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
const validFormProfile = new FormValidator(validConfig, '.popup_edit-profile')
validFormProfile.enableValidation();
const validFormNewCard = new FormValidator(validConfig, '.popup_new-card')
validFormNewCard.enableValidation();

//Генерация карточек при помощи Section
const photoCards = new Section(
    {
        items: initialCards,
        renderer: (item) => createCard('#place-card', item.name, item.link)    
    }, '.places__list');

photoCards.renderItems();

// Создаем общий попап открытия картинки и навешиваем на него слушателя
const popupBigPic = new PopupWithImage('.popup_view-pic')
popupBigPic.setEventListeners()

// Создаем попап-форму добавления новой карточки и навешиваем на нее слушателя + слушаем нажатие кнопки
const popupNewCard = new PopupWithForm('.popup_new-card', (items) => { 
        createCard('#place-card', items.name, items.link)
        popupNewCard.reset();
    });
popupNewCard.setEventListeners();
addButton.addEventListener('click', () => popupNewCard.open());

//Функция создания новой карточки
function createCard(selector, name, link) {
    const newCard = new Card({
        name: name,
        link: link,
        handleCardClick: () => popupBigPic.open(name, link)
    }, selector).generateCard();
    photoCards.newAddItem(newCard);
    }

// Создаем попап-форму редактирования профиля и навешиваем на нее слушателя + слушаем кнопку
const popupEditProfile = new PopupWithForm('.popup_edit-profile', () => {
    profileInfo.setUserInfo(nameInput.value, jobInput.value)
    });
popupEditProfile.setEventListeners();
editButton.addEventListener('click', () => {
    const defaultDataProfile = profileInfo.getUserInfo()
    nameInput.value = defaultDataProfile.title;
    jobInput.value = defaultDataProfile.subtitle;
    popupEditProfile.open();
    });
