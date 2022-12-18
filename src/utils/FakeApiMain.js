export class FakeApiMain {
  constructor(config) {
    this._config = config;
    this._profile = {
      _id: '638adc58eea2716444c0f7cb',
      name: 'test@test.com',
      email: 'test@test.com',
    };
    this._wasLoaded = false;
    this._cards = [];
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

  checkToken() {
    return this.getProfile();
  }

  async login() {
    return { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhhZGM1OGVlYTI3MTY0NDRjMGY3Y2IiLCJpYXQiOjE2NzAwNDQ3NjIsImV4cCI6MTY3MDY0OTU2Mn0.go_5GSmFAM-HDPgCgELP65OVskpsW-DHlk8DWpGMq4U' };
  }

  register() {
    return this.getProfile();
  }

  /* cards */
  async load() {
    if (!this._wasLoaded) {
      const savedCards = localStorage.getItem('savedCards') || '[]';
      this._cards = JSON.parse(savedCards);
      this._wasLoaded = true;
    }
    return this._cards;
  }

  async saveOrRemove(card) {
    return new Promise((res) => {
      setTimeout(() => {
        const { saved = false, ...fields } = card;
        const updatedCard = saved ? fields : ({ ...fields, saved: true });
        if (saved) {
          this._cards = this._cards.filter((crd) => (crd.movieId !== fields.movieId));
        } else {
          this._cards = this._cards.concat(updatedCard);
        }
        localStorage.setItem('savedCards', JSON.stringify(this._cards));
        res(updatedCard);
      }, 500);
    });
  }
}
