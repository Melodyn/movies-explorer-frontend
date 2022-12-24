import './Movies.css';
import { useState, useEffect, useContext } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { MoviesCardList } from './MoviesCardList/MoviesCardList';
import { PreloaderContainer } from './PreloaderContainer/PreloaderContainer';
import { calcCardsCounter } from '../../utils/constants';
import { UserContext } from '../../contexts/User';

export const SavedMovies = ({ apiMain }) => {
  const currentUser = useContext(UserContext);
  apiMain.setToken(currentUser.token);

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
        updatedCards.forEach((card) => {
          card.saved = true;
          card.id = card._id;
        });

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
    if (!searchParams.isLoading) {
      setSearchParams((params) => ({ ...params, isLoading: true }));
    }

    updateFilmsChunk('reset');
  }, [searchParams.film, searchParams.shorts]);

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
        apiHasError={apiHasError}
        searchAccepted
      />
    </main>
  );
};
