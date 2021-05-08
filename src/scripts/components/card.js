class newCard {
    constructor({data, handleCardClick, handleLikeClick, handleDeleteClick}, cardSelector) {
        this._id = data._id;
        this._link = data.link;
        this._name = data.name;
        this._likes = data.likes;
        this._cardSelector = cardSelector;
        this.handleCardClick = handleCardClick;
        this.handleLikeClick = handleLikeClick;
        this.handleDeleteClick = handleDeleteClick;
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
        this._card.querySelector('.element__title').textContent = this._name;
        this._card.querySelector('.element__likes-count').textContent = this._likes.length;
        this._cardImage = this._card.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._card.querySelector('.element__like').addEventListener('click', () => this.handleLikeClick(this._id));
        this._card.querySelector('.element__trash').addEventListener('click', () => this.handleDeleteClick(this._id));
        this._card.querySelector('.element__image').addEventListener('click', () => this.handleCardClick());
        this._card.querySelector('.element__likes-count').textContent = this._likes.length;
        return this._card;
      }
}



class Card {
    constructor({data, handleCardClick}, cardSelector, api) {
        this._id = data._id,
        this._link = data.link,
        this._name = data.name,
        this._likes = data.likes,
        this.cardSelector = cardSelector,
        this.handleCardClick = handleCardClick,
        this._api = api
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
        if (this._eventTarget.classList.contains('element__like_active')) {
            this._api.deleteLike(this._id)
                .then((res) => {
                    this._card.querySelector('.element__likes-count').textContent = res.likes.length;
                    this._eventTarget.classList.remove('element__like_active');
                })
            
        }
        else {
            this._api.addLike(this._id)
                .then((res) => {
                    this._card.querySelector('.element__likes-count').textContent = res.likes.length;
                    this._eventTarget.classList.add('element__like_active');
                })
            
        }        
    }

    _trash() {
        this._card.remove();
        this._card = null;
    }

    generateCard() {        
        this._card = this._getTemplate();
        this._card.querySelector('.element__title').textContent = this._name;
        this._card.querySelector('.element__likes-count').textContent = this._likes.length;
        this._cardImage = this._card.querySelector('.element__image');
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._card.querySelector('.element__like').addEventListener('click', (evt) => this._like(evt));
        this._card.querySelector('.element__trash').addEventListener('click', (evt) => this._trash(evt));
        this._card.querySelector('.element__image').addEventListener('click', () => this.handleCardClick());
        this._api.getUser()
            .then((res) => {
                this._likes.map(item => {
                    if (item._id == res._id){
                        this._card.querySelector('.element__like').classList.add('element__like_active');
                    }
                })
            })
        return this._card;
      }
}

export {Card};