const alapaevsk = new URL('../../images/places/alapaevsk.jpg', import.meta.url);
const bashkiria = new URL('../../images/places/bashkiria.jpg', import.meta.url);
const permsky = new URL('../../images/places/permsky.jpg', import.meta.url);
const chusovaya = new URL('../../images/places/chusovaya.jpg', import.meta.url);
const usva = new URL('../../images/places/usva.jpg', import.meta.url);
const zilim = new URL('../../images/places/zilim.jpg', import.meta.url);

const initialCards = [
    {
      name: 'Алапаевск',
      link: alapaevsk
    },
    {
      name: 'Башкирия',
      link: bashkiria
    },
    {
      name: 'Пермский край',
      link: permsky
    },
    {
      name: 'Пещера Чудесница (р. Чусовая)',
      link: chusovaya
    },
    {
      name: 'р. Усьва (Пермский край)',
      link: usva
    },
    {
      name: 'р. Зилим (Башкирия)',
      link: zilim
    }
  ];

const validConfig = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

export {initialCards, validConfig};