import './App.css';
import { useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { NavTab } from '../Main/NavTab/NavTab';
import { Footer } from '../Footer/Footer';
import { NotFound } from '../NotFound/NotFound';

export const App = () => {
  const [isAuthorized, setAuthorized] = useState(false);
  const [isNavtabOpened, setIsNavtabOpened] = useState(false);
  const location = useLocation();
  const isKnownRoute = location.pathname !== '/404';

  return (
    <>
      {isKnownRoute && (
      <Header
        isAuthorized={isAuthorized}
        onClickBurger={() => setIsNavtabOpened(true)}
      />
      )}

      <Routes>
        <Route
          path="/"
          element={<Main onClickAuth={() => setAuthorized(!isAuthorized)} />}
        />
        <Route
          path="/404"
          element={<NotFound />}
        />
        <Route
          path="*"
          element={<Navigate to="/404" replace />}
        />
      </Routes>

      {isKnownRoute && (
      <NavTab
        isAuthorized={isAuthorized}
        isOpen={isNavtabOpened}
        onClose={() => setIsNavtabOpened(false)}
      />
      )}

      {isKnownRoute && <Footer />}
    </>
  );
};
