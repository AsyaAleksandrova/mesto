import './index.css';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const avatar = document.querySelector('.profile__foto')
const inputName = document.querySelector('.popup__input_value_name');
const inputDesc = document.querySelector('.popup__input_value_desc');
const buttonFotoAdd = document.querySelector('.profile__add-button');

import {selectorsValid } from '../utils/utils.js'
import { FormValidator } from '../components/FormValidator.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import {PopupWithImage} from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupDelete } from '../components/PopupDelete.js'
import { UserInfo } from '../components/UserInfo.js';
import { Api } from '../components/Api.js';

// Объявляем api

const api = new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
   pass: '42c1e004-7873-4b0c-9174-75a2f76131ee'
});


// Объявляем функции создания карточек и секцию с фото

const createCard = function (card) {
   const userCard = new Card(card, '#card', handleCardClick, popupSure, user, api);
   const newCard = userCard.createCard();
   return newCard
}

const insertCard = (card) => {
   const newCard = {
      name: card.name,
      link: card.link,
      likes: card.likes,
      id: card._id,
      owner: card.owner._id
   };
   cardSection.renderItems(newCard);
}

const cardSection = new Section({
   items: [],
   renderer: (card) => {
      const newCard = createCard(card);
      cardSection.addItem(newCard);
   }
}, '.foto');


// Подгружаем данные о пользователе и первоначальные карточки

const user = new UserInfo('.profile__name', '.profile__description', '.profile__foto');

const getUserInfo = () => {
   Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
         user.setUserInfo(userData.name, userData.about, userData.avatar, userData._id);
         cards.reverse().forEach(card => {
               insertCard(card)
            });
      })
      .catch(api.catchError); 
}

getUserInfo();


// Обновление данных профиля

const popupProfile = new PopupWithForm({
   selector: '.popup_type_profile',
   submitFunction: (input) => {
      popupProfile.btt.textContent = 'Сохранение...';
      api.setUserInfo(input.profilename, input.profiledescription)
         .then((result) => {
            user.setUserInfo(result.name, result.about, result.avatar);
            popupProfile.close();
         })
         .catch(api.catchError)
         .finally(() => {
            popupProfile.btt.textContent = 'Сохранить';
         })
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


const popupAvatar = new PopupWithForm({
   selector:'.popup_type_avatar',
   submitFunction: (input) => {
      popupAvatar.btt.textContent = 'Сохранение...';
      api.setAvatar(input.avatar)
         .then((result) => {
            user.setUserInfo(result.name, result.about, result.avatar);
            popupAvatar.close();          
         })
         .catch(api.catchError)
         .finally(() => {
            popupAvatar.btt.textContent = 'Сохранить';
         })      
   }
});
popupAvatar.setEventListeners();

const validAvatar = new FormValidator(selectorsValid, popupAvatar._form);
validAvatar.enableValidation();

avatar.addEventListener('click', function () {
   validAvatar.disableSubmitButton();
   popupAvatar.open()
})

// Добавляем фото

const popupFotoAdd = new PopupWithForm({
   selector:'.popup_type_foto-add',
   submitFunction: (input) => {
      popupFotoAdd.btt.textContent = 'Сохранение...';
      api.addCard(input.fotoname, input.fotolink)
         .then((card) => {
            insertCard(card);
            popupFotoAdd.close();            
         })
         .catch(api.catchError)
         .finally(() => {
            popupFotoAdd.btt.textContent = 'Создать';
         })       
   }
});
popupFotoAdd.setEventListeners();

buttonFotoAdd.addEventListener('click', () => {
   validFotoAdd.disableSubmitButton();
   popupFotoAdd.open();
});

const validFotoAdd = new FormValidator(selectorsValid, popupFotoAdd._form);
validFotoAdd.enableValidation();

// Попап удаления карточки

const popupSure = new PopupDelete({
   selector: '.popup_type_sure',
   submitFunction: (photo, id) => {
      api.deleteCard(id)
         .then(() => { 
            photo.remove()
            popupSure.close();
         })
         .catch(api.catchError);       
   }
});
popupSure.setEventListeners();

// Попап предпросмотра

const popupPreview = new PopupWithImage('.popup_type_foto-preview');
popupPreview.setEventListeners();

const handleCardClick = (name, link) => {
   popupPreview.open(name, link)
}