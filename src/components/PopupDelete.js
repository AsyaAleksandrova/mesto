import { PopupWithForm } from '../components/PopupWithForm.js';

export class PopupDelete extends PopupWithForm{
   constructor({ selector, submitFunction}) {
      super({ selector, submitFunction });
   }
   _submitForm = (ev) => {
      ev.preventDefault();
      this._submitFunction(this._targetCard, this._idCard);      
   }   
   open(target, id) {
      this._targetCard = target;
      this._idCard = id;
      super.open();
   }
}