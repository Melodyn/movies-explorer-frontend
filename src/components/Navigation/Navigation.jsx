import './Navigation.css';
import cn from 'classnames';
import {
  Link,
  useLocation,
} from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/User';

export const Navigation = ({ place, onClick }) => {
  const currentUser = useContext(UserContext);
  const isAuthorized = currentUser.isAuth();

  const location = useLocation();
  const isLocationMain = (location.pathname === '/');
  const isLocationMovies = !isLocationMain && (location.pathname === '/movies');
  const isLocationSavedMovies = !isLocationMain && location.pathname.includes('saved');

  const isNavtab = (place === 'navtab');
  const navClassName = cn(
    'navigation',
    {
      navigation_place_header: !isNavtab,
      navigation_place_navtab: isNavtab,
      navtab__content: isNavtab,
      navigation_type_compact: isAuthorized && !isNavtab,
    },
  );
  const linksClassName = cn(
    'navigation-links',
    {
      'navigation-links_type_menu': !isNavtab,
      'navigation-links_type_navtab': isNavtab,
    },
  );

  return (
    <nav className={navClassName}>
      <ul className={linksClassName}>
        {isAuthorized && (
          <>
            {isNavtab && (
              <li>
                <Link
                  to="/"
                  className={cn(
                    'navigation-link',
                    {
                      animation: !isLocationMain,
                      'navigation-link_active': isLocationMain,
                    },
                  )}
                  onClick={onClick}
                >
                  Главная
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/movies"
                className={cn(
                  'navigation-link',
                  {
                    animation: !isLocationMovies,
                    'navigation-link_active': isLocationMovies,
                  },
                )}
                onClick={onClick}
              >
                Все роллы
              </Link>
            </li>
            <li>
              <Link
                to="/saved-movies"
                className={cn(
                  'navigation-link',
                  {
                    animation: !isLocationSavedMovies,
                    'navigation-link_active': isLocationSavedMovies,
                  },
                )}
                onClick={onClick}
              >
                Запечённые роллы
              </Link>
            </li>
          </>
        )}
      </ul>

      <ul className="navigation-links navigation-links_type_profile">
        {!isAuthorized && (
          <>
            <li>
              <Link
                to="/signup"
                className="animation navigation-link"
              >
                Регистрация
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="button button_bg_accent navigation-link navigation-link_type_login"
              >
                Войти
              </Link>
            </li>
          </>
        )}
        {isAuthorized && (
          <li>
            <Link
              to="/profile"
              className="button button_bg_light navigation-link navigation-link_type_account"
              onClick={onClick}
            >
              Аккаунт
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
