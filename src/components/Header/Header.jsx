import './Header.css';
import {
  Link,
} from 'react-router-dom';
import cn from 'classnames';
import { useContext } from 'react';
import { UserContext } from '../../contexts/User';

export const Header = ({
  onClickBurger = () => {},
  isLocationSign = false,
  children = null,
}) => {
  const currentUser = useContext(UserContext);
  const isAuthorized = currentUser.isAuth();

  return (
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
};
