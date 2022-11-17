import './Header.css';
import {
  Link,
} from 'react-router-dom';
import cn from 'classnames';

export const Header = ({
  isAuthorized = false,
  onClickBurger = () => {},
  isLocationSign = false,
  children = null,
}) => (
  <header className={cn('header', { header_compact: isLocationSign })}>
    <Link
      to="/"
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

    {children}
  </header>
);
