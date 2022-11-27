import { createContext } from 'react';

export const defaultUser = {
  _id: '',
  name: 'Пепега',
  email: '',
  token: '',
  isAuth: function isAuth() {
    return (typeof this.token === 'string') && (this.token.length > 0);
  },
};

export const UserContext = createContext(defaultUser);
