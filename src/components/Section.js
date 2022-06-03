export class Section{
   constructor({items, renderer}, selector) {
      this._container = document.querySelector(selector);
      this._items = items;
      this._renderer = renderer;
   }

   renderItems(card) {
      this._renderer(card);
   }

   addItem(newItem) {
      this._container.prepend(newItem);
   }
}