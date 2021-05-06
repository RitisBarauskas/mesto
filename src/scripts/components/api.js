export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getDataCard() {
        return fetch(this._url+`cards`, {
            headers: this._headers
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject('Ошибка произошла, понимаешь')
        })
        .catch((err) => console.log(err));
    }

    addCard(data) {
        return fetch(this._url+`cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject('Карточку добавить не получилось')
        })
        .catch((err) => console.log(err));
    }

    addLike(id) {
        return fetch(this._url+`cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject('Лайк поставить не удалось')
        })
        .catch((err) => console.log(err));
    }

    deleteLike(id) {
        return fetch(this._url+`cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject('Лайк удалить не удалось')
        })
        .catch((err) => console.log(err));
    }

    getUser() {
        return fetch(this._url+`users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then((res) => {
            if (res.ok){
                return res.json();
            }
            return Promise.reject('Получить ID пользователя не удалось')
        })
        .catch((err) => console.log(err));
    }
}