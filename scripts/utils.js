const imageCard = document.querySelector('.modal_image-card');      //Модалка просмотра картинки

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


export {imageCard, closeModalEscape, toggleModal};