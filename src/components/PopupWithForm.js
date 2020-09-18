import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor ({popupSelector, callbackSubmitForm}) {
        super(popupSelector);
        this._callbackSubmitForm = callbackSubmitForm;
        this._form = this._popupSelector.querySelector('form');
        this._buttonSave = this._popupSelector.querySelector('.modal__button-save');
    }

    _getInputValues() {
        const form = Array.from(this._popupSelector.querySelectorAll('.modal__input'))
        const formValues = {};
        form.forEach(input => formValues[input.name] = input.value);

        return formValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._popupSelector.querySelector('.modal__field')
        .addEventListener('submit', () => {
            this._callbackSubmitForm(this._getInputValues());
        });
    }

    setTextSave() {
        this._buttonSave.textContent = 'Сохранение...';
    }

    setTextDefault() {
        this._buttonSave.textContent = 'Сохранить';
    }

    close() {
        super.close();
        this._form.reset()
    }
}