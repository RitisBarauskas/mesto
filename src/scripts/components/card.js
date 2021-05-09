export default class Card {
    constructor({user, data, handleCardClick, handleLikeClick, handleDeleteCardClick}, cardSelector) {
        this._user = user;
        this._id = data._id;
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._author = data.owner;
        this.cardSelector = cardSelector;
        this.handleCardClick = handleCardClick;
        this.handleLikeClick = handleLikeClick;
        this.handleDeleteCardClick = handleDeleteCardClick;
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
        this._likes.forEach((item) => {                     
            this._user.then((res) => {
                if (res._id == item._id) {
                    this._card.querySelector('.element__like').classList.add('element__like_active');
                }
            });
        })
        this._user.then((res) => {
            const trashElement = this._card.querySelector('.element__trash');
            if (this._author._id == res._id) {
                trashElement.addEventListener('click', (evt) => this.handleDeleteCardClick(this._card));
            } else {
                trashElement.remove();
            }
        })
        this._card = this._getTemplate();
        this._card.querySelector('.element__title').textContent = this._name;
        this._card.querySelector('.element__likes-count').textContent = this._likes.length;
        this._cardImage = this._card.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._card.querySelector('.element__like').addEventListener('click', (evt) => this.handleLikeClick(this._card));
        this._card.querySelector('.element__image').addEventListener('click', () => this.handleCardClick());
        return this._card;
      }
}
