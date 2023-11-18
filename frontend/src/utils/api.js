// require('dotenv').config();
const { REACT_APP_API_URL = 'https://e-dymov.nomoredomainsmonster.ru' } = process.env;
class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
      credentials: this._options.credentials,
    })
      .then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me `, {
      headers: this._options.headers,
      credentials: this._options.credentials,
    })
      .then(this._checkResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._options.baseUrl}/users/me `, {
      method: 'PATCH',
      body: JSON.stringify({ name, about }),
      credentials: this._options.credentials,
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: this._options.credentials,
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  like(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: this._options.credentials,
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  unlike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: this._options.credentials,
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  changeLIkeCardStatus(cardId, isLiked) {
    return isLiked ? this.like(cardId) : this.unlike(cardId);
  }

  createCard({ name, link }) {
    return fetch(`${this._options.baseUrl}/cards `, {
      method: 'POST',
      body: JSON.stringify({ name, link }),
      credentials: this._options.credentials,
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }

  updateAvatar(link) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      body: JSON.stringify({ avatar: link }),
      credentials: this._options.credentials,
      headers: this._options.headers
    })
      .then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: REACT_APP_API_URL,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
});


