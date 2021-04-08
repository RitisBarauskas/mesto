const initialCards = [
    {
      name: 'Алапаевск',
      link: 'images/places/alapaevsk.jpg'
    },
    {
      name: 'Башкирия',
      link: 'images/places/bashkiria.jpg'
    },
    {
      name: 'Пермский край',
      link: 'images/places/permsky.jpg'
    },
    {
      name: 'Пещера Чудесница (р. Чусовая)',
      link: 'images/places/chusovaya.jpg'
    },
    {
      name: 'р. Усьва (Пермский край)',
      link: 'images/places/usva.jpg'
    },
    {
      name: 'р. Зилим (Башкирия)',
      link: 'images/places/zilim.jpg'
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