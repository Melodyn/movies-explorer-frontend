import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';

export const MoviesCardList = ({
  cards,
  loadMore,
  hasMore,
  isEmpty,
  isLoading,
  searchWasInit,
}) => (!isLoading
  && (
    <article className="article movies" aria-label="Все роллы">
      {searchWasInit && !isEmpty && (
        <>
          <ul className="cards">
            {cards.map((card) => <MoviesCard key={card.id} card={card} />)}
          </ul>
          {hasMore && (
            <button
              type="button"
              className="animation button movies__more"
              disabled={isLoading}
              onClick={loadMore}
            >
              Ещё
            </button>
          )}
        </>
      )}
      {searchWasInit && isEmpty && <p className="movies__load-info">Ничего не найдено</p>}
    </article>
  )
);
