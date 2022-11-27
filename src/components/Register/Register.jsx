import './Register.css';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import { useForm } from '../../hooks/useForm';

export const Register = ({ onRegister }) => {
  const formRef = useRef(null);
  const {
    values,
    errors,
    isValid,
    isLocked,
    setValues,
    setSubmitHandler,
  } = useForm(formRef, { name: '', email: '', password: '' });

  const onSubmit = setSubmitHandler(onRegister);

  return (
    <main className="main sign-form-container">
      <Header isLocationSign />
      <form action="/" name="register" className="sign-form" onSubmit={onSubmit} ref={formRef}>
        <div className="sign-form__fields-wrapper">
          <h1 className="sign-form__header">Регистрация</h1>

          <fieldset className="sign-form__fields">
            <label className="sign-form__label" htmlFor="name">
            <span
              className="sign-form__field-name"
            >
              Никнейм
            </span>
              <input
                type="text"
                name="name"
                id="name"
                className="sign-form__field form-field"
                minLength={3}
                required
                value={values.name}
                onChange={setValues}
                disabled={isLocked}
              />
              <span
                className="sign-form__field-error"
              >{errors.name}</span>
            </label>

            <label className="sign-form__label" htmlFor="email">
            <span
              className="sign-form__field-name"
            >
              Почта
            </span>
              <input
                type="email"
                name="email"
                id="email"
                className="sign-form__field form-field"
                required
                value={values.email}
                onChange={setValues}
                disabled={isLocked}
              />
              <span
                className="sign-form__field-error"
              >{errors.email}</span>
            </label>

            <label className="sign-form__label" htmlFor="password">
            <span
              className="sign-form__field-name"
            >
              Пароль
            </span>
              <input
                type="password"
                name="password"
                id="password"
                className="sign-form__field form-field"
                required
                minLength={8}
                value={values.password}
                onChange={setValues}
                disabled={isLocked}
              />
              <span
                className="sign-form__field-error"
              >{errors.password}</span>
            </label>
          </fieldset>
        </div>

        <fieldset className="sign-form__fields">
        <span
          className="sign-form__field-error sign-form__field-error_for-api"
        />
          <button
            type="submit"
            className="button button_bg_accent sign-form__button"
            disabled={!isValid || isLocked}
          >
            Зарегистрироваться
          </button>
          <p className="sign-form__subbutton-text">
            Уже зарегистрированы?
            {' '}
            <Link
              to="/signin"
              className="sign-form__subbutton-link"
            >
              Войти
            </Link>
          </p>
        </fieldset>
      </form>
    </main>
  );
};
