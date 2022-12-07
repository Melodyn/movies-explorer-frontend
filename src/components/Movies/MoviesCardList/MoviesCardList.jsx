import './MoviesCardList.css';
import { useState, useEffect } from 'react';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCard } from '../MoviesCard/MoviesCard';

const calcCardsCounter = () => {
  const counter = { init: 12, more: 3 };

  if (window.innerWidth < 879) {
    counter.init = 8;
    counter.more = 2;
  }
  if (window.innerWidth < 481) {
    counter.init = 5;
    counter.more = 1;
  }

  return counter;
};

export const MoviesCardList = ({ apiFilms }) => {
  const [cards, setCards] = useState([null]);
  const [hasMoreCards, setHasMoreCards] = useState(false);
  const isEmpty = cards.length === 0;
  const isInitLoading = (cards.length === 1) && (cards[0] === null);
  const [isLoading, setIsLoading] = useState(isInitLoading);
  const hasCards = !isEmpty && !isInitLoading;

  useEffect(() => {
    apiFilms
      .load()
      .then(() => apiFilms.get(calcCardsCounter().init))
      .then((initCards) => {
        setCards(() => initCards);
        setIsLoading(false);
        setHasMoreCards(apiFilms.hasMore());
      });
  }, []);

  const onClickMore = () => {
    setIsLoading(true);
    apiFilms.get(calcCardsCounter().more)
      .then((newCards) => {
        setCards((oldCards) => oldCards.concat(newCards));
        setIsLoading(false);
        setHasMoreCards(apiFilms.hasMore());
      });
  };

  return (
    <article className="article movies" aria-label="Все роллы">
      {hasCards && (
      <>
        <ul className="cards">
          {cards.map((card) => <MoviesCard key={card.id} card={card} />)}
        </ul>
        {hasMoreCards && (
          <button
            type="button"
            className="animation button movies__more"
            disabled={isLoading}
            onClick={onClickMore}
          >
            Ещё
          </button>
        )}
      </>
      )}
      {isLoading && (
      <>
        <Preloader />
        <p className="movies__load-info">Загрузка...</p>
      </>
      )}
      {isEmpty && <p className="movies__load-info">Ничего не найдено</p>}
    </article>
  );
};
