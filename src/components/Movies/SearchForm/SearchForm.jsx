/* почему-то линтер не видит htmlFor у лейбла */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './SearchForm.css';
import { useEffect, useRef } from 'react';
import { useForm } from '../../../hooks/useForm';

export const SearchForm = ({ onSearch, searchParams }) => {
  const formRef = useRef(null);
  const {
    values,
    isLocked,
    setValues,
    setSubmitHandler,
    resetValues,
  } = useForm(formRef, searchParams);

  const onChange = (e) => {
    localStorage.setItem(`search_${e.target.name}`, e.target.type === 'checkbox'
      ? e.target.checked
      : e.target.value);
    setValues(e);
  };

  const onSubmit = setSubmitHandler((data) => new Promise((res) => {
    setTimeout(() => {
      res(onSearch(data));
    }, 5000);
  }));

  useEffect(() => {
    resetValues(searchParams);
  }, Object.values(searchParams));

  return (
    <article className="article search" aria-label="Поиск роллов">
      <form
        action="/"
        name="search"
        className="search-form"
        onSubmit={onSubmit}
        ref={formRef}
      >
        <fieldset className="search__fields search__fields_type_film">
          <label className="search-form__label" htmlFor="film" />
          <input
            className="search-form__input form-field"
            type="text"
            placeholder="Ролл"
            id="film"
            name="film"
            minLength={3}
            value={values.film}
            disabled={isLocked}
            onChange={onChange}
          />
          <button
            className="animation button search-form__button"
            type="submit"
            aria-label="Найти"
            disabled={isLocked}
          />
        </fieldset>
        <fieldset className="search__fields search__fields_type_shorts">
          <div className="shorts-switch">
            <input
              className="shorts-switch__checkbox"
              type="checkbox"
              id="shorts"
              name="shorts"
              checked={values.shorts}
              disabled={isLocked}
              onChange={onChange}
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
};
