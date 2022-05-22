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

   setEventListeners() {
      this._buttonClose.addEventListener('click', () => this.close());
      this._popup.addEventListener('click', (ev) => {
         if (ev.target === this._popup) {
            this.close();
         }
      })      
   }

   open() {
      document.addEventListener('keydown', this._handleEscClose);
      this._popup.classList.add('popup_open');
   }

   close() {
      document.removeEventListener('keydown', this._handleEscClose);
      this._popup.classList.remove('popup_open');
   }
}