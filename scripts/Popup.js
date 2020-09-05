export default class Popup {
    constructor (popupSelector) {
        this._popupSelector = document.querySelector(popupSelector);
    }

    //открытие попапа
    open() {
        this._popupSelector.classList.add('modal_open');
        document.addEventListener('keydown', this._handleEscClose());
        this._popupSelector.addEventListener('mousedown', this._handleClickClose());
    }

    //закрытие попапа
    close () {
        this._popupSelector.classList.remove('modal_open');
        document.removeEventListener('keydown', this._handleEscClose());
        document.removeEventListener('mousedown', this._handleClickClose());
    }

    //Логика закрытия попапа клавишей Esc.
    _handleEscClose() {
        this._escClose = (evt) => {
            if (evt.key === "Escape") {
                this.close();
             };
        }  
        return this._escClose;
    }

    //добавляет слушатель клика иконке закрытия попапа.
    setEventListeners() {
        this._popupSelector.querySelector('.modal__close-button').addEventListener('click', () =>{
            this.close ();
        });
    }

    //Логика закрытия попапа по клику мыши.
    _handleClickClose() {
        this._clickClose = (evt) => {
            if (evt.target.classList.contains('modal')) {
                this.close ();
            }
        };
        return this._clickClose;
    }
}