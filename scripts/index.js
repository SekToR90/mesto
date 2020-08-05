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

function removeModal(modal) {
    modal.classList.remove('modal_open');
}

function toggleModal(modal) {
    modal.classList.toggle('modal_open');

}

function toggleProfileModal(modal) {
    toggleModal(modal);

    if(modal.classList.contains('modal_open')) {
        inputName.value =  profileTitle.textContent;
        inputAboutMe.value = profileSubtitle.textContent;
    }
}

function resetInputValue(data) { //Функция очистки содержимого форм
    data.querySelector('form').reset()
  }
  

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputAboutMe.value;
    toggleModal(editProfile); 
}

function addCardSubmitHandler (evt) {
    evt.preventDefault();

    renderCards ({name: inputPlase.value, link: inputLinc.value})
    
    toggleModal(addCard);
}


function hendleLikeClick (evt) {
    evt.target.classList.toggle('element__like_active');
}

function hendleImageClick (data) {  //Заполнение окна увеличения картинки
    modalTitltOpen.textContent = data.name;
    modalImageOpen. src = data.link;
    modalImageOpen. alt = data.name;
}

function createCard(data) {
    const cardElement = element.cloneNode(true);

    const elementImage = cardElement.querySelector('.element__img');
    const elementTitle = cardElement.querySelector('.element__title');
    const elementLike = cardElement.querySelector('.element__like');
    const elementDelete = cardElement.querySelector('.element__delete');
    
   elementLike.addEventListener ('click', hendleLikeClick);

   elementDelete.addEventListener ('click', (evt) =>{  //Удаление эл-та Grid контейнера
    evt.target;
    const deleteElement = elementDelete.closest('.element');
    deleteElement.remove();
   })

    elementImage.addEventListener ('click', () =>{
    toggleModal(imageCard);
    hendleImageClick (data);
    })

   elementTitle.textContent = data.name;
   elementImage. src = data.link;
   elementImage. alt = data.name;

   return cardElement;
}

function renderCards(data) {
  
    elements.prepend(createCard(data));
 }


 initialCards.forEach((data) =>{

    renderCards(data)

})

function closeClickModal(event, modal) {
    if (event.target.classList.contains('modal')) {
      toggleModal(modal);
    }
  } 

  modalList.forEach((modalElement) => {
    modalElement.addEventListener('mousedown', () => {
        closeClickModal(event, modalElement);
    });
  });


  
openModalButton.addEventListener('click', () =>{
    toggleProfileModal(editProfile);
});
editProfileCloseModalButton.addEventListener('click', () =>{
    toggleProfileModal(editProfile);
});
document.addEventListener('keydown', (evt) => {
    if(evt.key === "Escape") {
        removeModal(editProfile);
    };
});

openModalCard.addEventListener('click', () =>{
    toggleModal(addCard);
    resetInputValue(addCard);
});
addCardCloseModalButton.addEventListener('click', () =>{
    toggleModal(addCard);
})
document.addEventListener('keydown', (evt) => {
    if(evt.key === "Escape") {
        removeModal(addCard);
    };
});


closeModalButtonImage.addEventListener('click', () =>{
    toggleModal(imageCard);
});
document.addEventListener('keydown', (evt) => {
    if(evt.key === "Escape") {
        removeModal(imageCard);
    };
});


form.addEventListener('submit', formSubmitHandler);
addForm.addEventListener('submit', addCardSubmitHandler);
   