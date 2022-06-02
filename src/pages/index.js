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

export const api = new Api({
   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
   pass: '42c1e004-7873-4b0c-9174-75a2f76131ee'
}); 

// Подгружаем данные о пользователе

export const user = new UserInfo('.profile__name', '.profile__description');

const getUser = () => {
   api.getUserInfo()
      .then(res => {
         if (res.ok) {
            return res.json();
         } else {
            return Promise.reject(`Ошибка: ${res.status}`); 
         }
      })
      .then((result) => {
         user.setUserInfo(result.name, result.about, result._id);
         avatar.src = result.avatar;
      })
      .catch((err) => {
         console.log(err);
      }); 
}

getUser();

// Обновление данных профиля

const popupProfile = new PopupWithForm({
   selector: '.popup_type_profile',
   submitFunction: (input) => {
      popupProfile._btt.textContent = 'Сохранение...';
      api.setUserInfo(input.profilename, input.profiledescription)
         .then(res => {
            if (res.ok) {
               return res.json();
            } else {
               return Promise.reject(`Ошибка: ${res.status}`); 
            }
         })
         .then((result) => {
         user.setUserInfo(result.name, result.about, result._id);
         })
         .catch((err) => {
            console.log(err);
         }); 
      popupProfile.close();
      popupProfile._btt.textContent = 'Сохранить';
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
      popupAvatar._btt.textContent = 'Сохранение...';
      api.setAvatar(input.avatar)
         .then(res => {
            if (res.ok) {
               return res.json();
            } else {
               return Promise.reject(`Ошибка: ${res.status}`); 
            }
         })
         .then((result) => {
            avatar.src = result.avatar;
         })
         .catch((err) => {
            console.log(err);
         });       
      popupAvatar.close();
      popupAvatar._btt.textContent = 'Сохранить';
   }
});
popupAvatar.setEventListeners();

const validAvatar = new FormValidator(selectorsValid, popupAvatar._form);
validAvatar.enableValidation();

avatar.addEventListener('click', function () {
   document.querySelector('.popup__input_avatar').value = '';
   validAvatar.disableSubmitButton();
   popupAvatar.open()
})

// Подгружаем первоначальные карточки

const cardSectionSelector = '.foto';
const createCard = function (card) {
   const userCard = new Card(card, '#card', handleCardClick);
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
   const svCard = createCard(newCard);
   cardSection.addItem(svCard);      
}

const cardSection = new Section({
   items: [],
   renderer: (card) => {
      const newCard = createCard(card);
      cardSection.addItem(newCard);
   }
}, cardSectionSelector);

cardSection.renderItems();

const getCards = () => {
   api.getInitialCards()
      .then(res => {
         if (res.ok) {
            return res.json();
         } else {
            return Promise.reject(`Ошибка: ${res.status}`); 
         }
      })
      .then((result) => {
         result.forEach(card => {
            insertCard(card)
         });
      })
      .catch((err) => {
         console.log(err);
      });    
}

getCards();

// Добавляем фото

const popupFotoAdd = new PopupWithForm({
   selector:'.popup_type_foto-add',
   submitFunction: (input) => {
      popupFotoAdd._btt.textContent = 'Сохранение...';
      api.addCard(input.fotoname, input.fotolink)
         .then(res => res.json())
         .then((card) => {
            insertCard(card);
         })
         .catch((err) => {
            console.log(err);
         });       
      popupFotoAdd.close();
      popupFotoAdd._btt.textContent = 'Создать';
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

export const popupSure = new PopupDelete({
   selector: '.popup_type_sure',
   submitFunction: (photo, id) => {
      api.deleteCard(id)
         .then(res => {
            if (res.ok) {
               return res.json();
            } else {
               return Promise.reject(`Ошибка: ${res.status}`); 
            }
         })
         .then(() => { 
            photo.remove()
            popupSure.close();
         })
         .catch((err) => {
            console.log(err);
         });       
   }
});
popupSure.setEventListeners();

// Попап предпросмотра

const popupPreview = new PopupWithImage('.popup_type_foto-preview');
popupPreview.setEventListeners();

const handleCardClick = (name, link) => {
   popupPreview.open(name, link)
}