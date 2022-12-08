import './Movies.css';
import { useState } from 'react';
import { SearchForm } from './SearchForm/SearchForm';
import { MoviesCardList } from './MoviesCardList/MoviesCardList';

export const Movies = ({ apiMain, apiFilms }) => {
  const defaultSearchParams = {
    film: localStorage.getItem('search_film') || '',
    shorts: (localStorage.getItem('search_shorts') || false) === 'true',
  };
  const [searchParams, setSearchParams] = useState(defaultSearchParams);

  const onSearch = async (newParams) => {
    const updatedParams = {
      ...searchParams,
      ...newParams,
    };
    localStorage.setItem('search_film', updatedParams.film);
    localStorage.setItem('search_shorts', updatedParams.shorts);
    setSearchParams(() => updatedParams);
  };

  return (
    <main className="main">
      <SearchForm onSearch={onSearch} searchParams={searchParams} />
      <MoviesCardList
        apiFilms={apiFilms}
        apiMain={apiMain}
        searchParams={searchParams}
      />
    </main>
  );
};
