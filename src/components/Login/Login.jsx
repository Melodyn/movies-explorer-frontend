import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';

export const Login = () => (
  <main className="main profile-form-container">
    <Header isLocationSign />
    <form action="/" name="login" className="profile-form">
      <div className="profile-form__fields-wrapper">
        <h1 className="profile-form__header">Вход</h1>

        <fieldset className="profile-form__fields">
          <label className="profile-form__label" htmlFor="email">
            <span
              className="profile-form__field-name"
            >
              Почта
            </span>
            <input
              type="email"
              name="email"
              id="email"
              className="profile-form__field"
            />
            <span
              className="profile-form__field-error"
            />
          </label>

          <label className="profile-form__label" htmlFor="password">
            <span
              className="profile-form__field-name"
            >
              Пароль
            </span>
            <input
              type="password"
              name="password"
              id="password"
              className="profile-form__field"
            />
            <span
              className="profile-form__field-error"
            >
              password
            </span>
          </label>
        </fieldset>
      </div>

      <fieldset className="profile-form__fields">
        <span
          className="profile-form__field-error profile-form__field-error_for-api"
        >
          Неправильный логин или пароль
        </span>
        <button
          type="button"
          className="button button_bg_accent profile-form__button"
          disabled
        >
          Войти
        </button>
        <p className="profile-form__subbutton-text">
          Нет аккаунта?
          {' '}
          <Link
            to="/signup"
            className="profile-form__subbutton-link"
          >
            Зарегистрироваться
          </Link>
        </p>
      </fieldset>
    </form>
  </main>
);
