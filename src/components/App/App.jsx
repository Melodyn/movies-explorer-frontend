import './App.css';
import { useState } from 'react';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { NavTab } from '../Main/NavTab/NavTab';

export const App = () => {
  const [isAuthorized, setAuthorized] = useState(false);
  const [isNavtabOpened, setIsNavtabOpened] = useState(false);

  return (
    <>
      <Header
        isAuthorized={isAuthorized}
        onClickBurger={() => setIsNavtabOpened(true)}
      />

      <Main onClickAuth={() => setAuthorized(!isAuthorized)} />

      <NavTab
        isAuthorized={isAuthorized}
        isOpen={isNavtabOpened}
        onClose={() => setIsNavtabOpened(false)}
      />

      <footer className="footer" />
    </>
  );
};
