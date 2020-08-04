enableValidation({
    formSelector: '.modal__field', // Класс самой формы
    inputSelector: '.modal__input', // класс всех input
    submitButtonSelector: '.modal__button-save', //класс активной нопки
    inactiveButtonClass: 'modal__button-save_disabled', //класс не активной кнопки
    inputErrorClass: 'modal__input_type_error', //Исправить класс (при ошибке border-button: red)
    errorClass: 'modal__error_visible' //Исправить класс
  });

  function showInputError (formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorClass);
  };
  
  function hideInputError (formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
  };

  function isValid(formElement, inputElement, settings) {
    if (!inputElement.validity.valid) {
        showInputError (formElement, inputElement, inputElement.validationMessage, settings);
      } else {
        hideInputError (formElement, inputElement, settings);
    }
};
 
function setEventListener(formElement, settings) {
    const inputs = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputs.forEach((inputElement) => { 
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, settings);
        }); 
    });
};

  function enableValidation(settings){  //Обработчик всех форм
    const forms = Array.from(document.querySelectorAll(settings.formSelector)); //Находим все формы в документе
        forms.forEach((formElement) => { 
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
                //Дописать
            setEventListener(formElement, settings);
        });
  };


