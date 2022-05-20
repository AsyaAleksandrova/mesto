const buttonEditProfile = document.querySelector('.profile__edit-button');
const popupProfile = document.querySelector('.popup_type_profile');
const buttonCloseProfile = popupProfile.querySelector('.popup__close');
const userName = document.querySelector('.profile__name');
const userDesc = document.querySelector('.profile__description');
const inputName = document.querySelector('.popup__input_value_name');
const inputDesc = document.querySelector('.popup__input_value_desc');
const formProfile = popupProfile.querySelector('.popup__form');
const popupFotoAdd = document.querySelector('.popup_type_foto-add');
const buttonCloseFotoAdd = popupFotoAdd.querySelector('.popup__close');
const inputFotoName = document.querySelector('.popup__input_foto_name');
const inputFotoLink = document.querySelector('.popup__input_foto_src');
const formFotoAdd = popupFotoAdd.querySelector('.popup__form');
const popupPreview = document.querySelector('.popup_type_foto-preview');
const buttonClosePreview = popupPreview.querySelector('.popup__close');
const buttonFotoAdd = document.querySelector('.profile__add-button');
const popupList = Array.from(document.querySelectorAll('.popup'));
const buttonSubmitFotoAdd = popupFotoAdd.querySelector('.popup__button');
const forms = document.querySelectorAll('.popup__form');
const fotoList = document.querySelector('.foto');
const selectorsValid = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
}
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

import { FormValidator } from './FormValidator.js';
import { Card } from './card.js';

const saveFoto = function (card) {
   const userCard = new Card(card, '#card');
   const newCard = userCard.createCard();
   fotoList.prepend(newCard);
}

const preloadCards = function (preloadCards) {
   preloadCards.forEach(element => {
      saveFoto(element);
   });
}


forms.forEach(form => {
   const validForm = new FormValidator(selectorsValid, form)
   validForm.enableValidation();
});

preloadCards(initialCards);


const openPopup = function (popOp) { 
   popOp.classList.add('popup_open');
   document.addEventListener('keydown', closeByEsc);
} 

const closePopup = function (popCl) { 
   popCl.classList.remove('popup_open');
   document.removeEventListener('keydown', closeByEsc);
} 
const closeByEsc = (ev) => {
   if (ev.key === "Escape") {
      const popOpened = document.querySelector('.popup_open');
      closePopup(popOpened);
   }
}

popupList.forEach(popup => {
   popup.addEventListener('click', (ev) => {
      if (ev.target === popup) {
         closePopup(popup);
      }
   })
})

const savePopup = function (ev) {
   ev.preventDefault();
   userName.textContent = inputName.value;
   userDesc.textContent = inputDesc.value;
   closePopup(popupProfile);
}

buttonEditProfile.addEventListener('click', function(){
   inputName.value = userName.textContent;
   inputDesc.value = userDesc.textContent;
   openPopup(popupProfile);
});

buttonCloseProfile.addEventListener('click', function () {
   closePopup(popupProfile);
});

formProfile.addEventListener('submit', savePopup);

buttonFotoAdd.addEventListener('click', function () {
   inputFotoName.value = '';
   inputFotoLink.value = '';
   const validForm = new FormValidator(selectorsValid, formFotoAdd)
   validForm.disableSubmitButton(buttonSubmitFotoAdd);
   openPopup(popupFotoAdd);
});

buttonCloseFotoAdd.addEventListener('click', function () {
   closePopup(popupFotoAdd);
});

document.querySelectorAll('.foto__picture').forEach(photo => {
   photo.addEventListener('click', function () {
      openPopup(popupPreview);
   })
})

buttonClosePreview.addEventListener('click', function () {
   closePopup(popupPreview);
})

formFotoAdd.addEventListener('submit', (ev) => {
   ev.preventDefault();
   const newCard = {
         name: inputFotoName.value,
         link: inputFotoLink.value
      }
   saveFoto(newCard);
   closePopup(popupFotoAdd);
})