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

  getFilms() {
    return this._fetch('');
  }
}
