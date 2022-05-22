import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup{
   constructor({ selector, submitFunction }) {
      super(selector);
      this._form = this._popup.querySelector('.popup__form');
      this._btt = this._popup.querySelector('.popup__button');
      this._submitFunction = submitFunction;
      this._inputList = this._popup.querySelectorAll('.popup__input');

   }

   _getInputValues = () => {
      let inputValues = {};
      this._inputList.forEach(input => {
         inputValues[input.name] = input.value;
      });
      return inputValues;
   }

   _submitForm = (ev) => {
      ev.preventDefault();
      this._submitFunction(this._getInputValues());
      this.close();      
   }

   _setEventListeners(){
      super._setEventListeners();
      this._form.addEventListener('submit', this._submitForm);
   }

   _removeEventListeners() {
      super._removeEventListeners();
      this._form.removeEventListener('submit', this._submitForm);
   }

   close = () => {
      this._inputList.forEach(input => {
         input.value = '';
      });
      this._popup.classList.remove('popup_open');
      this._removeEventListeners();
   }
}