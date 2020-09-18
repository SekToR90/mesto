export default class Card  {
    constructor ( data, handleCardClick, handleCardLike, handleDeleteCard, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._like = data.likes;
        this.cardId = data._id;
        this._owner = data.owner._id;
        this._handleCardClick = handleCardClick;
        this._handleCardLike  = handleCardLike;
        this._handleDeleteCard = handleDeleteCard
        this._cardSelector = cardSelector;
    }

    _elementCard () {
        this._elementTemplate = document.querySelector(this._cardSelector).content.querySelector('.element'); //Находим Карточку внутри контейнера template
        this._cardElement = this._elementTemplate.cloneNode(true);
        return this._cardElement;
    }

    generateCard (currentUserId) {
        this._element =this._elementCard ();
        this._elementImage = this._element.querySelector('.element__img');
        this._elementTitle = this._element.querySelector('.element__title');
        this._elementDelete =  this._element.querySelector('.element__delete');

        if(currentUserId !== this._owner) {
            this._elementDelete.classList.add('element__delete_inactive');
        }

        this._like.some(item =>{
            if (item._id === currentUserId) {
                this._element.querySelector('.element__like').classList.add('element__like_active');
            }
        })


        this._elementTitle.textContent = this._name; //Заполнение карточки содержимым
        this._elementImage. src = this._link;
        this._elementImage. alt = this._name;

        this._numberLikes();
        this._eventListener ();
        return this._element;

    }

    //Лайк
    //Изменяет активный/не активный лайк
    handleLikeClick () {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    //Проверяем активный ли лайк
    activeLike() {
        return this._element.querySelector('.element__like').classList.contains('element__like_active');
    }

    _numberLikes() {

        this._element.querySelector('.element__like_title').textContent = this._like.length;
    }

    //Меняем кол-во лайков и данные карточки, которые приходят с сервера
    updateData(data) {
        this._like = data.likes;
        this._numberLikes();
    }
    //

    //Слушатели событий
    _eventListener () {
        this._element.querySelector('.element__delete').addEventListener ('click', () =>{  //Удаление эл-та Grid контейнера
            this._handleDeleteCard (this.cardId);
        });

        this._element.querySelector('.element__like').addEventListener ('click', () => {  //При клике на кнопку лайка вызывает функцию hendleLikeClick (добавляет/удаляет класс активного лайка)
            this._handleCardLike ()
        });

        this._elementImage.addEventListener ('click', () =>{ //При клике на картинку, открывает модалку просмотра картинки и заполняет ее содержимым
            this._handleCardClick (this._name, this._link);
        });
    }
}