export class FormValidator{
   constructor(selectorsValid, formItem){
      this._formSelector = selectorsValid.formSelector;
      this._inputSelector = selectorsValid.inputSelector;
      this._submitButtonSelector = selectorsValid.submitButtonSelector;
      this._inactiveButtonClass = selectorsValid.inactiveButtonClass;
      this._inputErrorClass = selectorsValid.inputErrorClass;
      this._errorClass = selectorsValid.errorClass;
      this._formItem = formItem;
      this._inputList = Array.from(this._formItem.querySelectorAll(this._inputSelector));
      this._formButton = this._formItem.querySelector(this._submitButtonSelector);   
   }

   _showError = (inputError, input) => {
      input.classList.add(this._inputErrorClass);
      inputError.textContent = input.validationMessage;
      inputError.classList.add(this._errorClass);
   }

   _hideError = (inputError, input) => {
      input.classList.remove(this._inputErrorClass);
      inputError.textContent = " ";
      inputError.classList.remove(this._errorClass);
   }

   _checkFormIsValid = () => {
      return !this._inputList.some((input) => {
         return !input.validity.valid;
      })
   }

   _activateSubmitButton = () => {
      this._formButton.classList.remove(this._inactiveButtonClass);
      this._formButton.disabled = false;
   }

   disableSubmitButton = () => {
      this._formButton.classList.add(this._inactiveButtonClass);
      this._formButton.disabled = true;
   }

   _checkSubmitButton = () => {
      if (this._checkFormIsValid()) {
         this._activateSubmitButton();
      }
      else {
         this.disableSubmitButton();
      }
   }

   _validateInputs = () => {
      this._inputList.forEach((input) => {
         const inputError = this._formItem.querySelector(`.${input.name}-error`);
         input.addEventListener('input', () => { 
            if (!input.validity.valid) {
               this._showError(inputError, input);
            }
            else {
               this._hideError(inputError, input);
            }
            this._checkSubmitButton();
         })
      })
   }

   enableValidation = () => {
      this._formItem.addEventListener('submit', (ev) => {
            ev.preventDefault();
      });
      this._validateInputs();
   }
}