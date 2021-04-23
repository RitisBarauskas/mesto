// import '../../pages/index.css';
import {initialCards, validConfig} from '../utils/data.js';
import {Card} from '../components/card.js';
import {FormValidator} from '../components/formvalidator.js';
import {openPopup, closePopup} from '../utils/utils.js';
import Section from '../components/section.js';
import {placesList, profile, popups, popupNewCard, popupEditForm, popupBigPic} from '../utils/constants.js';

//Обрабатываем импортируемые константы. добавляем нужные
const editButton = profile.querySelector('.profile__edit-button');
const newCardName = popupNewCard.querySelector('input[name="name"]');
const newCardLink = popupNewCard.querySelector('input[name="link"]');
const nameInput = popupEditForm.querySelector('input[name="title"]');
const jobInput = popupEditForm.querySelector('input[name="subtitle"]');
const addButton = profile.querySelector('.profile__add-button');
const profileTitle = profile.querySelector('.profile__title');
const profileSubTitle = profile.querySelector('.profile__subtitle');
const popupBigPicImage = popupBigPic.querySelector('.popup__image');
const popupBigPicTitle = popupBigPic.querySelector('.popup__title');

//Накладываем валидацию на формы (редактирования профиля и добавления новой карточки)
const validFormProfile = new FormValidator(validConfig, '.popup_edit-profile').enableValidation();
const validFormNewCard = new FormValidator(validConfig, '.popup_new-card').enableValidation();

//Генерация карточек при помощи Section
const photoCards = new Section(
    {
        items: initialCards,
        renderer: (item) => {
            const photoCard = new Card('#place-card', () => showBigPic(item.name, item.link)).generateCard(item.name, item.link)
            photoCards.addItem(photoCard);
        }
    }, '.places__list');

photoCards.renderItems();


//Функция наполнения и открытия попапа с большой картинкой - вызывает коллбэком в функции добавления карточки
function showBigPic(name, link) {
    popupBigPicImage.src = link;
    popupBigPicImage.alt = name;
    popupBigPicTitle.textContent = name;
    openPopup(popupBigPic);
}

//Функция создания новой карточки
function createCard(selector, name, link) {
    placesList.prepend(new Card(selector, () => showBigPic(name, link)).generateCard(name, link));
  }

//Обрабатываем данные из Data, создаем первые карточки
// initialCards.forEach((item) => {
//     createCard('#place-card', item.name, item.link);
// })

//Навешиваем обработчик для закарытия попапов: запредельный клик или кнопка закрытия
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    })
})

//Обрабатываем кнопку редактирования профиля
editButton.addEventListener('click', () => {
    openPopup(popupEditForm);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubTitle.textContent;
  });

//Функция отправки и контактной информации
function formSubmitHandler (evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileSubTitle.textContent = jobInput.value;
    closePopup(popupEditForm);
}

//Навешиваем слушатель на кнопку отправки формы
popupEditForm.addEventListener('submit', formSubmitHandler)

//Слушатель на кнопку добавления новой карточки
addButton.addEventListener('click', () => {
    openPopup(popupNewCard)
});

//Форма добавления новой карточки
popupNewCard.addEventListener('submit', function(evt) {
    evt.preventDefault();
    createCard('#place-card', newCardName.value, newCardLink.value);
    newCardLink.value = '';
    newCardName.value = '';
    closePopup(popupNewCard);    
});
