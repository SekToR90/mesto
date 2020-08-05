enableValidation({
    formSelector: '.modal__field', // Класс самой формы
    inputSelector: '.modal__input', // класс всех input
    submitButtonSelector: '.modal__button-save', //класс активной нопки
    inactiveButtonClass: 'modal__button-save_disabled', //класс не активной кнопки
    inputErrorClass: 'modal__input_type_error',  
    errorClass: 'modal__error_visible'
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
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass)
    inputList.forEach((inputElement) => { 
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, settings);
            toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass)
        }); 
    });
};

  function enableValidation(settings){  //Обработчик всех форм
    const forms = Array.from(document.querySelectorAll(settings.formSelector)); //Находим все формы в документе
        forms.forEach((formElement) => { 
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            setEventListener(formElement, settings);
        });
  };


//Функции для Button
  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  

  function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
  };