export class UserInfo{
   constructor(selectorName, selectorDescription, selectorAvatar) {
      this._name = document.querySelector(selectorName);
      this._description = document.querySelector(selectorDescription);
      this._avatar = document.querySelector(selectorAvatar);
   }
   
   getUserInfo() {
      const info = {
         name: this._name.textContent,
         description: this._description.textContent
      };
      return info;
   }

   setUserInfo(name, description, avatar, id) {
      this._name.textContent = name;
      this._description.textContent = description;
      this._avatar.src = avatar;
      if (id) {
         this.id = id;
      }
   }
}