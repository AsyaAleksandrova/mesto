import '../pages/index.css';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const inputName = document.querySelector('.popup__input_value_name');
const inputDesc = document.querySelector('.popup__input_value_desc');
const buttonFotoAdd = document.querySelector('.profile__add-button');
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

import { FormValidator } from './componenets/FormValidator.js';
import { Card } from './componenets/Card.js';
import { Section } from './componenets/Section.js';
import {PopupWithImage} from './componenets/PopupWithImage.js'
import { PopupWithForm } from './componenets/PopupWithForm.js';
import { UserInfo } from './componenets/UserInfo.js';


const User = new UserInfo('.profile__name', '.profile__description');

const popupPreview = new PopupWithImage('.popup_type_foto-preview');

const handleCardClick = (name, link) => {
   popupPreview.open(name, link)
}

const popupFotoAdd = new PopupWithForm({
   selector:'.popup_type_foto-add',
   submitFunction: (input) => {
      const newCard = {
            name: input.fotoname,
            link: input.fotolink
         }
       let svCard = createCard(newCard);
       cardSetion.addItem(svCard);
   }
   });

buttonFotoAdd.addEventListener('click', () => {
   validFotoAdd.disableSubmitButton();
   popupFotoAdd.open();
});

const popupProfile = new PopupWithForm({
   selector: '.popup_type_profile',
   submitFunction: (input) => {
      User.setUserInfo(input.profilename, input.profiledescription);
   }
});

buttonEditProfile.addEventListener('click', function () {
   const profile = User.getUserInfo();
   inputName.value = profile.name;
   inputDesc.value = profile.description;
   popupProfile.open();
});

const validProfile = new FormValidator(selectorsValid, popupProfile._form);
validProfile.enableValidation();
const validFotoAdd = new FormValidator(selectorsValid, popupFotoAdd._form);
validFotoAdd.enableValidation();


const createCard = function (card) {
   const userCard = new Card(card, '#card', handleCardClick);
   const newCard = userCard.createCard();
   return newCard
}

const cardSectionSelector = '.foto';

const cardSetion = new Section({
   items: initialCards,
   renderer: (card) => {
      const newCard = createCard(card);
      cardSetion.addItem(newCard);
   }
}, cardSectionSelector);

cardSetion.renderItems();