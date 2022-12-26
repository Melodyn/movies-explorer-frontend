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
    const savedFilmsRaw = localStorage.getItem('films_beat') || '[]';
    this._films = JSON.parse(savedFilmsRaw);
    this._wasLoaded = (this._films.length > 0);
    this._searchResults = [];
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

  async loadAllCards() {
    if (!this._wasLoaded) {
      const films = await this._fetch('');
      this._films = films.map((film) => {
        film.thumbnail = `${this._config.filmsBaseURL}${film.image.url}`;
        film.image = `${this._config.filmsBaseURL}${film.image.url}`;
        film.movieId = film.id;
        return film;
      });
      this._wasLoaded = true;
      localStorage.setItem('films_beat', JSON.stringify(this._films));
    }
  }

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

  async getCards({
    size = 0,
    film = '',
    shorts = false,
  }) {
    await this.loadAllCards();

    const chunkSize = size === 0 ? this._chunkSize : size;
    const startIdx = this._cursor;
    const endIdx = startIdx + chunkSize;

    this._searchResults = this._films
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

    const films = (this._searchResults.length > 1)
      ? this._searchResults.slice(startIdx, endIdx)
      : this._searchResults;

    if (startIdx < this._searchResults.length) {
      this._cursor += chunkSize;
    }

    return films;
  }
}
