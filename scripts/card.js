import { popupPreview, namePreviewFoto, picturePreviewFoto, openPopup } from './utils.js';

// push почему-то не подхватывает изменение заглавной буквы (изменила на самой странице github, надеюсь, поможет)
export class Card {
   constructor(data, selector) {
     this._name = data.name;
     this._link = data.link;
     this._selector = selector;
   };
   
   _getTemplate() {
      const userCard = document
         .querySelector(this._selector)
         .content
         .querySelector('.foto__item')
         .cloneNode(true);
      return userCard;
   }
  
   _previewFunc() {
      namePreviewFoto.textContent = this._name;
      picturePreviewFoto.src = this._link;
      picturePreviewFoto.alt = this._name; 
      openPopup(popupPreview);
   }
   
   _likeFunc() {
      this._likeButton.classList.toggle('foto__like-button_active');
   }

   _deleteCard() {
      this._card.remove();
   }

   _setEventListeners() {
      this._card.querySelector('.foto__picture').addEventListener('click', () => this._previewFunc());
      this._likeButton.addEventListener('click', () => this._likeFunc());
      this._card.querySelector('.foto__delete-button').addEventListener('click', () => this._deleteCard());
   }  

   createCard() {
      this._card = this._getTemplate();
      this._card.querySelector('.foto__picture').src = this._link;
      this._card.querySelector('.foto__picture').alt = this._name;
      this._card.querySelector('.foto__name').textContent = this._name;
      this._likeButton = this._card.querySelector('.foto__like-button');
      this._setEventListeners();
      return this._card;
   }
};

