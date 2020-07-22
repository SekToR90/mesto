const openModalButton = document.querySelector('.profile__edit-button'); //Кнопка редактирования профиля
const openModalCard = document.querySelector('.profile__add-button'); //Кнопка для добавления карточек 

const addCard = document.querySelector('.modal_add-card');              // Модалка с добавлениями карточек
const editProfile = document.querySelector('.modal_edit-profile');      //Модалка редактирования профиля

const addCardCloseModalButton = addCard.querySelector('.modal__close-button'); //Кнопак закрытия модалки с добавлениями карточек
const editProfileCloseModalButton = editProfile.querySelector('.modal__close-button'); //Кнопак закрытия модалки редактирования профиля

const form = editProfile.querySelector('.modal__field'); //Поля формы редактирования профиля
const addForm = addCard.querySelector('.modal__field'); //Поля формы с добавлениями карточек

let inputName = form.querySelector('.modal__input_name'); //Поле редактирования Имени  
let inputAboutMe = form.querySelector('.modal__input_about-me'); //Поле редактирования Обо мне
let inputPlase = addForm.querySelector('.modal__input_plase'); //Поле редактирования Названия места  
let inputLinc = addForm.querySelector('.modal__input_link'); //Поле редактирования Ссылки на картинку

let profileTitle = document.querySelector('.profile__title'); // Поле "Имя"
let profileSubtitle = document.querySelector('.profile__subtitle'); //Поле "Обо мне"

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



function toggleModal(modal) {
    modal.classList.toggle('modal_open');

    if(modal.classList.contains('modal_open')) {
        inputName.value =  profileTitle.textContent;
        inputAboutMe.value = profileSubtitle.textContent;
    }
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

function createCards(data) {
    const cardElement = element.cloneNode(true);

    const elementImage = cardElement.querySelector('.element__img');
    const elementTitle = cardElement.querySelector('.element__title');
    const elementLike = cardElement.querySelector('.element__title');
    const elementDelete = cardElement.querySelector('.element__delete');
    
   elementLike.addEventListener ('click', () =>{
    //hendleLikeClic
   })

   elementDelete.addEventListener ('click', () =>{
    //hendleDeleteClic
    })

    elementImage.addEventListener ('click', () =>{
    //hendleImageClic
    })

   elementTitle.textContent = data.name;
   elementImage. src = data.link;
   elementImage. alt = data.name;

   return cardElement;
}

function renderCards(data) {
  
    elements.prepend(createCards(data));
 }


 initialCards.forEach((data) =>{

    renderCards(data)

})


openModalButton.addEventListener('click', () =>{
    toggleModal(editProfile);
});
editProfileCloseModalButton.addEventListener('click', () =>{
    toggleModal(editProfile);
});

openModalCard.addEventListener('click', () =>{
    toggleModal(addCard);
});
addCardCloseModalButton.addEventListener('click', () =>{
    toggleModal(addCard);
})

form.addEventListener('submit', formSubmitHandler);
addForm.addEventListener('submit', addCardSubmitHandler);