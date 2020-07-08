const openModalButton = document.querySelector('.profile__edit-button');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal__close-button'); 
const form = modal.querySelector('.modal__field'); 
let inputName = document.querySelector('.modal__input_name'); 
let inputAboutMe = document.querySelector('.modal__input_about-me'); 
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
 

function toggleModal() {
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
    toggleModal() 
}

openModalButton.addEventListener('click', toggleModal);
closeModalButton.addEventListener('click', toggleModal)

form.addEventListener('submit', formSubmitHandler);
