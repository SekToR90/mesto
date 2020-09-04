import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
      }

    open (name, link) {
        this._modalImageOpen = this._popupSelector.querySelector('.modal__image-open'); //Картинка увеличенная
        this._modalTitltOpen = this._popupSelector.querySelector('.modal__title-open'); //Текст для увеличенной картинки

        this._modalTitltOpen.textContent = name;
        this._modalImageOpen. src = link;
        this._modalImageOpen. alt = name;

        super.open();
    }
}