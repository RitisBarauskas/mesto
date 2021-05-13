import './index.css';
import {validConfig} from '../scripts/utils/data.js';
import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import {
    editButton, 
    nameInput, 
    jobInput, 
    addButton, 
    edtiAvatarButton, 
    avtarLink, 
    buttonFormSubmit, 
    buttonNewCard, 
    buttonEditProfile, 
    buttonChangeAvatar
} from '../scripts/utils/constants.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import UserInfo from '../scripts/components/UserInfo.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';

let userID = 'UnknowID';

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-23/',
    headers: {
        authorization: '67508a95-3c83-40de-953a-884e486cfdce',
        "content-type": "application/json"
    }
})

api.getInitialData()
    .then((data) => {
        const cardsArr = data[0];
        const userInfo = data[1];
        userID = userInfo._id;
        profileInfo.setUserInfo(userInfo.name, userInfo.about, userInfo.avatar);
        photoCards.renderItems(cardsArr);        
    }).catch((err) => console.log(err));

const photoCards = new Section({
        renderer: (item) => createCard('#place-card', item)
    }, '.places__list');


const profileInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__edit-avatar');

// Создаем общий попап открытия картинки и навешиваем на него слушателя
const popupBigPic = new PopupWithImage('.popup_view-pic')
popupBigPic.setEventListeners()

// Создаем попап-форму добавления новой карточки и навешиваем на нее слушателя + слушаем нажатие кнопки
const popupNewCard = new PopupWithForm('.popup_new-card', (items) => {
    renderLoading(true, buttonNewCard, 'Сохранение...');
    api.addCard(items)
        .then((data) => {
            createCard('#place-card', data);
            popupNewCard.reset();
        }).finally(renderLoading(false, buttonNewCard, null, 'Создать'));        
});
popupNewCard.setEventListeners();
addButton.addEventListener('click', () => popupNewCard.open());

// Попап с подтверждением удаления
const popupDeleteCard = new PopupWithSubmit('.popup_delete-card')
popupDeleteCard.setEventListeners();

// Создаем попап-форму редактирования профиля и навешиваем на нее слушателя + слушаем кнопку
const popupEditProfile = new PopupWithForm('.popup_edit-profile', (data) => {
    renderLoading(true, buttonEditProfile, 'Сохранение...');
    api.editProfile({
        name: data.title,
        about: data.subtitle
    })
    .then((data) => {
        profileInfo.setUserInfo(data.name, data.about, data.avatar);
    }).finally(renderLoading(false, buttonEditProfile, null, 'Сохранить'));
    
    });
popupEditProfile.setEventListeners();
editButton.addEventListener('click', () => {
    const defaultDataProfile = profileInfo.getUserInfo()
    nameInput.value = defaultDataProfile.title;
    jobInput.value = defaultDataProfile.subtitle;
    popupEditProfile.open();
    });

function renderLoading(isLoading, button, loadText=null, defaultText=null) {
    if (isLoading) {
        button.value = loadText
    } else {
        button.value = defaultText
    }
}

// Попап изменения аватара
const popupChangeAvatar = new PopupWithForm('.popup_edit-avatar', (data) => {
    renderLoading(true, buttonChangeAvatar, 'Сохранение...');
    api.udateAvatar({
        avatar: data.linkAvatar,
    })
    .then((data) => {
        profileInfo.setUserInfo(data.name, data.about, data.avatar);
    }).finally(renderLoading(false, buttonChangeAvatar, null, 'Сохранить'));
})
popupChangeAvatar.setEventListeners();
edtiAvatarButton.addEventListener('click', () => {
    avtarLink.value = '';
    popupChangeAvatar.open();
})

//Функция создания новой карточки
function createCard(selector, data) {
    const newCard = new Card({
        userID: userID,
        data: data,
        handleCardClick: () => popupBigPic.open(data.name, data.link),
        handleLikeClick: (evt) => {
            const likeElementButton = evt.querySelector('.element__like');
            const likeElementCount = evt.querySelector('.element__likes-count');
            if (likeElementButton.classList.contains('element__like_active')){
                api.deleteLike(data._id)
                    .then((res) => {
                        likeElementButton.classList.remove('element__like_active');
                        likeElementCount.textContent = res.likes.length;
                    })
            } else {
                api.addLike(data._id)
                .then((res) => {
                    likeElementButton.classList.add('element__like_active');
                    likeElementCount.textContent = res.likes.length;
                })
            }            
        },
        handleDeleteCardClick: () => { 
            popupDeleteCard.setSubmitAction(() => {
                renderLoading(true, buttonFormSubmit, 'Удаление...');
                api.deleteCard(data._id)
                    .then((res) => {
                        newCard.remove();
                    }).finally(renderLoading(false, buttonFormSubmit, null, 'Да')); 
            });
            popupDeleteCard.open();            
        }
    }, selector).generateCard();
    photoCards.newAddItem(newCard);
    }

// Накладываем валидацию на формы (редактирования профиля и добавления новой карточки)
const validFormProfile = new FormValidator(validConfig, '.popup_edit-profile')
validFormProfile.enableValidation();
const validFormNewCard = new FormValidator(validConfig, '.popup_new-card')
validFormNewCard.enableValidation();
const validFormAvatar = new FormValidator(validConfig, '.popup_edit-avatar')
validFormAvatar.enableValidation();

