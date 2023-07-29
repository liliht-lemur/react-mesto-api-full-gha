import * as config from '../config/config';

const { BASE_URL } = config;

class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = {
      ...config.headers
    };

    this._aboutMeUrl = `${BASE_URL}/users/me`;
    this._likesUrl = `/likes`;
  }

  getInitialCards() {
    const response = fetch(this._url, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    });

    return this.handleResponse(response);
  }

  createCard(name, link) {
    const response = fetch(this._url, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: 'POST',
      body: JSON.stringify({
        name,
        link
      })
    })

    return this.handleResponse(response);
  }

  deleteCard(cardId) {
    const response = fetch(`${this._url}/${cardId}`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: 'DELETE',
    });

    return this.handleResponse(response);
  }

  getAboutMe() {
    const response = fetch(this._aboutMeUrl, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      }
    });

    return this.handleResponse(response);
  }

  updateAboutMe(name, about) {
    const response = fetch(this._aboutMeUrl, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: 'PATCH',
      body: JSON.stringify({
        name,
        about
      })
    });

    return this.handleResponse(response);
  }

  updateMyAvatar(avatar) {
    const response = fetch(`${this._aboutMeUrl}/avatar`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: 'PATCH',
      body: JSON.stringify({
        avatar
      })
    });

    return this.handleResponse(response);
  }

  addLike(cardId) {
    const response = fetch(`${this._url}/${cardId}${this._likesUrl}`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: 'PUT'
    });

    return this.handleResponse(response);
  }

  removeLike(cardId) {
    const response = fetch(`${this._url}/${cardId}${this._likesUrl}`, {
      headers: {
        ...this._headers,
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      method: 'DELETE'
    });

    return this.handleResponse(response);
  }

  handleResponse(promise) {
    return promise
      .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}
const api = new Api({
  url: `${BASE_URL}/cards`,
  headers: {
    // Authorization: 'fbbc2820-3ad6-4359-8291-c4a6cd0cdb35',
    'Content-Type': 'application/json',
  }
});
export default api;

