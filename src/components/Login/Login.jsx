import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';

export const Login = () => (
  <main className="main sign-form-container">
    <Header isLocationSign />
    <form action="/" name="login" className="sign-form">
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
              className="sign-form__field"
              required
            />
            <span
              className="sign-form__field-error"
            />
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
              className="sign-form__field"
              required
            />
            <span
              className="sign-form__field-error"
            >
              password
            </span>
          </label>
        </fieldset>
      </div>

      <fieldset className="sign-form__fields">
        <span
          className="sign-form__field-error sign-form__field-error_for-api"
        >
          Неправильный логин или пароль
        </span>
        <button
          type="submit"
          className="button button_bg_accent sign-form__button"
          disabled
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
