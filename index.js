const openModalButton = document.querySelector('.profile__edit-button');
const modal = document.querySelector('.modal');
const closeModalButton = document.querySelector('.modal__close-button'); 

function toggleModal() {
    modal.classList.toggle('modal_open');
}


openModalButton.addEventListener('click', toggleModal)

closeModalButton.addEventListener('click', toggleModal)