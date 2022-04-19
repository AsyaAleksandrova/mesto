const selectorsValid = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
}


const showError = ({ inputError, input, error, inputErrorClass, errorClass, ...restObj }) => {
   input.classList.add(inputErrorClass);
   inputError.textContent = error;
   inputError.classList.add(errorClass);
}

const hideError = ({ inputError, input, inputErrorClass, errorClass, ...restObj }) => {
   input.classList.remove(inputErrorClass);
   inputError.textContent = " ";
   inputError.classList.remove(errorClass);
}

const checkFormIsValid = (inputList) => {
   return !inputList.some((input) => {
      return !input.validity.valid;
   })
}

const activateSubmitButton = (formButton, inactiveButtonClass) => {
   formButton.classList.remove(inactiveButtonClass);
   formButton.disabled = false;
}

const disableSubmitButton = (formButton, inactiveButtonClass) => {
   formButton.classList.add(inactiveButtonClass);
   formButton.disabled = true;
}

const checkSubmitButton = ({ inputList, formButton, inactiveButtonClass, ...restObj }) => {
   if (checkFormIsValid(inputList)) {
      activateSubmitButton(formButton, inactiveButtonClass);
   }
   else {
      disableSubmitButton(formButton, inactiveButtonClass);
   }
}

const validateInputs = ({ formItem, inputSelector, submitButtonSelector, ...restObj }) => {
   const inputList = Array.from(formItem.querySelectorAll(inputSelector));
   const formButton = formItem.querySelector(submitButtonSelector);

   inputList.forEach((input) => {
      const inputError = formItem.querySelector(`.${input.name}-error`);
      input.addEventListener('input', () => { 
         const error = input.validationMessage;
         if (!input.validity.valid) {
            showError({ inputError, input, error, ...restObj });
         }
         else {
            hideError({ inputError, input, ...restObj });
         }
         checkSubmitButton({ inputList, formButton, ...restObj });
      })

   })
}

const enableValidation = ({ formSelector, ...restObj }) => {
   const formList = Array.from(document.querySelectorAll(formSelector));
   formList.forEach((formItem) => {
      formItem.addEventListener('submit', (ev) => {
         ev.preventDefault();
      });
      validateInputs({ formItem, ...restObj});
   })
}

enableValidation(selectorsValid); 