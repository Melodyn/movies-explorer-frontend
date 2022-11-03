import './App.css';
import { useState } from 'react';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Promo } from '../Main/Promo/Promo';
import { NavTab } from '../Main/NavTab/NavTab';
import { AboutProject } from '../Main/AboutProject/AboutProject';

export const App = () => {
  const [isAuthorized, setAuthorized] = useState(false);
  const [isNavtabOpened, setIsNavtabOpened] = useState(false);

  return (
    <>
      <Header
        isAuthorized={isAuthorized}
        onClickBurger={() => setIsNavtabOpened(true)}
      />

      <Main>
        <Promo onClickAuth={() => setAuthorized(!isAuthorized)} />
        <AboutProject />
      </Main>

      <NavTab
        isAuthorized={isAuthorized}
        isOpen={isNavtabOpened}
        onClose={() => setIsNavtabOpened(false)}
      />
    </>
  );
};
