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
    this._cards = [];
    this._searchResults = [];
    this._wasLoaded = false;
    this._chunkSize = 3;
    this._cursor = 0;

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

  setInfo({ name, email }) {
    return this._fetch('users/me', HTTP_METHOD.PATCH, { name, email });
  }

  /* auth */
  setToken(token = '') {
    this._config.apiMainAuthToken = token;
  }

  login({ password, email }) {
    return this._fetch('signin', HTTP_METHOD.POST, { password, email });
  }

  register({ password, email, name }) {
    return this._fetch('signup', HTTP_METHOD.POST, { password, email, name });
  }

  /* cards */
  setChunkSize(size) {
    this._chunkSize = size;
  }

  resetCursor() {
    this._cursor = 0;
    this._searchResults = [];
  }

  hasMore() {
    return (this._cursor < this._searchResults.length);
  }

  async load() {
    if (!this._wasLoaded) {
      await this._fetch('movies').then((cards) => {
        this._cards = cards;
        this._wasLoaded = true;
      });
    }
  }

  async get({
    size = 0,
    film = '',
    shorts = false,
    id = null,
  }) {
    await this.load();

    const chunkSize = (size === 0) ? this._chunkSize : size;
    const startIdx = this._cursor;
    const endIdx = startIdx + chunkSize;

    this._searchResults = this._cards
      .filter((item) => {
        const {
          nameRU = '',
          nameEN = '',
          duration,
          movieId,
        } = item;

        if (shorts && duration > 40) {
          return false;
        }

        if (id && id === movieId) {
          return true;
        }

        return `${nameRU}${nameEN}`
          .toLowerCase()
          .includes(film.toLowerCase());
      });

    const cards = (this._searchResults.length > 1)
      ? this._searchResults.slice(startIdx, endIdx)
      : this._searchResults;

    if (startIdx < this._searchResults.length) {
      this._cursor += chunkSize;
    }

    return cards;
  }

  async saveOrRemove(card) {
    await this.load();

    const { saved = false, _id = '', ...fields } = card;

    if (saved) {
      return this._fetch(`movies/${_id}`, HTTP_METHOD.DELETE)
        .then((deletedCard) => {
          this._cards = this._cards.filter((crd) => (crd.movieId !== deletedCard.movieId));
          return deletedCard;
        });
    }

    return this._fetch('movies', HTTP_METHOD.POST, fields)
      .then((newCard) => {
        newCard.saved = true;
        this._cards = this._cards.concat(newCard);
        return newCard;
      });
  }
}
