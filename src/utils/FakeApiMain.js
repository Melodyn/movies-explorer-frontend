export class FakeApiMain {
  constructor(config) {
    this._config = config;
    this._profile = {
      _id: '638adc58eea2716444c0f7cb',
      name: 'test@test.com',
      email: 'test@test.com',
    };
    this._cards = [];
    this._searchResults = [];
    this._wasLoaded = false;
    this._chunkSize = 3;
    this._cursor = 0;
  }

  /* profile */
  async getProfile() {
    return this._profile;
  }

  setInfo({ name, email }) {
    this._profile = {
      ...this._profile,
      ...({ name, email }),
    };
    return this.getProfile();
  }

  /* auth */
  setToken(token = '') {
    this._config.apiMainAuthToken = token;
  }

  async login() {
    return { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhhZGM1OGVlYTI3MTY0NDRjMGY3Y2IiLCJpYXQiOjE2NzAwNDQ3NjIsImV4cCI6MTY3MDY0OTU2Mn0.go_5GSmFAM-HDPgCgELP65OVskpsW-DHlk8DWpGMq4U' };
  }

  register() {
    return this.getProfile();
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
      const savedCards = localStorage.getItem('savedCards') || '[]';
      this._cards = JSON.parse(savedCards);
      this._wasLoaded = true;
    }
  }

  async get({
    size = 0,
    film = '',
    shorts = false,
    id = null,
  }) {
    await this.load();

    const chunkSize = size === 0 ? this._chunkSize : size;
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
    const { saved = false, ...fields } = card;
    const updatedCard = saved ? fields : ({ ...fields, saved: true });
    if (saved) {
      this._searchResults = this._searchResults.filter((crd) => (crd.movieId !== fields.movieId));
    } else {
      this._cards = this._cards.concat(updatedCard);
    }
    localStorage.setItem('savedCards', JSON.stringify(this._cards));
    return updatedCard;
  }
}
