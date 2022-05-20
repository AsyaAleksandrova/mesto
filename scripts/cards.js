
import {popupPreview, openPopup} from './index.js'
const namePreviewFoto = popupPreview.querySelector('.popup__description');
const picturePreviewFoto = popupPreview.querySelector('.popup__picture');

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
  
   _previewFunc(ev) {
      namePreviewFoto.textContent = ev.target.alt;
      picturePreviewFoto.src = ev.target.src;
      openPopup(popupPreview);
   }

   _likeFunc(ev) {
      ev.target.classList.toggle('foto__like-button_active');
   }

   _deleteCard(ev) {
      ev.target.closest('.foto__item').remove();
   }

   _setEventListeners() {
      this._card.querySelector('.foto__picture').addEventListener('click', (ev) => {
         this._previewFunc(ev)});
      this._card.querySelector('.foto__like-button').addEventListener('click', (ev) => {
         this._likeFunc(ev)});
      this._card.querySelector('.foto__delete-button').addEventListener('click', (ev) => {
         this._deleteCard(ev)});
   }  

   createCard() {
      this._card = this._getTemplate();
      this._card.querySelector('.foto__picture').src = this._link;
      this._card.querySelector('.foto__picture').alt = this._name;
      this._card.querySelector('.foto__name').textContent = this._name;
      this._setEventListeners();
      return this._card;
   }
};

