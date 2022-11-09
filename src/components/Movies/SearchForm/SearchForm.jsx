/* почему-то линтер не видит htmlFor у лейбла */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './SearchForm.css';

export const SearchForm = () => (
  <article className="article search" aria-label="Поиск роллов">
    <form action="/" name="search" className="search__form">
      <fieldset className="search__fields search__fields_type_film">
        <label className="search-film__label" htmlFor="film" />
        <input
          className="search-film__input"
          type="text"
          placeholder="Ролл"
          id="film"
          name="film"
        />
        <button
          className="animation button search-film__button"
          type="submit"
          aria-label="Найти"
        />
      </fieldset>
      <fieldset className="search__fields search__fields_type_shorts">
        <div className="shorts-switch">
          <input
            className="shorts-switch__checkbox"
            type="checkbox"
            id="shorts"
            name="shorts"
          />
          <label className="shorts-switch__label" htmlFor="shorts" />
          <label className="shorts-switch__text" htmlFor="shorts">
            Короткометражки
          </label>
        </div>
      </fieldset>
    </form>
    <hr className="search-delimiter" />
  </article>
);
