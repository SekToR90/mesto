export default class Card  {
    constructor ( data, handleCardClick, cardSelector) {
        this._name = data.name;
        this._link = data.link; 
        this._handleCardClick = handleCardClick;
        this._cardSelector = cardSelector;
    }

    _elementCard () {
        this._element = document.querySelector(this._cardSelector).content.querySelector('.element'); //Находим Карточку внутри контейнера template     
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

    //Слушатели событий
    _eventListener () {
        this._element.querySelector('.element__delete').addEventListener ('click', () =>{  //Удаление эл-та Grid контейнера
            this._hendleDeleteCard ();
        });

        this._element.querySelector('.element__like').addEventListener ('click', () => {  //При клике на кнопку лайка вызывает функцию hendleLikeClick (добавляет/удаляет класс активного лайка)
            this._hendleLikeClick ()
        }); 

        this._elementImage.addEventListener ('click', () =>{ //При клике на картинку, открывает модалку просмотра картинки и заполняет ее содержимым     
            this._handleCardClick (this._name, this._link);
        });
    }   
}