export class Api {
  constructor(options) {
     this._url = options.baseUrl;
     this._pass = options.pass;
  }

   _checkResponse(res) {
      if (res.ok) {    
         return res.json();
      }
         return Promise.reject(`Ошибка ${res.status}`);
   }

   catchError(err) {
      console.log(err);
   }

   getUserInfo() {
      const setUrl = this._url + '/users/me'
      return fetch(setUrl, {
         method: 'GET',
         headers: {
            authorization: this._pass
         }
      })
      .then(this._checkResponse)
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
      .then(this._checkResponse)
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
      .then(this._checkResponse)
   }

  getInitialCards() {
      const setUrl = this._url + '/cards'
      return fetch(setUrl, {
         method: 'GET',
         headers: {
         authorization: this._pass
      }
      })
     .then(this._checkResponse)
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
      .then(this._checkResponse)
   }

   deleteCard(id) {
      const setUrl = this._url + `/cards/${id}`;
      return fetch(setUrl, {
         method: 'DELETE',
         headers: {
            authorization: this._pass
         }
      })
      .then(this._checkResponse)
   }

   putLike(id) {
      const setUrl = this._url + `/cards/${id}/likes`;
      return fetch(setUrl, {
         method: 'PUT',
         headers: {
            authorization: this._pass
         }
      })
      .then(this._checkResponse)
   }
   deleteLike(id) {
      const setUrl = this._url + `/cards/${id}/likes`;
      return fetch(setUrl, {
         method: 'DELETE',
         headers: {
            authorization: this._pass
         }
      })
      .then(this._checkResponse)
   }   
}