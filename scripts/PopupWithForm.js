import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor (popupSelector, callbeckSubmitForm) {
        super(popupSelector);
        this._callbeckSubmitForm = callbeckSubmitForm;
    }

    _getInputValues() {
        const form = Array.from(this._popupSelector.querySelectorAll('.modal__input'))
        const formValues =  inputList.map(input => input.value);

        return this._formValues;
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