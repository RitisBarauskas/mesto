
class Card {
    constructor(cardSelector, cardTitle, cardLink) {
        this.cardSelector = cardSelector;
        this.cardTitle = cardTitle;
        this.cardLink = cardLink;
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

    generateCard() {
        this._card = this._getTemplate();
        this._card.querySelector('.element__title').textContent = this.cardTitle;
        this._cardImage = this._card.querySelector('.element__image');
        this._cardImage.src = this.cardLink;
        this._cardImage.alt = this.cardTitle;
        this._card.querySelector('.element__like').addEventListener('click', (evt) => this._like(evt));
        this._card.querySelector('.element__trash').addEventListener('click', (evt) => this._trash(evt));
        return this._card;
      }
}

export {Card};