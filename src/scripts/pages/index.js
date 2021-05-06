// import '../../pages/index.css';
import Api from '../components/api.js';
import {validConfig} from '../utils/data.js';
import {Card} from '../components/card.js';
import {FormValidator} from '../components/formvalidator.js';
import Section from '../components/section.js';
import {editButton, nameInput, jobInput, addButton} from '../utils/constants.js';
import PopupWithImage from '../components/popupwithimage.js';
import UserInfo from '../components/userinfo.js';
import PopupWithForm from '../components/popupwithform.js';


const cardsPhoto = new Section(
    {
        renderer: (item) => createCard('#place-card', item)    
    }, '.places__list');

const cardsApi = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-23/',
    headers: {
        authorization: '67508a95-3c83-40de-953a-884e486cfdce',
        "content-type": "application/json"
    }
})

// Генерация новых карточек
cardsApi.getDataCard()
    .then((data) => {
        cardsPhoto.renderItems(data);
    })

//Функция создания новой карточки
function createCard(selector, data) {
    const newCard = new Card({
        data: data,
        handleCardClick: () => popupBigPic.open(data.name, data.link)
    }, selector, cardsApi).generateCard();
    cardsPhoto.newAddItem(newCard);
}

//Обрабатываем импортируемые константы. добавляем нужные
const profileInfo = new UserInfo('.profile__title', '.profile__subtitle');

//Накладываем валидацию на формы (редактирования профиля и добавления новой карточки)
const validFormProfile = new FormValidator(validConfig, '.popup_edit-profile')
validFormProfile.enableValidation();
const validFormNewCard = new FormValidator(validConfig, '.popup_new-card')
validFormNewCard.enableValidation();

// Создаем общий попап открытия картинки и навешиваем на него слушателя
const popupBigPic = new PopupWithImage('.popup_view-pic')
popupBigPic.setEventListeners()

// Создаем попап-форму добавления новой карточки и навешиваем на нее слушателя + слушаем нажатие кнопки
const popupNewCard = new PopupWithForm('.popup_new-card', (items) => {
        cardsApi.addCard(items)
            .then((data) => {
                createCard('#place-card', data);
                popupNewCard.reset();
            });        
    });
popupNewCard.setEventListeners();
addButton.addEventListener('click', () => popupNewCard.open());

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
