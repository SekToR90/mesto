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

    toggleButtonState(inputList, settings, formElement);
    inputList.forEach((inputElement) => { 
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, settings);
            toggleButtonState(inputList, settings, formElement);
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

            formElement.addEventListener('reset', function(){
              addButtonDisabled(formElement, settings);
            }); 
        });
  };


//Функции для Button
  function hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };
  

  function toggleButtonState(inputList, settings, formElement) {
    if (hasInvalidInput(inputList)) {
      addButtonDisabled(formElement, settings)
    } else {
      removeButtonDisabled(formElement, settings)
    }
  };


  function addButtonDisabled(formElement, settings) {
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
        buttonElement.classList.add(settings.inactiveButtonClass);
        buttonElement.disabled = true;
  };

  function removeButtonDisabled(formElement, settings) {
    const buttonElement = formElement.querySelector(settings.submitButtonSelector);
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.disabled = false;
  };