export default class FormValidator {
    constructor (settings, formElement) {
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;

        this._formElement = formElement;
    }

    _showInputError (inputElement, errorMessage) {
        this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.add(this._inputErrorClass);
        this._errorElement.textContent = errorMessage;
        this._errorElement.classList.add(this._errorClass);
      };

    _hideInputError (inputElement) {
        this._errorElement = this._formElement.querySelector(`#${inputElement.name}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        this._errorElement.classList.remove(this._errorClass);
        this._errorElement.textContent = '';
      };

    _isValid(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError (inputElement, inputElement.validationMessage);
          } else {
            this._hideInputError (inputElement);
        }
    };
    
    _setEventListener() {
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    
        this._toggleButtonState();  
        this._inputList.forEach((inputElement) => { 
            inputElement.addEventListener('input', () => {
                this._isValid(inputElement);
                this._toggleButtonState();  
            }); 
        });
    };

    enableValidation() {  //Обработчик всех форм
        this._forms = Array.from(document.querySelectorAll(this._formSelector)); //Находим все формы в документе
            this._forms.forEach((inputElement) => { 
                inputElement.addEventListener('submit', (evt) => {
                    evt.preventDefault();
                });
                this._setEventListener();
    
                inputElement.addEventListener('reset', () => {
                this._addButtonDisabled();
                }); 
            });
    };

    //Скрываем ошибки в импутах
    resetInputErrors() {
        this._inputList.forEach(item => {
            this._hideInputError(item);
        });
    }

    //Функции для Button
    _hasInvalidInput () {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };
  

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._addButtonDisabled()
        } else {
            this.removeButtonDisabled()
        }
    };


    _addButtonDisabled() {
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._buttonElement.classList.add(this._inactiveButtonClass);
        this._buttonElement.disabled = true;
    };

    removeButtonDisabled() {
        this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
        this._buttonElement.classList.remove(this._inactiveButtonClass);
        this._buttonElement.disabled = false;
    };
}
