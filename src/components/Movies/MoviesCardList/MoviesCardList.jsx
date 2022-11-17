import './MoviesCardList.css';
import { Preloader } from '../Preloader/Preloader';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import pepe from '../../../images/pepe-photo.png';
import save from '../../../images/save.svg';

const inc = (() => {
  let i = 0;
  return () => {
    i += 1;
    return i;
  };
})();

const fullCards = [
  {
    id: inc(),
    name: 'Лучшие мемы 2022',
    duration: '20ч 22м',
    cover: pepe,
    saved: true,
  },
  {
    id: inc(),
    name: 'Супермегагиперпупернанодуперсверхкилотерра',
    duration: '20ч 22м',
    cover: save,
    saved: true,
  },
  {
    id: inc(),
    name: 'Лучшие мемы 2022',
    duration: '20ч 22м',
    cover: pepe,
    saved: false,
  },
  {
    id: inc(),
    name: 'Супермегагиперпупернанодуперсверхкилотерра',
    duration: '20ч 22м',
    cover: save,
    saved: true,
  },
  {
    id: inc(),
    name: 'Лучшие мемы 2022',
    duration: '20ч 22м',
    cover: pepe,
    saved: false,
  },
  {
    id: inc(),
    name: 'Супермегагиперпупернанодуперсверхкилотерра',
    duration: '20ч 22м',
    cover: save,
    saved: true,
  },
];
const emptyCards = [];
const loadingCards = [null];
const defaultCards = (() => {
  const cards = [fullCards, emptyCards, loadingCards];
  let i = 0;
  return () => {
    i += 1;
    if (i >= cards.length) {
      i = 0;
    }
    return cards[i];
  };
})();

export const MoviesCardList = ({ cards = defaultCards() }) => {
  const isEmpty = cards.length === 0;
  const isLoading = !isEmpty
    && (cards.length === 1)
    && (cards[0] === null);
  const hasCards = !isEmpty && !isLoading;

  return (
    <article className="article movies" aria-label="Все роллы">
      {hasCards && (
      <>
        <ul className="cards">
          {cards.map((card) => <MoviesCard key={card.id} card={card} />)}
        </ul>
        <button
          type="button"
          className="animation button movies__more"
          disabled={isLoading}
        >
          Ещё
        </button>
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
