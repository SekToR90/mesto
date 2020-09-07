import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor ({popupSelector, callbackSubmitForm: callbackSubmitForm}) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._form = this._popupSelector.querySelector('form')
    }

    _getInputValues() {
        const form = Array.from(this._popupSelector.querySelectorAll('.modal__input'))
        const formValues =  form.map(input => input.value);

        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupSelector.querySelector('.modal__field')
        .addEventListener('submit', () => {
            this._callbackSubmitForm(this._getInputValues);
        });
    }

    close() {
        super.close();
        this._form.reset()
    }
}