import { useState } from 'react';

export const useStorageToken = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const save = (newToken) => {
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
    setToken(() => newToken);
  };

  return [token, save];
};
