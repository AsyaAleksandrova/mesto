import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
   constructor(selector) {
      super(selector);
      this._picture = this._popup.querySelector('.popup__picture');
      this._description = this._popup.querySelector('.popup__description');
   }
   open(name, link) {
      this._picture.alt = name;
      this._picture.src = link;
      this._description.textContent = name;
      super.open();
   }
}