import './Navigation.css';
import cn from 'classnames';

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
                <a
                  href="/"
                  className="navigation-link navigation-link_active"
                >
                  Главная
                </a>
              </li>
            )}
            <li>
              <a
                href="/"
                className="navigation-link"
              >
                Все роллы
              </a>
            </li>
            <li>
              <a
                href="/"
                className="animation navigation-link navigation-link_inactive"
              >
                Запечённые роллы
              </a>
            </li>
          </>
        )}
      </ul>

      <ul className="navigation-links navigation-links_type_profile">
        {!isAuthorized && (
          <>
            <li>
              <a
                href="/"
                className="animation navigation-link"
              >
                Регистрация
              </a>
            </li>
            <li>
              <button
                className="button button_bg_accent navigation-link navigation-link_type_login"
                type="button"
              >
                Войти
              </button>
            </li>
          </>
        )}
        {isAuthorized && (
          <li>
            <button
              className="button button_bg_light navigation-link navigation-link_type_account"
              type="button"
            >
              Аккаунт
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
