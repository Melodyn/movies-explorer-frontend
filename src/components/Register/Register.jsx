import './Register.css';
import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';

export const Register = () => (
  <main className="main sign-form-container">
    <Header isLocationSign />
    <form action="/" name="register" className="sign-form">
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
              className="sign-form__field"
            />
            <span
              className="sign-form__field-error"
            >
              name sdafj kjs kgsdgf gsfebf bsa ggbf sdbf aygasb abafgaksbdkfba gsad kasb fjsabj dfbakgfakb fasbjfkbskf
            </span>
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
              className="sign-form__field"
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
        />
        <button
          type="submit"
          className="button button_bg_accent sign-form__button"
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
