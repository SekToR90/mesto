const openModalButton = document.querySelector('.profile__edit-button');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal__close-button'); 
const form = modal.querySelector('.modal__field'); 
const inputName = document.querySelector('.form__input_name'); 
const inputAboutMe = document.querySelector('.form__input_about-me'); 
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

function toggleModal() {
    modal.classList.toggle('modal_open');
}


openModalButton.addEventListener('click', () => {
    toggleModal()
    inputName.textContent = profileTitle.value;
    inputAboutMe.textContent = profileSubtitle.value;  
})

closeModalButton.addEventListener('click', toggleModal)

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputAboutMe.value;
})
