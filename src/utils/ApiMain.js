import { HTTP_METHOD } from './constants';

const processResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return res
    .json()
    .then(({ message, error }) => {
      res.message = message || error || `Ошибка ${res.status}`;
      return Promise.reject(res);
    });
};

export class ApiMain {
  constructor(config) {
    this._config = config;

    this._fetch = (page, method = HTTP_METHOD.GET, body = undefined) => {
      const authorizationHeader = this._config.apiMainAuthToken
        ? ({ Authorization: `Bearer ${this._config.apiMainAuthToken}` })
        : ({});

      return fetch(
        `${this._config.apiMainBaseURL}/${page}`,
        {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...authorizationHeader,
          },
          body: (body && JSON.stringify(body)),
        },
      )
        .then(processResponse);
    };
  }

  /* profile */
  getProfile() {
    return this._fetch('users/me');
  }

  setAvatar({ avatar }) {
    return this._fetch('users/me/avatar', HTTP_METHOD.PATCH, { avatar });
  }

  setInfo({ name, email }) {
    return this._fetch('users/me', HTTP_METHOD.PATCH, { name, email });
  }

  /* card */
  getCards() {
    return this._fetch('cards');
  }

  createCard({ name, link }) {
    return this._fetch('cards', HTTP_METHOD.POST, { name, link });
  }

  removeCard({ cardId }) {
    return this._fetch(`cards/${cardId}`, HTTP_METHOD.DELETE);
  }

  likeCard({ cardId, liked }) {
    if (liked) {
      return this.removeLikeCard({ cardId });
    }
    return this.addLikeCard({ cardId });
  }

  addLikeCard({ cardId }) {
    return this._fetch(`cards/${cardId}/likes`, HTTP_METHOD.PUT);
  }

  removeLikeCard({ cardId }) {
    return this._fetch(`cards/${cardId}/likes`, HTTP_METHOD.DELETE);
  }

  /* auth */
  setToken(token = '') {
    this._config.apiMainAuthToken = token;
  }

  checkToken() {
    return this.getProfile();
  }

  login({ password, email }) {
    return this._fetch('signin', HTTP_METHOD.POST, { password, email });
  }

  register({ password, email, name }) {
    return this._fetch('signup', HTTP_METHOD.POST, { password, email, name });
  }
}
