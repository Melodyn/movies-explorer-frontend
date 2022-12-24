import './MoviesCard.css';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import cn from 'classnames';

export const MoviesCard = ({ card = {}, onClickSave }) => {
  const location = useLocation();
  const [disabled, setDisabled] = useState(false);
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
  const durationH = card.duration >= 60 ? `${Math.floor(card.duration / 60)} ч ` : '';
  const durationM = card.duration === 60 ? '' : `${card.duration % 60} м`;
  const duration = `${durationH}${durationM}`.trim();
  const onSave = () => {
    setDisabled(true);
    onClickSave(card, () => {
      setDisabled(false);
    });
  };

  return (
    <li className="cards__item">
      <section className="card">
        <div className="card__content">
          <div className="card__info">
            <h2 className="card__name">{card.nameRU}</h2>
            <p className="card__duration">{duration}</p>
          </div>
          <button
            type="button"
            className={classNames}
            disabled={disabled}
            onClick={onSave}
            aria-label="Избранное"
          />
        </div>
        <a href={card.trailerLink} target="_blank" className="card__link" rel="noreferrer">
          <img className="card__image" src={card.thumbnail} alt={card.name} />
        </a>
      </section>
    </li>
  );
};
