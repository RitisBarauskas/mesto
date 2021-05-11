export default class Card {
    constructor({userID, data, handleCardClick, handleLikeClick, handleDeleteCardClick}, cardSelector) {
        this._userID = userID;
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

    generateCard() {
        this._card = this._getTemplate();
        this._trashElement = this._card.querySelector('.element__trash');
        if (this._author._id == this._userID) {
            this._trashElement.addEventListener('click', (evt) => this.handleDeleteCardClick(this._card));
        } else {
            this._trashElement.remove();
        }
        this._likes.forEach((item) => {
            if (this._userID == item._id) {
                this._card.querySelector('.element__like').classList.add('element__like_active');
            }
        })
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
