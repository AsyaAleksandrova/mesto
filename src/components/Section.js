export class Section{
   constructor({items, renderer}, selector) {
      this._container = document.querySelector(selector);
      this._items = items;
      this._renderer = renderer;
   }

   renderItems() {
      this._items.forEach(element => {
         this._renderer(element);
      });
   }

   addItem(newItem) {
      this._container.prepend(newItem);
   }
}