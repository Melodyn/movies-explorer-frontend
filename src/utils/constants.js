export const configByEnv = {
  production: {
    env: 'production',
    apiMainBaseURL: 'https://api.diploma.melodyn.nomoredomains.icu',
    apiFilmsBaseURL: 'https://api.nomoreparties.co/beatfilm-movies',
    apiMainAuthToken: '',
  },
  development: {
    env: 'development',
    apiMainBaseURL: 'http://localhost:5000',
    apiFilmsBaseURL: 'https://api.nomoreparties.co/beatfilm-movies',
    apiMainAuthToken: '',
  },
};

export const HTTP_METHOD = Object.freeze({
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
});

export const ROUTE = Object.freeze({
  MAIN: '/',
  NOT_FOUND: '/404',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  MOVIES: '/movies',
  MOVIES_SAVED: '/saved-movies',
});
