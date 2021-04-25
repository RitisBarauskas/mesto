class Card {
    constructor({name, link, handleCardClick}, cardSelector) {
        this._link = link,
        this._name = name,
        this.cardSelector = cardSelector;
        this.handleCardClick = handleCardClick;
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

    _trash() {
        this._card.remove();
        this._card = null;
    }

    generateCard() {
        this._card = this._getTemplate();
        this._card.querySelector('.element__title').textContent = this._name;
        this._cardImage = this._card.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._card.querySelector('.element__like').addEventListener('click', (evt) => this._like(evt));
        this._card.querySelector('.element__trash').addEventListener('click', (evt) => this._trash(evt));
        this._card.querySelector('.element__image').addEventListener('click', () => this.handleCardClick());
        return this._card;
      }
}

export {Card};