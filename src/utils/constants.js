export const configByEnv = {
  production: {
    env: 'production',
    apiMainBaseURL: 'https://api.diploma.melodyn.nomoredomains.icu',
    apiFilmsBaseURL: 'https://api.nomoreparties.co/beatfilm-movies',
    apiMainAuthToken: '',
  },
  development: {
    env: 'development',
    apiMainBaseURL: 'http://localhost:3000',
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

export const calcCardsCounter = () => {
  const counter = { init: 12, more: 3 };

  if (window.innerWidth < 1040) {
    counter.init = 8;
    counter.more = 2;
  }
  if (window.innerWidth < 481) {
    counter.init = 5;
    counter.more = 1;
  }

  return counter;
};
