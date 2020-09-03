import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(data) {
        this._data = data;
      }

    open () {
        this._modalImageOpen = this._popupSelector.querySelector('.modal__image-open'); //Картинка увеличенная
        this._modalTitltOpen = this._popupSelector.querySelector('.modal__title-open'); //Текст для увеличенной картинки

        this._modalTitltOpen.textContent = this._data.name;
        this._modalImageOpen. src = this._data.link;
        this._modalImageOpen. alt = this._data.name;

        super.open();
    }
}