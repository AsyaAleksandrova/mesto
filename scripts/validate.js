const showError = ({ form, input, error, inputErrorClass }) => {
   input.classList.add(inputErrorClass);
   form.querySelector(`.${input.name}-error`).textContent = error;
}

const hideError = ({ form, input, inputErrorClass }) => {
   input.classList.remove(inputErrorClass);
   form.querySelector(`.${input.name}-error`).textContent = " ";
}

const checkFormIsValid = (inputList) => {
   return !inputList.some((input) => {
      return !input.validity.valid;
   })
}

const activateFormButton = ({ formItem, inputList, submitButtonSelector, inactiveButtonClass }) => {
   const formButton = formItem.querySelector(submitButtonSelector);
   if (checkFormIsValid(inputList)) {
      formButton.classList.remove(inactiveButtonClass);
      formButton.disabled = false;
   }
   else {
      formButton.classList.add(inactiveButtonClass);
      formButton.disabled = true;
   }
}

const validateInputs = ({ formItem, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) => {
   const inputList = Array.from(formItem.querySelectorAll(inputSelector));
   activateFormButton({ formItem: formItem, inputList, submitButtonSelector, inactiveButtonClass });
   inputList.forEach((input) => {
      input.addEventListener('input', () => { 
         if (!input.validity.valid) {
            showError({ form: formItem, input, error: input.validationMessage, inputErrorClass });
         }
         else {
            hideError({ form: formItem, input, inputErrorClass });
         }
         activateFormButton({ formItem: formItem, inputList: inputList, submitButtonSelector, inactiveButtonClass });
      })

   })
}

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector,
   inactiveButtonClass, inputErrorClass }) => {
   const formList = Array.from(document.querySelectorAll(formSelector));
   formList.forEach((formItem) => {
      formItem.addEventListener('submit', (ev) => {
         ev.preventDefault();
      });
      validateInputs({ formItem, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass });
   })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
}); 