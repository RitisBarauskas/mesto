export default class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getDataCard() {
        return fetch(this._url, {
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
}