export default class Popup {
    constructor (popupSelector) {
        this._popupSelector = popupSelector;
    }

    //открытие попапа
    open() {
        this._popupSelector.classList.add('modal_open');
        document.addEventListener('keydown', _handleEscClose());
    }

    //закрытие попапа
    close () {
        this._popupSelector.classList.remove('modal_open');
        document.removeEventListener('keydown', _handleEscClose());
    }

    //Логика закрытия попапа клавишей Esc.
    _handleEscClose() {
        if (evt.key === "Escape") {
           this.close();
        };
    }

    //добавляет слушатель клика иконке закрытия попапа.
    setEventListeners() {
        this._popupSelector.querySelector('.modal__close-button').addEventListener('click', () =>{
            this.close ();
        });
    }
}