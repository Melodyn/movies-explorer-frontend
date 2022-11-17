import './App.css';
import { useState } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Header } from '../Header/Header';
import { Navigation } from '../Navigation/Navigation';
import { Footer } from '../Footer/Footer';
import { NavTab } from '../Main/NavTab/NavTab';
import { NotFound } from '../NotFound/NotFound';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../Movies/SavedMovies/SavedMovies';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';

export const App = () => {
  const [isAuthorized] = useState(true);
  const [isNavtabOpened, setIsNavtabOpened] = useState(false);
  const location = useLocation();
  const isKnownRoute = location.pathname !== '/404';
  const isLocationSign = location.pathname.includes('/sign');
  const isLocationProfile = location.pathname === '/profile';
  const mustShowAppComponents = isKnownRoute && !isLocationSign;

  return (
    <>
      {mustShowAppComponents && (
      <Header
        isAuthorized={isAuthorized}
        onClickBurger={() => setIsNavtabOpened(true)}
      >
        <Navigation isAuthorized={isAuthorized} place="header" />
      </Header>
      )}

      <Routes>
        <Route
          path="/"
          element={<Main />}
        />

        <Route
          path="/signup"
          element={<Register />}
        />
        <Route
          path="/signin"
          element={<Login />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/movies"
          element={<Movies />}
        />
        <Route
          path="/saved-movies"
          element={<SavedMovies />}
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

      {mustShowAppComponents && (
      <NavTab
        isAuthorized={isAuthorized}
        isOpen={isNavtabOpened}
        onClose={() => setIsNavtabOpened(false)}
      />
      )}

      {mustShowAppComponents && !isLocationProfile && <Footer />}
    </>
  );
};
