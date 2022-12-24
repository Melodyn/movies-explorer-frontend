import './App.css';
import { useState, useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from 'react-router-dom';
// helpers
import { UserContext, defaultUser } from '../../contexts/User';
import { useStorageToken } from '../../hooks/useStorageToken';
import { ROUTE } from '../../utils/constants';
import { ApiMain } from '../../utils/ApiMain';
import { ApiFilms } from '../../utils/ApiFilms';
// import { FakeApiMain } from '../../utils/FakeApiMain';
// import { FakeApiFilms } from '../../utils/FakeApiFilms';
// components
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { Header } from '../Header/Header';
import { Navigation } from '../Navigation/Navigation';
import { Footer } from '../Footer/Footer';
import { NavTab } from '../Main/NavTab/NavTab';
import { NotFound } from '../NotFound/NotFound';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../Movies/SavedMovies';
import { Register } from '../Register/Register';
import { Login } from '../Login/Login';
import { Profile } from '../Profile/Profile';

export const App = ({ config }) => {
  const apiMain = new ApiMain(config);
  const apiFilms = new ApiFilms(config);
  // const apiMain = new FakeApiMain(config);
  // const apiFilms = new FakeApiFilms(config);

  const [isNavtabOpened, setIsNavtabOpened] = useState(false);
  const [token, saveToken] = useStorageToken();
  const [currentUser, setCurrentUser] = useState({
    ...defaultUser,
    token,
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isKnownRoute = location.pathname !== ROUTE.NOT_FOUND;
  const isLocationSign = location.pathname.includes('/sign');
  const isLocationProfile = location.pathname === ROUTE.PROFILE;
  const mustShowAppComponents = isKnownRoute && !isLocationSign;

  const updateUser = (newUser) => {
    const updatedUser = {
      ...currentUser,
      ...newUser,
    };
    if (updatedUser.token !== currentUser.token) {
      saveToken(updatedUser.token);
    }

    setCurrentUser(() => updatedUser);
  };

  const onLogin = (user) => {
    updateUser({ token: user.token });
    navigate(ROUTE.MAIN);
  };

  const onRegister = (user) => {
    updateUser(user);
    navigate(ROUTE.SIGNIN);
  };

  const onEditProfile = (user) => {
    updateUser(user);
  };

  const onLogout = () => {
    updateUser(defaultUser);
    navigate(ROUTE.SIGNIN);
  };

  useEffect(() => {
    apiMain.setToken(currentUser.token);

    if (currentUser.token) {
      apiMain.getProfile()
        .then((user) => {
          updateUser(user);
        })
        .catch(() => {
          updateUser(defaultUser);
          navigate(ROUTE.MAIN);
        });
    } else {
      updateUser(defaultUser);
      navigate(ROUTE.MAIN);
    }
  }, [currentUser.token]);

  return (
    <UserContext.Provider value={currentUser}>
      {mustShowAppComponents && (
        <Header
          onClickBurger={() => setIsNavtabOpened(true)}
        >
          <Navigation place="header" />
        </Header>
      )}

      <Routes>
        <Route
          path={ROUTE.MAIN}
          element={<Main />}
        />

        <Route
          path={ROUTE.SIGNUP}
          element={(
            <Register
              onRegister={onRegister}
              apiMain={apiMain}
            />
          )}
        />
        <Route
          path={ROUTE.SIGNIN}
          element={(
            <Login
              onLogin={onLogin}
              apiMain={apiMain}
            />
          )}
        />
        <Route
          path={ROUTE.PROFILE}
          element={(
            <ProtectedRoute>
              <Profile
                onLogout={onLogout}
                onEdit={onEditProfile}
                apiMain={apiMain}
              />
            </ProtectedRoute>
          )}
        />

        <Route
          path={ROUTE.MOVIES}
          element={(
            <ProtectedRoute>
              <Movies
                apiMain={apiMain}
                apiFilms={apiFilms}
              />
            </ProtectedRoute>
          )}
        />
        <Route
          path={ROUTE.MOVIES_SAVED}
          element={(
            <ProtectedRoute>
              <SavedMovies
                apiMain={apiMain}
                apiFilms={apiFilms}
              />
            </ProtectedRoute>
          )}
        />

        <Route
          path={ROUTE.NOT_FOUND}
          element={<NotFound />}
        />
        <Route
          path="*"
          element={<Navigate to={ROUTE.NOT_FOUND} replace />}
        />
      </Routes>

      {mustShowAppComponents && (
        <NavTab
          isOpen={isNavtabOpened}
          onClose={() => setIsNavtabOpened(false)}
        />
      )}

      {mustShowAppComponents && !isLocationProfile && <Footer />}
    </UserContext.Provider>
  );
};
