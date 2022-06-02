import { popupSure, user, api } from '../pages/index.js'


export class Card {
   constructor(data, selector, handleCardClick) {
      this._id = data.id;
      this._owner = data.owner;
      this._name = data.name;
      this._link = data.link;
      this._likes = data.likes.length;
      this._isLiked = false;
      data.likes.forEach(like => {
         if (like._id == user._id) {
            this._isLiked = true;
         }
      });
      this._selector = selector;
      this._handleCardClick = handleCardClick;
   };
   
   _getTemplate() {
      const userCard = document
         .querySelector(this._selector)
         .content
         .querySelector('.foto__item')
         .cloneNode(true);
      return userCard;
   }
 
   _likeFunc() {
      if (this._likeButton.classList.contains('foto__like-button_active')) {
         api.deleteLike(this._id)
            .then(res => {
               if (res.ok) {
                  return res.json();
               } else {
                  return Promise.reject(`Ошибка: ${res.status}`); 
               }
            })
            .then((result) => {
               this._card.querySelector('.foto__like-counter').textContent = result.likes.length;
            })
            .catch((err) => {
               console.log(err);
            }); 
         this._likeButton.classList.remove('foto__like-button_active');
      } else {
         api.putLike(this._id)
            .then(res => {
               if (res.ok) {
                  return res.json();
               } else {
                  return Promise.reject(`Ошибка: ${res.status}`); 
               }
            })
            .then((result) => {
               this._card.querySelector('.foto__like-counter').textContent = result.likes.length;
            })
            .catch((err) => {
               console.log(err);
            }); 
         this._likeButton.classList.add('foto__like-button_active');
      }
   }

   _deleteCard() {
      popupSure.open(this._card, this._id);
   }

   _setEventListeners() {
      this._card.querySelector('.foto__picture').addEventListener('click', () => this._handleCardClick(this._name, this._link));
      this._likeButton.addEventListener('click', () => this._likeFunc());
      this._card.querySelector('.foto__delete-button').addEventListener('click', () => this._deleteCard());
   }  

   createCard() {
      this._card = this._getTemplate();
      this._card.querySelector('.foto__picture').src = this._link;
      this._card.querySelector('.foto__picture').alt = this._name;
      this._card.querySelector('.foto__name').textContent = this._name;
      this._card.querySelector('.foto__like-counter').textContent = this._likes;
      this._likeButton = this._card.querySelector('.foto__like-button');
      if (this._isLiked) {
         this._likeButton.classList.add('foto__like-button_active');
      }
      if (this._owner == user._id) {
         this._card.querySelector('.foto__delete-button').classList.add('foto__delete-button_active');
      }
      this._setEventListeners();
      return this._card;
   }
};

