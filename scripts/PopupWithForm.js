import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor ({popupSelector, callbeckSubmitForm}) {
        super(popupSelector);
        this._callbeckSubmitForm = callbeckSubmitForm;
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
            this._callbeckSubmitForm(this._getInputValues);
        });
    }

    close() {
        super.close();
        this._popupSelector.querySelector('form').reset()
    }
}