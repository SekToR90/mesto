import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, ) {
        super(popupSelector);
        this._form = this._popupSelector.querySelector('form')
    }

    setSubmit(callbackSubmitForm) {
        this._callbackSubmitForm = callbackSubmitForm;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._callbackSubmitForm();
        });
    }

}