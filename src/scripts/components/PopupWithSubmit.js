import Popup from "./Popup.js"

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    setEventListeners() {
        super.setEventListeners();
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleActionSubmit();
            this.close();
        });
    }

    setSubmitAction(action) {
        this._handleActionSubmit = action;
    }
}