import FormValidator from './FormValidator.js';
import Card from './Card.js';

const modalList = Array.from(document.querySelectorAll('.modal')); //Поиск всех модалок

const openModalButton = document.querySelector('.profile__edit-button'); //Кнопка редактирования профиля
const openModalCard = document.querySelector('.profile__add-button'); //Кнопка для добавления карточек 

const addCard = document.querySelector('.modal_add-card');              // Модалка с добавлениями карточек
const editProfile = document.querySelector('.modal_edit-profile');      //Модалка редактирования профиля
const imageCard = document.querySelector('.modal_image-card');      //Модалка просмотра картинки


const addCardCloseModalButton = addCard.querySelector('.modal__close-button'); //Кнопак закрытия модалки с добавлениями карточек
const editProfileCloseModalButton = editProfile.querySelector('.modal__close-button'); //Кнопак закрытия модалки редактирования профиля
const closeModalButtonImage = imageCard.querySelector('.modal__close-button'); //Кнопак закрытия модалки просмотра карточки

const form = editProfile.querySelector('.modal__field'); //Поля формы редактирования профиля
const addForm = addCard.querySelector('.modal__field'); //Поля формы с добавлениями карточек

const inputName = form.querySelector('.modal__input_name'); //Поле редактирования Имени  
const inputAboutMe = form.querySelector('.modal__input_about-me'); //Поле редактирования Обо мне
const inputPlase = addForm.querySelector('.modal__input_plase'); //Поле редактирования Названия места  
const inputLinc = addForm.querySelector('.modal__input_link'); //Поле редактирования Ссылки на картинку
const modalImageOpen = imageCard.querySelector('.modal__image-open'); //Картинка увеличенная
const modalTitltOpen = imageCard.querySelector('.modal__title-open'); //Текст для увеличенной картинки

const profileTitle = document.querySelector('.profile__title'); // Поле "Имя"
const profileSubtitle = document.querySelector('.profile__subtitle'); //Поле "Обо мне"

const element = document.querySelector('.elements-card').content.querySelector('.element'); //Находим Карточку внутри контейнера template
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


//Функция закрытие модалок по кнопке Escape
function closeModalEscape (evt) {  
    const modal = document.querySelector('.modal_open');
    if (evt.key === "Escape") {
        toggleModal(modal);
    };
}

//Функция открывает/закрывает модальное окно и проверяет  открыта ли модальное окно (если модалка открыта - добавляет слушатель на кнопук Escape, если нет - удаляет слушатель)
function toggleModal(modal) {
    modal.classList.toggle('modal_open');
    if ( modal.classList.contains('modal_open')) {
        document.addEventListener('keydown', closeModalEscape);
      } else {
        document.removeEventListener('keydown', closeModalEscape);
      }
}

//Функция при открытии модального окна "Редактировать профиль" присваевает текущее значение "имя" и "обо мне"
function toggleProfileModal(modal) {
    toggleModal(modal);

    if(modal.classList.contains('modal_open')) {
        inputName.value =  profileTitle.textContent;
        inputAboutMe.value = profileSubtitle.textContent;
    }
}

//Функция очистки содержимого форм
function resetInputValue(data) { 
    data.querySelector('form').reset()
  }
  
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

    renderCards ({name: inputPlase.value, link: inputLinc.value})
    toggleModal(addCard);
}

//Функция изменяет активный/не активный лайк
function hendleLikeClick (evt) {
    evt.target.classList.toggle('element__like_active');
}

//Заполнение окна увеличения картинки
function hendleImageClick (data) {  
    modalTitltOpen.textContent = data.name;
    modalImageOpen. src = data.link;
    modalImageOpen. alt = data.name;
}

//Функция описывает логику работы с карточками
function createCard(data) {
    const cardElement = element.cloneNode(true);

    const elementImage = cardElement.querySelector('.element__img');
    const elementTitle = cardElement.querySelector('.element__title');
    const elementLike = cardElement.querySelector('.element__like');
    const elementDelete = cardElement.querySelector('.element__delete');
    
   elementLike.addEventListener ('click', hendleLikeClick); //При клике на кнопку лайка вызывает функцию hendleLikeClick (добавляет/удаляет класс активного лайка)

   elementDelete.addEventListener ('click', (evt) =>{  //Удаление эл-та Grid контейнера
    evt.target;
    const deleteElement = elementDelete.closest('.element');
    deleteElement.remove();
   })

    elementImage.addEventListener ('click', () =>{ //При клике на картинку, открывает модалку просмотра картинки и заполняет ее содержимым
    toggleModal(imageCard);
    hendleImageClick (data);
    })

   elementTitle.textContent = data.name; //Заполнение карточки содержимым
   elementImage. src = data.link;  
   elementImage. alt = data.name;

   return cardElement;
}

//Функция расставляет карточки в начало Grid контейнера
function renderCards(data) {
  
    elements.prepend(createCard(data));
 }


 initialCards.forEach((data) =>{

    renderCards(data)

})

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
editProfileCloseModalButton.addEventListener('click', () =>{
    toggleProfileModal(editProfile);
});

//Открытие/закрытие модалки добавления новой карточки 
openModalCard.addEventListener('click', () =>{
    toggleModal(addCard);
    resetInputValue(addCard); 
});
addCardCloseModalButton.addEventListener('click', () =>{
    toggleModal(addCard);
})

//Закрытие модалки просмотра карточки
closeModalButtonImage.addEventListener('click', () =>{
    toggleModal(imageCard);
});


//Работа кнопки "сохранить"
form.addEventListener('submit', formSubmitHandler);
addForm.addEventListener('submit', addCardSubmitHandler);





