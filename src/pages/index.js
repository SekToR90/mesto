import FormValidator from '../components/FormValidator.js';
import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js'
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api';
import PopupWithSubmit from '../components/PopupWithSubmit'

const openModalButton = document.querySelector('.profile__edit-button'); //Кнопка редактирования профиля
const openModalCard = document.querySelector('.profile__add-button'); //Кнопка для добавления карточек
const openModalAvatar = document.querySelector('.profile__edit-avatar'); //Кнопка для открытия модалки редактирования аватара

const addCard = document.querySelector('.modal_add-card');              // Модалка с добавлениями карточек
const editProfile = document.querySelector('.modal_edit-profile');      //Модалка редактирования профиля
const userAvatar = document.querySelector('.modal_edit-avatar');        //Модалка редактирования аватара

const form = editProfile.querySelector('.modal__field'); //Поля формы редактирования профиля
const addForm = addCard.querySelector('.modal__field'); //Поля формы с добавлениями карточек

const inputName = form.querySelector('.modal__input_name'); //Поле редактирования Имени  
const inputAboutMe = form.querySelector('.modal__input_about-me'); //Поле редактирования Обо мне

const inputPlase = addForm.querySelector('.modal__input_plase'); //Поле редактирования Названия места  
const inputLinc = addForm.querySelector('.modal__input_link'); //Поле редактирования Ссылки на картинку


const profileTitle = document.querySelector('.profile__title'); // Поле "Имя"
const profileSubtitle = document.querySelector('.profile__subtitle'); //Поле "Обо мне"
const profileAvatar = document.querySelector('.profile__avatar'); //Картинка аватара

const elements = document.querySelector('.elements'); //Находим секцию с элементами в которой находятся все карточки

//Валидация
const enableValidation = {
    formSelector: '.modal__field', // Класс самой формы
    inputSelector: '.modal__input', // класс всех input
    submitButtonSelector: '.modal__button-save', //класс активной нопки
    inactiveButtonClass: 'modal__button-save_disabled', //класс не активной кнопки
    inputErrorClass: 'modal__input_type_error',  
    errorClass: 'modal__error_visible'
  };

const editFormValidator = new FormValidator(enableValidation, editProfile);
const addCardFormValidator = new FormValidator(enableValidation, addCard);
const userAvatarFormValidator = new FormValidator(enableValidation, userAvatar);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
userAvatarFormValidator.enableValidation();
//

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-15',
    headers: {
        authorization: '179efea0-82b8-4273-a721-e2de6a729aed',
        'Content-type': 'application/json'
}
});

const popupImage = new PopupWithImage ('.modal_image-card');

//Создание карточек
const handleCardClick = (name, link) => {
    popupImage.open(name, link);
  }

const cardsList = new Section ({
    renderer: (cardItem) => {
        const card = new Card(cardItem, handleCardClick, handleCardLike, cardDelete, '.elements-card');

        const userId = userInfo.getUserId();
        cardsList.addItem(card.generateCard(userId));
    }
}, elements
);

api.getAllCards()
    .then ((data) => {
        cardsList.renderItems(data);
    })
    .catch((err) => {
        console.log(err);
    });
//

//Лайк карточки
const handleCardLike = function () {
    this.handleLikeClick ();
    if(this.activeLike()) {
        api.putLikeCards(this.cardId)
            .then((data) => {
                this.updateData(data)
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        api.deleteLikeCards(this.cardId)
            .then((data) => {
                this.updateData(data)
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
//

//Удаление карточки
const deleteForm = new PopupWithSubmit('.modal_delete-card');

 const cardDelete = function() {
    deleteForm.open();
    deleteForm.setSubmit(() => {
        api.deleteCards(this.cardId)
            .then((data) => {
                this._cardElement.remove(data);
                this._cardElement = null;
                deleteForm.close();
            })
            .catch((err) => {
                console.log(err);
            });
    })
}

deleteForm.setEventListeners();
//

//данные пользователя
const userInfo = new UserInfo ({
    name: profileTitle,
    about:  profileSubtitle,
    avatar: profileAvatar
    });

api.getUserMe()
    .then ((data) => {
        userInfo.setUserInfo(data);
    })
    .catch((err) => {
        console.log(err);
    });
//

//Изменение аватара
openModalAvatar.addEventListener('click', () =>{
    modalAvatar.open();
});

const modalAvatar = new PopupWithForm({
    popupSelector: '.modal_edit-avatar',
    callbackSubmitForm: (value) => {
        modalAvatar. setTextSave();
        api.patchUsersAvatar(value)
            .then((data) => {
                userInfo.setUserInfo(data);
                modalAvatar.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(()=> {
                modalAvatar.setTextDefault();
            })
    }
})

modalAvatar.setEventListeners();
//

//Открытие/закрытие модалки редактирование профиля
openModalButton.addEventListener('click', () =>{
    modalButton.open();

    inputName.value = userInfo.getUserInfo().name;
    inputAboutMe.value = userInfo.getUserInfo().info;
});

const modalButton = new PopupWithForm ({
    popupSelector: '.modal_edit-profile',
    callbackSubmitForm: (value) => {
        modalButton. setTextSave();
        api.patchUsersMe(value)
            .then((data) => {
                userInfo.setUserInfo(data);
                modalButton.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(()=> {
                modalButton.setTextDefault();
            })
    }
});

modalButton.setEventListeners();
//

//Открытие/закрытие модалки добавления новой карточки 
openModalCard.addEventListener('click', () =>{
    modalCard.open();
});

const modalCard = new PopupWithForm ({
    popupSelector: '.modal_add-card', 
    callbackSubmitForm: (value) => {
        modalCard. setTextSave();
        api.postAddCard(value)
            .then((data) => {
                cardsList.renderer(data);
                modalCard.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(()=> {
                modalCard.setTextDefault();
            })
    }
});


modalCard.setEventListeners();

popupImage.setEventListeners();