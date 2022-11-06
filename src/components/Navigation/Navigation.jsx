import './Navigation.css';
import cn from 'classnames';
import {
  Link,
} from 'react-router-dom';

export const Navigation = ({ isAuthorized, place }) => {
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
                  className="navigation-link navigation-link_active"
                >
                  Главная
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/movies"
                className="navigation-link"
              >
                Все роллы
              </Link>
            </li>
            <li>
              <Link
                to="/saved-movies"
                className="animation navigation-link navigation-link_inactive"
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
            >
              Аккаунт
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
