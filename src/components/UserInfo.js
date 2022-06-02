export class UserInfo{
   constructor(selectorName, selectorDescription) {
      this._name = document.querySelector(selectorName);
      this._description = document.querySelector(selectorDescription);
   }
   
   getUserInfo() {
      const info = {
         name: this._name.textContent,
         description: this._description.textContent
      };
      return info;
   }

   setUserInfo(name, description, id) {
      this._name.textContent = name;
      this._description.textContent = description;
      if (id) {
         this._id = id;
      }
   }
}