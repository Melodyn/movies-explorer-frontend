/* почему-то линтер не видит htmlFor у лейбла */
/* eslint-disable jsx-a11y/label-has-associated-control */
import './SearchForm.css';
import { useEffect, useRef } from 'react';
import { useForm } from '../../../hooks/useForm';

export const SearchForm = ({ onSearch, searchParams }) => {
  const { isLoading, ...params } = searchParams;
  const formRef = useRef(null);
  const {
    values,
    isValid,
    isLocked,
    setValues,
    setSubmitHandler,
    resetValues,
  } = useForm(formRef, params);

  const onChange = (e) => {
    localStorage.setItem(`search_${e.target.name}`, e.target.type === 'checkbox'
      ? e.target.checked
      : e.target.value);
    setValues(e);
  };

  const onSubmit = setSubmitHandler(onSearch);

  useEffect(() => {
    resetValues(searchParams);
  }, Object.values(searchParams));

  return (
    <article className="article search" aria-label="Поиск роллов">
      <div>
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
              minLength={1}
              value={values.film}
              disabled={isLocked || isLoading}
              onChange={onChange}
              required
            />
            <button
              className="animation button search-form__button"
              type="submit"
              aria-label="Найти"
              disabled={!isValid || isLocked || isLoading}
            />
          </fieldset>
          <fieldset className="search__fields search__fields_type_shorts">
            <div className="shorts-switch">
              <input
                className="shorts-switch__checkbox form-field"
                type="checkbox"
                id="shorts"
                name="shorts"
                checked={values.shorts}
                disabled={isLocked || isLoading}
                onChange={onChange}
              />
              <label className="shorts-switch__label" htmlFor="shorts" />
              <label className="shorts-switch__text" htmlFor="shorts">
                Короткометражки
              </label>
            </div>
          </fieldset>
        </form>
        <span className="search-form__error">
          {!isValid && 'Нужно ввести ключевое слово'}
        </span>
      </div>
      <hr className="search-delimiter" />
    </article>
  );
};
