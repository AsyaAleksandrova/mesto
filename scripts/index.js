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
const buttonFotoAdd = document.querySelector('.profile__add-button');
const popupList = Array.from(document.querySelectorAll('.popup'));
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
import { popupPreview, buttonClosePreview, openPopup, closePopup } from './utils.js';
import { FormValidator } from './FormValidator.js';
import { Card } from './Card.js';

const insertFoto = function (newcard) {
   fotoList.prepend(newcard);
}

const createCard = function (card) {
   const userCard = new Card(card, '#card');
   const newCard = userCard.createCard();
   return newCard
}

const preloadCards = function (preloadCards) {
   preloadCards.forEach(element => {
      let newCard = createCard(element);
      insertFoto(newCard);
   });
}

preloadCards(initialCards);


const validProfile = new FormValidator(selectorsValid, formProfile);
validProfile.enableValidation();
const validFotoAdd = new FormValidator(selectorsValid, formFotoAdd);
validFotoAdd.enableValidation();


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
   validFotoAdd.disableSubmitButton();
   openPopup(popupFotoAdd);
});

buttonCloseFotoAdd.addEventListener('click', function () {
   closePopup(popupFotoAdd);
});

buttonClosePreview.addEventListener('click', function () {
   closePopup(popupPreview);
})

formFotoAdd.addEventListener('submit', (ev) => {
   ev.preventDefault();
   const newCard = {
         name: inputFotoName.value,
         link: inputFotoLink.value
      }
   let svCard = createCard(newCard);
   insertFoto(svCard);
   closePopup(popupFotoAdd);
})