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
    const savedFilmsRaw = localStorage.getItem('films_saved') || '[]';
    this._cards = JSON.parse(savedFilmsRaw);
    this._searchResults = [];
    this._wasLoaded = this._cards.length > 0;
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

  setProfile({ name, email }) {
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

  async loadAllCards() {
    if (!this._wasLoaded) {
      this._cards = await this._fetch('movies');
      this._wasLoaded = true;
      localStorage.setItem('films_saved', JSON.stringify(this._cards));
    }
  }

  async getCards({
    size = 0,
    film = '',
    shorts = false,
    id = null,
  }) {
    await this.loadAllCards();

    if (id !== null) {
      return this._cards.find(({ movieId }) => movieId === id);
    }

    const chunkSize = (size === 0) ? this._chunkSize : size;
    const startIdx = this._cursor;
    const endIdx = startIdx + chunkSize;

    this._searchResults = this._cards
      .filter((item) => {
        const {
          nameRU = '',
          nameEN = '',
          duration,
        } = item;

        if (shorts && duration > 40) {
          return false;
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

  async save(card) {
    await this.loadAllCards();

    const { saved, _id, ...fields } = card;

    return this._fetch('movies', HTTP_METHOD.POST, fields)
      .then((newCard) => {
        newCard.saved = true;
        newCard.id = newCard.movieId;
        this._cards = this._cards.concat(newCard);
        localStorage.setItem('films_saved', JSON.stringify(this._cards));
        return newCard;
      });
  }

  async remove(card) {
    await this.loadAllCards();

    return this._fetch(`movies/${card._id}`, HTTP_METHOD.DELETE)
      .then((deletedCard) => {
        deletedCard.id = deletedCard.movieId;
        this._cards = this._cards.filter((crd) => (crd.movieId !== deletedCard.movieId));
        localStorage.setItem('films_saved', JSON.stringify(this._cards));
        return deletedCard;
      });
  }
}
