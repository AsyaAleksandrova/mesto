import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
   constructor({ selector, submitFunction }) {
      super(selector);
      this._form = this._popup.querySelector('.popup__form');
      this.btt = this._popup.querySelector('.popup__button');
      this._submitFunction = submitFunction;
      this._inputList = this._popup.querySelectorAll('.popup__input');

   }

   _getInputValues = () => {
      const inputValues = {};
      this._inputList.forEach(input => {
         inputValues[input.name] = input.value;
      });
      return inputValues;
   }

   _submitForm = (ev) => {
      ev.preventDefault();
      this._submitFunction(this._getInputValues());      
   }

   setEventListeners(){
      super.setEventListeners();
      this._form.addEventListener('submit', this._submitForm);
   }

   close = () => {
      this._form.reset();
      super.close();
   }
}