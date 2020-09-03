import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js'
//import {imageCard, closeModalEscape, toggleModal} from './utils.js';

const modalList = Array.from(document.querySelectorAll('.modal')); //Поиск всех модалок

const openModalButton = document.querySelector('.profile__edit-button'); //Кнопка редактирования профиля
const openModalCard = document.querySelector('.profile__add-button'); //Кнопка для добавления карточек 

const addCard = document.querySelector('.modal_add-card');              // Модалка с добавлениями карточек
const editProfile = document.querySelector('.modal_edit-profile');      //Модалка редактирования профиля

const imageCard = document.querySelector('.modal_image-card');      //Модалка просмотра картинки

//const addCardCloseModalButton = addCard.querySelector('.modal__close-button'); //Кнопак закрытия модалки с добавлениями карточек
//const editProfileCloseModalButton = editProfile.querySelector('.modal__close-button'); //Кнопак закрытия модалки редактирования профиля
//const closeModalButtonImage = imageCard.querySelector('.modal__close-button'); //Кнопак закрытия модалки просмотра карточки

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


//Функция при открытии модального окна "Редактировать профиль" присваевает текущее значение "имя" и "обо мне"
function toggleProfileModal(modal) {
    toggleModal(modal);

    if(modal.classList.contains('modal_open')) {
        inputName.value =  profileTitle.textContent;
        inputAboutMe.value = profileSubtitle.textContent;
    }
}

//Функция очистки содержимого форм
//function resetInputValue(data) { 
//    data.querySelector('form').reset()
//  }
  
//Функция присваевает значение полей input полям "имя" и "обо мне", вызывает функцию для закрытия модального окна 
function formSubmitHandler (evt) {
    evt.preventDefault();

    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputAboutMe.value;
    toggleModal(editProfile); 
}

//Функция создает новую карточку 
function addCardSubmitHandler (evt) {
    evt.preventDefault();
    const card = new Card(inputPlase.value, inputLinc.value);

    elements.prepend(card.generateCard());
    toggleModal(addCard);
}

const cardsList = new Section ({
    items: initialCards,
    renderer: (cardItem) => {
        const card = new Card(cardItem.name, cardItem.link);
        cardsList.addItem(card.generateCard());
    }
}, elements
);

cardsList.renderItems();

 //initialCards.forEach((data) =>{
 //   const card = new Card(data.name, data.link);
 //
 //    elements.prepend(card.generateCard());

//})

//Заркытие модалки по клику мыши на экран модалки
function closeClickModal(evt, modal) {
    if (evt.target.classList.contains('modal')) {
        modal.classList.remove('modal_open');
    }
  } 

  modalList.forEach((modalElement) => {
    modalElement.addEventListener('mousedown', (evt) => {
        closeClickModal(evt, modalElement);
    });
  });


//Открытие/закрытие модалки редактирование профиля  
openModalButton.addEventListener('click', () =>{
    toggleProfileModal(editProfile);
});
//editProfileCloseModalButton.addEventListener('click', () =>{
//    toggleProfileModal(editProfile);
//});

//Открытие/закрытие модалки добавления новой карточки 
openModalCard.addEventListener('click', () =>{
    toggleModal(addCard);
    resetInputValue(addCard); 
});
//addCardCloseModalButton.addEventListener('click', () =>{
//    toggleModal(addCard);
//})

//Закрытие модалки просмотра карточки
//closeModalButtonImage.addEventListener('click', () =>{
//    toggleModal(imageCard);
//});


//Работа кнопки "сохранить"
//form.addEventListener('submit', formSubmitHandler);
//addForm.addEventListener('submit', addCardSubmitHandler);