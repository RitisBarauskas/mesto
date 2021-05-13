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

    _setEventListeners() {        
        if (this._author._id == this._userID) {
            this._trashElement.addEventListener('click', (evt) => this.handleDeleteCardClick(this._card));
        } else {
            this._trashElement.remove();
        }
        this._likeElementButton.addEventListener('click', (evt) => this.handleLikeClick(this));
        this._elementImage.addEventListener('click', () => this.handleCardClick());
    }

    isLiked() {
        if (this._likeElementButton.classList.contains('element__like_active')) {
            return true
        }
        return false
    }

    updateLikes(res) {        
        this._likeElementCount.textContent = res.likes.length;
        res.likes.forEach((author) => {
            if (author._id == this._userID) {
                this._likeElementButton.classList.add('element__like_active');
            } else {
                this._likeElementButton.classList.remove('element__like_active');
            }
        })
    }

    generateCard() {
        this._card = this._getTemplate();
        this._likeElementCount = this._card.querySelector('.element__likes-count');
        this._likeElementButton = this._card.querySelector('.element__like');
        this._trashElement = this._card.querySelector('.element__trash');
        this._elementImage = this._card.querySelector('.element__image');
        this._likes.forEach((item) => {
            if (this._userID == item._id) {
                this._likeElementButton.classList.add('element__like_active');
            }
        })
        this._card.querySelector('.element__title').textContent = this._name;
        this._likeElementCount.textContent = this._likes.length;
        this._cardImage = this._card.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._setEventListeners();
        return this._card;
      }
}
