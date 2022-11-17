import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

export const MoviesCard = ({ card = {} }) => {
  const location = useLocation();
  const isLocationSaved = location.pathname.includes('saved');
  const classNames = cn(
    'animation',
    'button',
    'card__button',
    {
      card__button_type_save: (!isLocationSaved && !card.saved),
      card__button_type_saved: (!isLocationSaved && card.saved),
      card__button_type_remove: isLocationSaved,
    },
  );

  return (
    <li className="cards__item">
      <section className="card">
        <div className="card__content">
          <div className="card__info">
            <h2 className="card__name">{card.name}</h2>
            <p className="card__duration">{card.duration}</p>
          </div>
          <button
            type="button"
            className={classNames}
            aria-label="Избранное"
          />
        </div>
        <img className="card__image" src={card.cover} alt={card.name} />
      </section>
    </li>
  );
};
