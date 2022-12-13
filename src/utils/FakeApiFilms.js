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
    this._films = fixtureFilms.map((film) => {
      film.cover = this.buildCoverLink(film);
      return film;
    });
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
    film,
    shorts,
  }) {
    if (!this._wasLoaded) {
      try {
        await this.load();
        this._wasLoaded = true;
      } catch (err) {
        this._wasLoaded = false;
        throw err;
      }
    }

    const chunkSize = size === 0 ? this._chunkSize : size;
    const startIdx = this._cursor;
    const endIdx = startIdx + chunkSize;

    this._searchResults = this._films
      .filter((item) => {
        const { nameRU, duration } = item;
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
