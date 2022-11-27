/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// эти правила сложно обойти правильно, пусть будут отключены
import './NavTab.css';
import cn from 'classnames';
import { Navigation } from '../../Navigation/Navigation';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/User';

export const NavTab = ({ isOpen, onClose }) => {
  const currentUser = useContext(UserContext);
  const isAuthorized = currentUser.isAuth();
  if (!isAuthorized) return null;
  const className = cn(
    'navtab',
    'navtab_type_navigation',
    { navtab_opened: isOpen },
  );

  return (
    <div
      className={className}
      onClick={(e) => e.target.classList.contains('navtab__container') && onClose()}
    >
      <div className="navtab__container">
        <button
          className="button animation navtab__close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />

        <Navigation
          place="navtab"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
