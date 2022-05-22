export class Popup{
   constructor(selector){
      this._popup = document.querySelector(selector);
      this._buttonClose = this._popup.querySelector('.popup__close');
   }

   _handleEscClose = (ev) => {
      if (ev.key === "Escape") {
         this.close();
      }      
   }

   _setEventListeners() {
      this._buttonClose.addEventListener('click', this.close);
      document.addEventListener('keydown', this._handleEscClose); 
      this._popup.addEventListener('click', (ev) => {
         if (ev.target === this._popup) {
            this.close();
         }
      })      
   }

   _removeEventListeners() {
      this._buttonClose.removeEventListener('click', this.close);
      document.removeEventListener('keydown', this._handleEscClose); 
   }

   open(){
      this._popup.classList.add('popup_open');
      this._setEventListeners();
   }

   close = () => {
      this._popup.classList.remove('popup_open');
      this._removeEventListeners();
   }
}