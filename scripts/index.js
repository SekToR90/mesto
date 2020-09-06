import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js'
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import PopupWithForm from './PopupWithForm.js';

const openModalButton = document.querySelector('.profile__edit-button'); //Кнопка редактирования профиля
const openModalCard = document.querySelector('.profile__add-button'); //Кнопка для добавления карточек 

const addCard = document.querySelector('.modal_add-card');              // Модалка с добавлениями карточек
const editProfile = document.querySelector('.modal_edit-profile');      //Модалка редактирования профиля

const form = editProfile.querySelector('.modal__field'); //Поля формы редактирования профиля
const addForm = addCard.querySelector('.modal__field'); //Поля формы с добавлениями карточек

const inputName = form.querySelector('.modal__input_name'); //Поле редактирования Имени  
const inputAboutMe = form.querySelector('.modal__input_about-me'); //Поле редактирования Обо мне

const inputPlase = addForm.querySelector('.modal__input_plase'); //Поле редактирования Названия места  
const inputLinc = addForm.querySelector('.modal__input_link'); //Поле редактирования Ссылки на картинку


const profileTitle = document.querySelector('.profile__title'); // Поле "Имя"
const profileSubtitle = document.querySelector('.profile__subtitle'); //Поле "Обо мне"

const elements = document.querySelector('.elements'); //Находим секцию с элементами в которой находятся все карточки


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
editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
 
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const popupImage = new PopupWithImage ('.modal_image-card');

//Создание карточек
const handleCardClick = (name, link) => {
    popupImage.open(name, link);
  }

const cardsList = new Section ({
    items: initialCards,
    renderer: (cardItem) => {
        const card = new Card(cardItem, handleCardClick, '.elements-card');
        cardsList.addItem(card.generateCard());
    }
}, elements
);

cardsList.renderItems();
//

const userInfo = new UserInfo (profileTitle, profileSubtitle); 

//Открытие/закрытие модалки редактирование профиля  
openModalButton.addEventListener('click', () =>{
    modalButton.open();
    userInfo.getUserInfo(inputName, inputAboutMe);
});

const modalButton = new PopupWithForm ({
    popupSelector: '.modal_edit-profile', 
    callbeckSubmitForm: () => {
        userInfo.setUserInfo(inputName, inputAboutMe);
        modalButton.close();
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
    callbeckSubmitForm: () => {
        cardsList.renderer({name: inputPlase.value, link: inputLinc.value});
        modalCard.close();
    }
});

modalCard.setEventListeners();