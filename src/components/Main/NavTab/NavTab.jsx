/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// эти правила сложно обойти правильно, пусть будут отключены
import './NavTab.css';
import cn from 'classnames';
import { Navigation } from '../../Navigation/Navigation';

export const NavTab = ({ isAuthorized, isOpen, onClose }) => {
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
          isAuthorized={isAuthorized}
          place="navtab"
          onClick={onClose}
        />
      </div>
    </div>
  );
};
