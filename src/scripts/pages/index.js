// import '../../pages/index.css';
import {validConfig} from '../utils/data.js';
import Api from '../components/api.js';
import Card from '../components/card.js';
import {FormValidator} from '../components/formvalidator.js';
import Section from '../components/section.js';
import {editButton, nameInput, jobInput, addButton, edtiAvatarButton, avtarLink} from '../utils/constants.js';
import PopupWithImage from '../components/popupwithimage.js';
import UserInfo from '../components/userinfo.js';
import PopupWithForm from '../components/popupwithform.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import PopupChangeAvatar from '../components/PopupChangeAvatar.js';


const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-23/',
    headers: {
        authorization: '67508a95-3c83-40de-953a-884e486cfdce',
        "content-type": "application/json"
    }
})

const photoCards = new Section({
    renderer: (item) => createCard('#place-card', item)
}, '.places__list');


api.getDataCard()
    .then((data) => photoCards.renderItems(data));

//Обрабатываем импортируемые константы. добавляем нужные
const profileInfo = new UserInfo('.profile__title', '.profile__subtitle', '.profile__edit-avatar');
api.getUser()
    .then((data) => {
        profileInfo.setUserInfo(data.name, data.about, data.avatar);
    })

// Накладываем валидацию на формы (редактирования профиля и добавления новой карточки)
const validFormProfile = new FormValidator(validConfig, '.popup_edit-profile')
validFormProfile.enableValidation();
const validFormNewCard = new FormValidator(validConfig, '.popup_new-card')
validFormNewCard.enableValidation();
const validFormAvatar = new FormValidator(validConfig, '.popup_edit-avatar')
validFormAvatar.enableValidation();


// // Создаем общий попап открытия картинки и навешиваем на него слушателя
const popupBigPic = new PopupWithImage('.popup_view-pic')
popupBigPic.setEventListeners()

// Создаем попап-форму добавления новой карточки и навешиваем на нее слушателя + слушаем нажатие кнопки
const popupNewCard = new PopupWithForm('.popup_new-card', (items) => {
    const button = document.querySelector('.popup_new-card').querySelector('.popup__button');
    renderLoading(true, button, 'Сохранение...');
    api.addCard(items)
        .then((data) => {
            createCard('#place-card', data);
            popupNewCard.reset();
        }).finally(renderLoading(false));        
});
popupNewCard.setEventListeners();
addButton.addEventListener('click', () => popupNewCard.open());


// Попап с подтверждением удаления
const popupDeleteCard = new PopupWithSubmit('.popup_delete-card', (idCard, card) => {
    api.deleteCard(idCard)
        .then((res) => {
            card.remove();
            card = null;
        })
})
popupDeleteCard.setEventListeners();


//Функция создания новой карточки
function createCard(selector, data) {
    const newCard = new Card({
        user: api.getUser().then((data) => {return data}),
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
        handleDeleteCardClick: (evt) => {
            popupDeleteCard.open();
            popupDeleteCard.setSubmitAction(data._id, evt);
            
        }
    }, selector).generateCard();
    photoCards.addItem(newCard);
    }


// Создаем попап-форму редактирования профиля и навешиваем на нее слушателя + слушаем кнопку
const popupEditProfile = new PopupWithForm('.popup_edit-profile', () => {
    const button = document.querySelector('.popup_edit-profile').querySelector('.popup__button');
    renderLoading(true, button, 'Сохранение...');
    api.editProfile({
        name: nameInput.value,
        about: jobInput.value
    })
    .then((data) => {
        profileInfo.setUserInfo(data.name, data.about, data.avatar);
    }).finally(renderLoading());
    
    });
popupEditProfile.setEventListeners();
editButton.addEventListener('click', () => {
    const defaultDataProfile = profileInfo.getUserInfo()
    nameInput.value = defaultDataProfile.title;
    jobInput.value = defaultDataProfile.subtitle;
    popupEditProfile.open();
    });

function renderLoading(isLoading, button=null, LoadText=null) {
    if (isLoading) {
        button.value = LoadText
    }
}

// Попап изменения аватара
const popupChangeAvatar = new PopupChangeAvatar('.popup_edit-avatar', () => {
    const button = document.querySelector('.popup_edit-avatar').querySelector('.popup__button');
    renderLoading(true, button, 'Сохранение...');
    api.udateAvatar({
        avatar: avtarLink.value,
    })
    .then((data) => {
        profileInfo.setUserInfo(data.name, data.about, data.avatar);
    }).finally(renderLoading(false));
})
popupChangeAvatar.setEventListeners();
edtiAvatarButton.addEventListener('click', () => {
    const defaultDataProfile = profileInfo.getUserInfo();
    avtarLink.value = defaultDataProfile.urlAvatar.slice(5, defaultDataProfile.urlAvatar.length-2);
    popupChangeAvatar.open();
})
