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

// TODO: сделать обработку ошибок и показ в интерфейсе
export const Movies = ({ apiFilms }) => {
  const defaultSearchParams = {
    film: localStorage.getItem('search_film') || '',
    shorts: (localStorage.getItem('search_shorts') || false) === 'true',
    isLoading: false,
  };
  const [cards, setCards] = useState([]);
  const [searchWasInit, setSearchWasInit] = useState(false);
  const [searchParams, setSearchParams] = useState(defaultSearchParams);
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

    apiFilms
      .get({
        ...searchParams,
        size,
      })
      .then((newCards) => {
        if (reset) {
          setCards(() => newCards);
        } else {
          setCards((prev) => prev.concat(newCards));
        }
        onEndSearch();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const loadMore = () => {
    setSearchParams((params) => ({ ...params, isLoading: true }));
    updateFilmsChunk();
  };

  useEffect(() => {
    if (searchWasInit && !searchParams.isLoading) {
      setSearchParams((params) => ({ ...params, isLoading: true }));
    }

    setTimeout(() => {
      if (searchWasInit) {
        updateFilmsChunk('reset');
      }
    }, 5000);
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
        hasMore={apiFilms.hasMore()}
        isEmpty={isEmpty}
        isLoading={searchParams.isLoading}
        searchWasInit={searchWasInit}
      />
    </main>
  );
};
