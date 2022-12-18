import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';

export const MoviesCardList = ({
  cards,
  loadMore,
  onClickSave,
  hasMore,
  isEmpty,
  isLoading,
  searchWasInit,
  apiHasError,
}) => (!isLoading
  && (
    <article className="article movies" aria-label="Все роллы">
      {searchWasInit && !apiHasError && !isEmpty && (
        <>
          <ul className="cards">
            {cards.map((card) => <MoviesCard key={card.movieId} card={card} onClickSave={onClickSave} />)}
          </ul>
          {!apiHasError && hasMore && (
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
      {searchWasInit && !apiHasError && isEmpty && <p className="movies__load-info">Ничего не найдено</p>}
      {apiHasError && <p className="movies__load-info">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</p>}
    </article>
  )
);
