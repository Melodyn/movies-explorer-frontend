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

export class ApiFilms {
  constructor(config) {
    this._config = config;
    this._config.filmsBaseURL = (new URL(this._config.apiFilmsBaseURL)).origin;
    this._films = [];
    this._chunkSize = 3;
    this._cursor = 0;

    this._fetch = (page, method = HTTP_METHOD.GET, body = undefined) => fetch(
      `${this._config.apiFilmsBaseURL}/${page}`,
      {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: (body && JSON.stringify(body)),
      },
    )
      .then(processResponse);
  }

  async load() {
    return this._fetch('').then((films) => {
      this._films = films.map((film) => {
        film.cover = this.buildCoverLink(film);
        return film;
      });
    });
  }

  setChunkSize(size) {
    this._chunkSize = size;
  }

  resetCursor() {
    this._cursor = 0;
  }

  hasMore() {
    return (this._cursor < this._films.length);
  }

  buildCoverLink(card) {
    return `${this._config.filmsBaseURL}${card.image.url}`;
  }

  async get({
    size = 0,
    film,
    shorts,
  }) {
    const chunkSize = size === 0 ? this._chunkSize : size;
    const startIdx = this._cursor;
    const endIdx = startIdx + chunkSize;

    this._searchResults = this._films
      .filter((filmm) => {
        const { nameRU, duration } = filmm;
        if (shorts && duration > 40) {
          return false;
        }
        return nameRU
          .toLowerCase()
          .includes(film.toLowerCase());
      });
    const films = this._searchResults.slice(startIdx, endIdx);

    if (startIdx < this._searchResults.length) {
      this._cursor += chunkSize;
    }

    return films;
  }
}