import { fixtureFilms } from './constants';
import pepe from '../images/pepe-photo.png';
import save from '../images/save.svg';

export class FakeApiFilms {
  constructor(config) {
    this._config = config;
    this._films = [];
    this._wasLoaded = false;
    this._searchResults = [];
    this._chunkSize = 3;
    this._cursor = 0;
  }

  async load() {
    if (!this._wasLoaded) {
      this._films = fixtureFilms.map((film) => {
        film.cover = this.buildCoverLink(film);
        return film;
      });
      this._wasLoaded = true;
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

  buildCoverLink() {
    const covers = [pepe, save];
    const randIdx = Math.round(Math.random());
    return covers[randIdx];
  }

  async get({
    size = 0,
    film = '',
    shorts = false,
  }) {
    await this.load();

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
