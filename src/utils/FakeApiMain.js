export class FakeApiMain {
  constructor(config) {
    this._config = config;
  }

  /* profile */
  async getProfile() {
    return {
      _id: '638adc58eea2716444c0f7cb',
      name: 'test@test.com',
      email: 'test@test.com',
    };
  }

  setAvatar({ avatar }) {
    return this.getProfile();
  }

  setInfo({ name, email }) {
    return this.getProfile();
  }

  /* auth */
  setToken(token = '') {
    this._config.apiMainAuthToken = token;
  }

  checkToken() {
    return this.getProfile();
  }

  async login({ password, email }) {
    return { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzhhZGM1OGVlYTI3MTY0NDRjMGY3Y2IiLCJpYXQiOjE2NzAwNDQ3NjIsImV4cCI6MTY3MDY0OTU2Mn0.go_5GSmFAM-HDPgCgELP65OVskpsW-DHlk8DWpGMq4U' };
  }

  register({ password, email, name }) {
    return this.getProfile();
  }
}
