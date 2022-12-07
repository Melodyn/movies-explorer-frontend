import { fixtureFilms } from './constants';
import pepe from '../images/pepe-photo.png';
import save from '../images/save.svg';

export class FakeApiFilms {
  constructor(config) {
    this._config = config;
    this._films = [];
    this._chunkSize = 3;
    this._cursor = 0;
  }

  async load() {
    this._films = fixtureFilms.map((film) => {
      film.cover = this.buildCoverLink(film);
      return film;
    }).slice(0, 16);
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
    return [pepe, save][Math.round(Math.random())];
  }

  async get(size = 0) {
    const chunkSize = size === 0 ? this._chunkSize : size;
    const startIdx = this._cursor;
    const endIdx = startIdx + chunkSize;

    const films = this._films.slice(startIdx, endIdx);

    if (startIdx < this._films.length) {
      this._cursor += chunkSize;
    }

    return films;
  }
}
