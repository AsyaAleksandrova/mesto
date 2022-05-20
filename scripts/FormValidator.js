export class FormValidator{
   constructor(selectorsValid, input){
      this._formSelector = selectorsValid.formSelector;
      this._inputSelector = selectorsValid.inputSelector;
      this._submitButtonSelector = selectorsValid.submitButtonSelector;
      this._inactiveButtonClass = selectorsValid.inactiveButtonClass;
      this._inputErrorClass = selectorsValid.inputErrorClass;
      this._errorClass = selectorsValid.errorClass;
      this._input = input;
   }

   _showError = (inputError, input, error) => {
      input.classList.add(this._inputErrorClass);
      inputError.textContent = error;
      inputError.classList.add(this._errorClass);
   }

   _hideError = (inputError, input) => {
      input.classList.remove(this._inputErrorClass);
      inputError.textContent = " ";
      inputError.classList.remove(this._errorClass);
   }

   _checkFormIsValid = (inputList) => {
      return !inputList.some((input) => {
         return !input.validity.valid;
      })
   }

   _activateSubmitButton = (formButton) => {
      formButton.classList.remove(this._inactiveButtonClass);
      formButton.disabled = false;
   }

   disableSubmitButton = (formButton) => {
      formButton.classList.add(this._inactiveButtonClass);
      formButton.disabled = true;
   }

   _checkSubmitButton = (inputList, formButton) => {
      if (this._checkFormIsValid(inputList)) {
         this._activateSubmitButton(formButton);
      }
      else {
         this.disableSubmitButton(formButton);
      }
   }

   _validateInputs = (formItem) => {
      const inputList = Array.from(formItem.querySelectorAll(this._inputSelector));
      const formButton = formItem.querySelector(this._submitButtonSelector);

      inputList.forEach((input) => {
         const inputError = formItem.querySelector(`.${input.name}-error`);
         input.addEventListener('input', () => { 
            const error = input.validationMessage;
            if (!input.validity.valid) {
               this._showError(inputError, input, error);
            }
            else {
               this._hideError(inputError, input);
            }
            this._checkSubmitButton(inputList, formButton);
         })

      })
   }

   enableValidation = () => {
      const formList = Array.from(document.querySelectorAll(this._formSelector));
      formList.forEach((formItem) => {
         formItem.addEventListener('submit', (ev) => {
            ev.preventDefault();
         });
         this._validateInputs(formItem);
      })
   }
}