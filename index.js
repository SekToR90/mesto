const openModalButton = document.querySelector('.profile__edit-button');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal__close-button'); 
const form = modal.querySelector('.modal__field'); 
let inputName = document.querySelector('.form__input_name'); 
let inputAboutMe = document.querySelector('.form__input_about-me'); 
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
 

function toggleModal() {
    modal.classList.toggle('modal_open');
}


openModalButton.addEventListener('click', () => {
    toggleModal()
    inputName.value =  profileTitle.textContent;
    inputAboutMe.value = profileSubtitle.textContent;  
})

closeModalButton.addEventListener('click', toggleModal)

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    profileTitle.textContent = inputName.value;
    profileSubtitle.textContent = inputAboutMe.value;
})
