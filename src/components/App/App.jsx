import './App.css';
import { useState } from 'react';
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
// components
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
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
  const navigate = useNavigate();
  const [isNavtabOpened, setIsNavtabOpened] = useState(false);
  const [token, saveToken] = useStorageToken();
  const [currentUser, setCurrentUser] = useState({
    ...defaultUser,
    token,
  });

  const location = useLocation();
  const isKnownRoute = location.pathname !== '/404';
  const isLocationSign = location.pathname.includes('/sign');
  const isLocationProfile = location.pathname === '/profile';
  const mustShowAppComponents = isKnownRoute && !isLocationSign;

  const updateUser = (newUser) => {
    const updatedUser = {
      ...currentUser,
      ...newUser,
    };
    if (updatedUser.token !== currentUser.token) {
      saveToken(updatedUser.token);
    }

    setCurrentUser(updatedUser);
  };

  const onLogin = async (user) => {
    user.token = 'jopa lala';
    updateUser(user);
    navigate('/');
  };

  const onRegister = async (user) => {
    updateUser(user);
    navigate('/signin');
  };

  const onEditProfile = async (user) => {
    updateUser(user);
  };

  const onLogout = () => {
    updateUser(defaultUser);
    navigate('/signin');
  };

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
          path="/"
          element={<Main />}
        />

        <Route
          path="/signup"
          element={<Register onRegister={onRegister}/>}
        />
        <Route
          path="/signin"
          element={<Login onLogin={onLogin} />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile onLogout={onLogout} onEdit={onEditProfile} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/movies"
          element={
            <ProtectedRoute>
              <Movies />
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRoute>
              <SavedMovies />
            </ProtectedRoute>
          }
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
        isOpen={isNavtabOpened}
        onClose={() => setIsNavtabOpened(false)}
      />
      )}

      {mustShowAppComponents && !isLocationProfile && <Footer />}
    </UserContext.Provider>
  );
};
