const closeByEscape = (evt) => {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened')
        closePopup(openedPopup);
    }
}

const openPopup = (popup) => {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

const closePopup = (popup) => {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

export {openPopup, closePopup};
