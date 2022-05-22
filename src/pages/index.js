import './index.css';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const inputName = document.querySelector('.popup__input_value_name');
const inputDesc = document.querySelector('.popup__input_value_desc');
const buttonFotoAdd = document.querySelector('.profile__add-button');

import {selectorsValid, initialCards} from '../utils/utils.js'
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';


const user = new UserInfo('.profile__name', '.profile__description');

const popupPreview = new PopupWithImage('.popup_type_foto-preview');
popupPreview.setEventListeners();

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
      popupFotoAdd.close();
   }
});
popupFotoAdd.setEventListeners();

buttonFotoAdd.addEventListener('click', () => {
   validFotoAdd.disableSubmitButton();
   popupFotoAdd.open();
});

const popupProfile = new PopupWithForm({
   selector: '.popup_type_profile',
   submitFunction: (input) => {
      user.setUserInfo(input.profilename, input.profiledescription);
      popupProfile.close();
   }
});
popupProfile.setEventListeners();

buttonEditProfile.addEventListener('click', function () {
   const profile = user.getUserInfo();
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