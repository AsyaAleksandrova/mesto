const formSelector = '.popup__form';
const inputSelector = '.popup__input';
const submitButtonSelector = '.popup__button';
const inactiveButtonClass = 'popup__button_disabled';
const inputErrorClass = 'popup__input_type_error';
const errorClass = 'popup__error_visible';
const selectorsValid = {
   formSelector,
   inputSelector,
   submitButtonSelector,
   inactiveButtonClass,
   inputErrorClass,
   errorClass
}


const showError = ({ inputError, input, error, ...selectorsValid }) => {
   input.classList.add(inputErrorClass);
   inputError.textContent = error;
   inputError.classList.add(errorClass);
}

const hideError = ({ inputError, input, ...selectorsValid }) => {
   input.classList.remove(inputErrorClass);
   inputError.textContent = " ";
   inputError.classList.remove(errorClass);
}

const checkFormIsValid = (inputList) => {
   return !inputList.some((input) => {
      return !input.validity.valid;
   })
}

const activateFormButton = ({ formItem, inputList, ...selectorsValid }) => {
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

const validateInputs = ({ formItem, ...selectorsValid }) => {
   const inputList = Array.from(formItem.querySelectorAll(inputSelector));
   formItem.closest('.popup').addEventListener('open', () => {
      activateFormButton({ formItem, inputList, ...selectorsValid });
   })
   inputList.forEach((input) => {
      const inputError = formItem.querySelector(`.${input.name}-error`);
      const error = input.validationMessage
      input.addEventListener('input', () => { 
         if (!input.validity.valid) {
            showError({ inputError, input, error, ...selectorsValid });
         }
         else {
            hideError({ inputError, input, ...selectorsValid });
         }
         activateFormButton({ formItem, inputList, ...selectorsValid });
      })

   })
}

const enableValidation = ({...selectorsValid }) => {
   const formList = Array.from(document.querySelectorAll(formSelector));
   formList.forEach((formItem) => {
      formItem.addEventListener('submit', (ev) => {
         ev.preventDefault();
      });
      validateInputs({ formItem, ...selectorsValid });
   })
}

enableValidation(selectorsValid); 