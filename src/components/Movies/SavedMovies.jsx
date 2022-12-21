import './Movies.css';
import { useState, useEffect } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { MoviesCardList } from './MoviesCardList/MoviesCardList';
import { PreloaderContainer } from './PreloaderContainer/PreloaderContainer';
import { calcCardsCounter } from '../../utils/constants';

export const SavedMovies = ({ apiMain }) => {
  const lsKeyNameFilm = 'search_film_saved';
  const lsKeyNameShorts = 'search_shorts_saved';
  const savedFilmSearch = (localStorage.getItem(lsKeyNameFilm) || '');
  const savedShortsSearch = (localStorage.getItem(lsKeyNameShorts) || false);
  const defaultSearchParams = {
    film: savedFilmSearch,
    shorts: (savedShortsSearch === 'true'),
    isLoading: false,
  };
  const [cards, setCards] = useState([]);
  const [searchWasInit, setSearchWasInit] = useState(true);
  const [searchParams, setSearchParams] = useState(defaultSearchParams);
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
    if (!searchWasInit) setSearchWasInit(true);
    setSearchParams(() => updatedParams);
  };

  const onEndSearch = () => {
    setSearchParams((params) => ({ ...params, isLoading: false }));
  };

  const onTypingSearch = (fieldName, value) => {
    localStorage.setItem(`search_${fieldName}_saved`, value);
  };

  const updateFilmsChunk = (reset = false) => {
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

  const loadMore = () => {
    setSearchParams((params) => ({ ...params, isLoading: true }));
    updateFilmsChunk();
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
    const searchAccepted = searchWasInit;
    if (searchAccepted && !searchParams.isLoading) {
      setSearchParams((params) => ({ ...params, isLoading: true }));
    }

    if (searchAccepted) {
      updateFilmsChunk('reset');
    }
  }, [searchWasInit, searchParams.film, searchParams.shorts]);

  return (
    <main className="main">
      <SearchForm
        onTypingSearch={onTypingSearch}
        onSearch={onSearch}
        searchParams={searchParams}
      />
      {searchParams.isLoading && (
        <PreloaderContainer />
      )}
      <MoviesCardList
        cards={cards}
        loadMore={loadMore}
        onClickSave={onClickRemove}
        hasMore={apiMain.hasMore()}
        isEmpty={isEmpty}
        isLoading={searchParams.isLoading}
        searchAccepted={searchWasInit}
        apiHasError={apiHasError}
      />
    </main>
  );
};
