import './Movies.css';
import { useState, useEffect } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { MoviesCardList } from './MoviesCardList/MoviesCardList';
import { PreloaderContainer } from './PreloaderContainer/PreloaderContainer';

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
  const savedFilmSearch = (localStorage.getItem('search_film') || '');
  const savedShortsSearch = (localStorage.getItem('search_shorts') || false);
  const hasSavedSearch = savedFilmSearch.length > 0;
  const defaultSearchParams = {
    film: savedFilmSearch,
    shorts: (savedShortsSearch === 'true'),
    isLoading: false,
  };
  const [cards, setCards] = useState([]);
  const [searchWasInit, setSearchWasInit] = useState(hasSavedSearch);
  const [searchParams, setSearchParams] = useState(defaultSearchParams);
  const [apiHasError, setApiHasError] = useState(false);
  const isEmpty = cards.length === 0;

  const onSearch = async (newParams) => {
    const updatedParams = {
      ...searchParams,
      ...newParams,
      isLoading: true,
    };
    localStorage.setItem('search_film', updatedParams.film);
    localStorage.setItem('search_shorts', updatedParams.shorts);
    if (!searchWasInit) setSearchWasInit(true);
    setSearchParams(() => updatedParams);
  };

  const onEndSearch = () => {
    setSearchParams((params) => ({ ...params, isLoading: false }));
  };

  const updateFilmsChunk = (reset = false) => {
    const cardsCounter = calcCardsCounter();
    let size = cardsCounter.more;
    if (reset) {
      apiFilms.resetCursor();
      size = cardsCounter.init;
    }

    Promise.all([
      apiFilms.get({
        ...searchParams,
        size,
      }),
      apiMain.load(),
    ])
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

  useEffect(() => {
    if (searchWasInit && !searchParams.isLoading) {
      setSearchParams((params) => ({ ...params, isLoading: true }));
    }

    setTimeout(() => {
      if (searchWasInit) {
        updateFilmsChunk('reset');
      }
    }, 500);
  }, [searchWasInit, searchParams.film, searchParams.shorts]);

  return (
    <main className="main">
      <SearchForm onSearch={onSearch} searchParams={searchParams} />
      {searchWasInit && searchParams.isLoading && (
        <PreloaderContainer />
      )}
      <MoviesCardList
        cards={cards}
        loadMore={loadMore}
        onClickSave={onClickSave}
        hasMore={apiFilms.hasMore()}
        isEmpty={isEmpty}
        isLoading={searchParams.isLoading}
        searchWasInit={searchWasInit}
        apiHasError={apiHasError}
      />
    </main>
  );
};
