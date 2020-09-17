import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
    constructor(popupSelector, ) {
        super(popupSelector);

    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.querySelector('.modal__field')
        .addEventListener('submit', (evt) => {
            evt.preventDefault();

        });
    }

    close() {
        super.close();
    }
}