export default class UserInfo {
    constructor(title, subtitle, avaLink) {
        this._title = document.querySelector(title);
        this._subtitle = document.querySelector(subtitle);
        this._avaLink = document.querySelector(avaLink);
    }

    getUserInfo() {
        this._userInfo = {};
        this._userInfo.title = this._title.textContent;
        this._userInfo.subtitle = this._subtitle.textContent;
        this._userInfo.urlAvatar = this._avaLink.style.backgroundImage;
        return this._userInfo;
    }

    setUserInfo(inputTitle, inputSubtitle, avaLink) {
        this._title.textContent = inputTitle;
        this._subtitle.textContent = inputSubtitle;
        this._avaLink.style.backgroundImage = `url(${avaLink})`;
    }
}