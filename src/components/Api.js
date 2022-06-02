export class Api {
  constructor(options) {
     this._url = options.baseUrl;
     this._pass = options.pass;
  }

   getUserInfo() {
      const setUrl = this._url + '/users/me'
      return fetch(setUrl, {
         method: 'GET',
         headers: {
            authorization: this._pass
         }
      })
   }
   
   setUserInfo(name, description) {
      const setUrl = this._url + '/users/me'
      return fetch(setUrl, {
         method: 'PATCH',
         headers: {
            authorization: this._pass,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: name,
            about: description
         })         
      })           
   }

   setAvatar(link) {
      const setUrl = this._url + '/users/me/avatar'
      return fetch(setUrl, {
         method: 'PATCH',
         headers: {
            authorization: this._pass,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            avatar: link
         })
      })              
   }

  getInitialCards() {
      const setUrl = this._url + '/cards'
      return fetch(setUrl, {
         method: 'GET',
         headers: {
         authorization: this._pass
      }
      })
  }
   
   addCard(name, link) {
      const setUrl = this._url + '/cards'
      return fetch(setUrl, {
         method: 'POST',
         headers: {
            authorization: this._pass,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            name: name,
            link: link
         })
      })
   }

   deleteCard(id) {
      const setUrl = this._url + `/cards/${id}`;
      return fetch(setUrl, {
         method: 'DELETE',
         headers: {
            authorization: this._pass
         }
      })      
   }

   putLike(id) {
      const setUrl = this._url + `/cards/${id}/likes`;
      return fetch(setUrl, {
         method: 'PUT',
         headers: {
            authorization: this._pass
         }
      })
   }
   deleteLike(id) {
      const setUrl = this._url + `/cards/${id}/likes`;
      return fetch(setUrl, {
         method: 'DELETE',
         headers: {
            authorization: this._pass
         }
      })
   }   
}