import './Movies.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SearchForm } from './SearchForm/SearchForm';
import { MoviesCardList } from './MoviesCardList/MoviesCardList';
import { PreloaderContainer } from './PreloaderContainer/PreloaderContainer';
import { ROUTE } from '../../utils/constants';

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

export const Movies = ({ apiFilms, apiMain }) => {
  const location = useLocation();
  const isPageSaved = (location.pathname === ROUTE.MOVIES_SAVED);
  const lsKeyNameFilm = `search_film${isPageSaved ? '_saved' : ''}`;
  const lsKeyNameShorts = `search_shorts${isPageSaved ? '_saved' : ''}`;
  const savedFilmSearch = (localStorage.getItem(lsKeyNameFilm) || '');
  const savedShortsSearch = (localStorage.getItem(lsKeyNameShorts) || false);
  const hasSavedSearch = savedFilmSearch.length > 0;
  // TODO: по кнопке "ещё" в списке всех очищается список сохранёнок, в списке сохранёнок нет "ещё"

  const defaultSearchParams = {
    film: savedFilmSearch,
    shorts: (savedShortsSearch === 'true'),
    isLoading: false,
  };
  const [cards, setCards] = useState([]);
  const [searchWasInit, setSearchWasInit] = useState(hasSavedSearch);
  const [searchParams, setSearchParams] = useState(defaultSearchParams);

  useEffect(() => {
    setSearchParams(defaultSearchParams);
  }, [isPageSaved]);

  const [apiHasError, setApiHasError] = useState(false);
  const isEmpty = (cards.length === 0);

  const onSearch = async (newParams) => {
    const updatedParams = {
      ...searchParams,
      ...newParams,
      isLoading: true,
    };
    localStorage.setItem(lsKeyNameFilm, updatedParams.film);
    localStorage.setItem(lsKeyNameShorts, updatedParams.shorts);
    if (!searchWasInit && !isPageSaved) setSearchWasInit(true);
    setSearchParams(() => updatedParams);
  };

  const onEndSearch = () => {
    setSearchParams((params) => ({ ...params, isLoading: false }));
  };

  const onTypingSearch = (fieldName, value) => {
    localStorage.setItem(`search_${fieldName}${isPageSaved ? '_saved' : ''}`, value);
  };

  const updateBeatFilmsChunk = (reset = false) => {
    const cardsCounter = calcCardsCounter();
    let size = cardsCounter.more;
    if (reset) {
      apiFilms.resetCursor();
      apiMain.resetCursor();
      size = cardsCounter.init;
    }

    apiFilms.get({
      ...searchParams,
      size,
    })
      .then((newCards) => Promise
        .all(newCards.map(({ movieId }) => apiMain.get({ ...searchParams, id: movieId, size })))
        .then((savedCards) => [newCards, savedCards.flat()]))
      .then(([newCards, savedCards]) => {
        const savedCardsSet = new Set(savedCards.map((card) => card.movieId));
        const updatedCards = newCards.map((card) => ({ ...card, saved: savedCardsSet.has(card.movieId) }));

        if (reset) {
          setCards(() => updatedCards);
        } else {
          setCards((prev) => prev.concat(updatedCards));
        }

        setApiHasError(false);
        onEndSearch();
      })
      .catch((err) => {
        console.error(err);
        setApiHasError(true);
        onEndSearch();
      });
  };

  const updateSavedFilmsChunk = (reset = false) => {
    const cardsCounter = calcCardsCounter();
    let size = cardsCounter.more;
    if (reset) {
      apiMain.resetCursor();
      size = cardsCounter.init;
    }

    apiMain.get({
      ...searchParams,
      size,
    })
      .then((updatedCards) => {
        if (reset) {
          setCards(() => updatedCards);
        } else {
          setCards((prev) => prev.concat(updatedCards));
        }

        setApiHasError(false);
        onEndSearch();
      })
      .catch((err) => {
        console.error(err);
        setApiHasError(true);
        onEndSearch();
      });
  };

  const updateFilmsChunk = isPageSaved ? updateSavedFilmsChunk : updateBeatFilmsChunk;

  const loadMore = () => {
    setSearchParams((params) => ({ ...params, isLoading: true }));
    updateFilmsChunk();
  };

  const onClickSave = (film, onEnd) => {
    apiMain.saveOrRemove(film)
      .then((updatedFilm) => {
        setCards((crds) => crds.map((flm) => (flm.movieId === updatedFilm.movieId ? updatedFilm : flm)));
      })
      .catch((err) => {
        console.error(err);
        setApiHasError(true);
      })
      .finally(onEnd);
  };

  const onClickRemove = (film, onEnd) => {
    apiMain.saveOrRemove(film)
      .then((updatedFilm) => {
        setCards((crds) => crds.filter((flm) => (flm.movieId !== updatedFilm.movieId)));
      })
      .catch((err) => {
        console.error(err);
        setApiHasError(true);
      })
      .finally(onEnd);
  };

  useEffect(() => {
    const searchAccepted = isPageSaved || searchWasInit;
    if (searchAccepted && !searchParams.isLoading) {
      setSearchParams((params) => ({ ...params, isLoading: true }));
    }

    if (searchAccepted) {
      updateFilmsChunk('reset');
    }
  }, [searchWasInit, isPageSaved, searchParams.film, searchParams.shorts]);

  return (
    <main className="main">
      <SearchForm
        onTypingSearch={onTypingSearch}
        onSearch={onSearch}
        searchParams={searchParams}
        required={!isPageSaved}
      />
      {searchParams.isLoading && (
        <PreloaderContainer />
      )}
      <MoviesCardList
        cards={cards}
        loadMore={loadMore}
        onClickSave={isPageSaved ? onClickRemove : onClickSave}
        hasMore={apiFilms.hasMore()}
        isEmpty={isEmpty}
        isLoading={searchParams.isLoading}
        searchAccepted={isPageSaved || searchWasInit}
        apiHasError={apiHasError}
      />
    </main>
  );
};
