import './Movies.css';
import { SearchForm } from './SearchForm/SearchForm';
import { MoviesCardList } from './MoviesCardList/MoviesCardList';

export const Movies = () => (
  <main className="main">
    <SearchForm />
    <MoviesCardList />
  </main>
);
