import './SavedMovies.css';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';

export const SavedMovies = () => (
  <main className="main">
    <SearchForm />
    <MoviesCardList />
  </main>
);
