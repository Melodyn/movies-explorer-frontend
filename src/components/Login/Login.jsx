import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import { useForm } from '../../hooks/useForm';

export const Login = ({ onLogin, apiMain }) => {
  const formRef = useRef(null);
  const {
    values,
    errors,
    isValid,
    isLocked,
    setValues,
    setSubmitHandler,
  } = useForm(formRef, { email: '', password: '' });
  const [apiError, setApiError] = useState('');

  const login = (data) => apiMain.login(data)
    .then(onLogin)
    .catch((err) => {
      setApiError(err.message);
    });
  const onSubmit = setSubmitHandler(login);

  return (
    <main className="main sign-form-container">
      <Header isLocationSign />
      <form action="/" name="login" className="sign-form" onSubmit={onSubmit} ref={formRef}>
        <div className="sign-form__fields-wrapper">
          <h1 className="sign-form__header">Вход</h1>

          <fieldset className="sign-form__fields">
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
                disabled={isLocked}
                value={values.email}
                onChange={setValues}
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
                disabled={isLocked}
                value={values.password}
                onChange={setValues}
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
        >{apiError}</span>
          <button
            type="submit"
            className="button button_bg_accent sign-form__button"
            disabled={!isValid || isLocked}
          >
            Войти
          </button>
          <p className="sign-form__subbutton-text">
            Нет аккаунта?
            {' '}
            <Link
              to="/signup"
              className="sign-form__subbutton-link"
            >
              Зарегистрироваться
            </Link>
          </p>
        </fieldset>
      </form>
    </main>
  );
};
