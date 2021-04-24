export default class UserInfo {
    constructor(title, subtitle) {
        this._title = document.querySelector(title);
        this._subtitle = document.querySelector(subtitle); 
    }

    getUserInfo() {
        this._userInfo = {};
        this._userInfo.title = this._title.textContent;
        this._userInfo.subtitle = this._subtitle.textContent;
        return this._userInfo;
    }

    setUserInfo(inputTitle, inputSubtitle) {
        this._title.textContent = inputTitle;
        this._subtitle.textContent = inputSubtitle;
    }
}