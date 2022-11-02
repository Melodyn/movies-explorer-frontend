import './Header.css';
import { Navigation } from '../Navigation/Navigation';

export const Header = ({ isAuthorized, onClickBurger }) => (
  <header className="header">
    <a
      href="/"
      className="animation logo"
      aria-label="На главную"
    />

    {isAuthorized && (
      <button
        className="button navigation-link navigation-link_type_burger"
        type="button"
        aria-label="Открыть меню"
        onClick={onClickBurger}
      />
    )}

    <Navigation isAuthorized={isAuthorized} place="header" />
  </header>
);
