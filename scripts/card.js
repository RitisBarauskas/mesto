class Card {
    constructor(cardSelector, openCard) {
        this.cardSelector = cardSelector;
        this.openCard = openCard;
    }

    _getTemplate() {
        this._cardElement = document
            .querySelector(this.cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return this._cardElement;
    }

    _like(evt) {
        this._eventTarget = evt.target;
        this._eventTarget.classList.toggle('element__like_active');
    }

    _trash(evt) {
        this._eventTarget = evt.target;
        this._eventTarget.parentElement.remove();
    }

    generateCard(cardTitle, cardLink) {
        this._card = this._getTemplate();
        this._card.querySelector('.element__title').textContent = cardTitle;
        this._cardImage = this._card.querySelector('.element__image');
        this._cardImage.src = cardLink;
        this._cardImage.alt = cardTitle;
        this._card.querySelector('.element__like').addEventListener('click', (evt) => this._like(evt));
        this._card.querySelector('.element__trash').addEventListener('click', (evt) => this._trash(evt));
        this._card.querySelector('.element__image').addEventListener('click', () => this.openCard());
        return this._card;
      }
}

export {Card};