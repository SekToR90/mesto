import {imageCard, closeModalEscape, toggleModal} from './utils.js';

export default class Card  {
    constructor (name, link) {
        this._name = name;
        this._link = link; 
    }

    _elementCard () {
        this._element = document.querySelector('.elements-card').content.querySelector('.element'); //Находим Карточку внутри контейнера template     
        this._cardElement = this._element.cloneNode(true);
        return this._cardElement;
    }

    generateCard () {
        this._element =this._elementCard (); 
        this._elementImage = this._element.querySelector('.element__img');
        this._elementTitle = this._element.querySelector('.element__title');
        

        this._elementTitle.textContent = this._name; //Заполнение карточки содержимым
        this._elementImage. src = this._link;  
        this._elementImage. alt = this._name;

        this._eventListener ();
        return this._element;

    } 

    //Удаляет карточку
    _hendleDeleteCard () {
        this._element.remove();
    }
    
    //Изменяет активный/не активный лайк
    _hendleLikeClick () {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    //Заполнение окна увеличения картинки
    _hendleImageClick () {          
        this._modalImageOpen = imageCard.querySelector('.modal__image-open'); //Картинка увеличенная
        this._modalTitltOpen = imageCard.querySelector('.modal__title-open'); //Текст для увеличенной картинки

        this._modalTitltOpen.textContent = this._name;
        this._modalImageOpen. src = this._link;
        this._modalImageOpen. alt = this._name;
    }

    //Слушатели событий
    _eventListener () {
        this._element.querySelector('.element__delete').addEventListener ('click', () =>{  //Удаление эл-та Grid контейнера
            this._hendleDeleteCard ();
        });

        this._element.querySelector('.element__like').addEventListener ('click', () => {  //При клике на кнопку лайка вызывает функцию hendleLikeClick (добавляет/удаляет класс активного лайка)
            this._hendleLikeClick ()
        }); 

        this._elementImage.addEventListener ('click', () =>{ //При клике на картинку, открывает модалку просмотра картинки и заполняет ее содержимым
            toggleModal(imageCard);
            this._hendleImageClick ();
        });
    }   
}