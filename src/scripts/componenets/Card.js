export class Card {
   constructor(data, selector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
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
      this._likeButton.classList.toggle('foto__like-button_active');
   }

   _deleteCard() {
      this._card.remove();
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
      this._likeButton = this._card.querySelector('.foto__like-button');
      this._setEventListeners();
      return this._card;
   }
};

