import './Movies.css';
import { useState, useEffect, useContext } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { MoviesCardList } from './MoviesCardList/MoviesCardList';
import { PreloaderContainer } from './PreloaderContainer/PreloaderContainer';
import { calcCardsCounter } from '../../utils/constants';
import { UserContext } from '../../contexts/User';

export const Movies = ({ apiFilms, apiMain }) => {
  const currentUser = useContext(UserContext);
  apiMain.setToken(currentUser.token);

  const lsKeyNameFilm = 'search_film';
  const lsKeyNameShorts = 'search_shorts';
  const savedFilmSearch = (localStorage.getItem(lsKeyNameFilm) || '');
  const savedShortsSearch = (localStorage.getItem(lsKeyNameShorts) || false);
  const hasSavedSearch = (savedFilmSearch.length > 0);
  const defaultSearchParams = {
    film: savedFilmSearch,
    shorts: (savedShortsSearch === 'true'),
    isLoading: false,
  };
  const [cards, setCards] = useState([]);
  const [searchWasInit, setSearchWasInit] = useState(hasSavedSearch);
  const [searchParams, setSearchParams] = useState(defaultSearchParams);
  const [apiHasError, setApiHasError] = useState(false);
  const [hasMore, setHasMore] = useState(apiFilms.hasMore());
  const isEmpty = (cards.length === 0);

  const onSearch = async (newParams) => {
    const updatedParams = {
      ...searchParams,
      ...newParams,
      isLoading: true,
    };
    localStorage.setItem(lsKeyNameFilm, updatedParams.film);
    localStorage.setItem(lsKeyNameShorts, updatedParams.shorts);
    if (!searchWasInit) setSearchWasInit(true);
    setSearchParams(() => updatedParams);
  };

  const onEndSearch = () => {
    setSearchParams((params) => ({ ...params, isLoading: false }));
  };

  const onTypingSearch = (fieldName, value) => {
    localStorage.setItem(`search_${fieldName}`, value);
  };

  const updateFilmsChunk = (reset = false) => {
    const cardsCounter = calcCardsCounter();
    let size = cardsCounter.more;
    if (reset) {
      apiFilms.resetCursor();
      size = cardsCounter.init;
    }

    Promise.all([
      apiFilms.getCards({
        ...searchParams,
        size,
      }),
      apiMain.loadAllCards(),
    ])
      .then(([newCards]) => Promise
        .all(newCards.flatMap(({ movieId }) => apiMain.getCards({ id: movieId })))
        .then((savedCards) => [newCards, savedCards.filter((c) => c)]))
      .then(([newCards, savedCards]) => {
        const savedCardsMap = new Map(savedCards.map((card) => [card.movieId, card._id]));
        const updatedCards = newCards.map((card) => {
          const isSaved = savedCardsMap.has(card.id);
          card.saved = isSaved;
          if (isSaved) {
            card._id = savedCardsMap.get(card.id);
          }
          return card;
        });

        if (reset) {
          setCards(() => updatedCards);
        } else {
          setCards((prev) => prev.concat(updatedCards));
        }

        setHasMore(apiFilms.hasMore());
        setApiHasError(false);
        onEndSearch();
      })
      .catch((err) => {
        console.error(err);
        setApiHasError(true);
        onEndSearch();
      });
  };

  const loadMore = () => {
    setSearchParams((params) => ({ ...params, isLoading: true }));
    updateFilmsChunk();
  };

  const onClickSave = (film, onEnd) => {
    const methodPromise = film.saved ? apiMain.remove(film) : apiMain.save(film);
    methodPromise
      .then((updatedFilm) => {
        setCards((crds) => crds.map((flm) => (flm.movieId === updatedFilm.movieId ? updatedFilm : flm)));
      })
      .catch((err) => {
        console.error(err);
        setApiHasError(true);
      })
      .finally(onEnd);
  };

  useEffect(() => {
    if (searchWasInit && !searchParams.isLoading) {
      setSearchParams((params) => ({ ...params, isLoading: true }));
    }

    if (searchWasInit) {
      updateFilmsChunk('reset');
    }
  }, [searchWasInit, searchParams.film, searchParams.shorts]);

  return (
    <main className="main">
      <SearchForm
        onTypingSearch={onTypingSearch}
        onSearch={onSearch}
        searchParams={searchParams}
        required
      />
      {searchParams.isLoading && (
        <PreloaderContainer />
      )}
      <MoviesCardList
        cards={cards}
        loadMore={loadMore}
        onClickSave={onClickSave}
        hasMore={hasMore}
        isEmpty={isEmpty}
        isLoading={searchParams.isLoading}
        searchAccepted={searchWasInit}
        apiHasError={apiHasError}
      />
    </main>
  );
};
