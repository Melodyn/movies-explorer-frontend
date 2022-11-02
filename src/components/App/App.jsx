import { useState } from 'react';
import './App.css';

export const App = () => {
  const [hello] = useState('На главную');
  return (
    <>
      <header className="header">
        <a
          href="/"
          className="animation logo"
          aria-label={hello}
        />

        <button
          className="button navigation-link navigation-link_type_burger"
          type="button"
          aria-label="Открыть меню"
        />

        <nav className="navigation navigation_place_header">
          <ul className="navigation-links navigation-links_type_menu">
            <li>
              <a
                href="/"
                className="navigation-link"
              >
                Фильмы
              </a>
            </li>
            <li>
              <a
                href="/"
                className="animation navigation-link navigation-link_inactive"
              >
                Сохранённые фильмы
              </a>
            </li>
          </ul>

          <ul className="navigation-links navigation-links_type_profile">
            <li>
              <a
                href="/"
                className="animation navigation-link"
              >
                Регистрация
              </a>
            </li>
            <li>
              <button
                className="button button_bg_accent navigation-link navigation-link_type_login"
                type="button"
              >
                Войти
              </button>
            </li>
            <li>
              <button
                className="button button_bg_light navigation-link navigation-link_type_account"
                type="button"
              >
                Аккаунт
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main">
        <article className="cover">
          <div className="cover__container">
            <h1 className="cover__text">Дипломный проект студента факультета веб-разработки</h1>
            <div className="cover__buttons">
              <button type="button" className="button button_bg_gray cover__button">О проекте</button>
              <button type="button" className="button button_bg_gray cover__button">Технологии</button>
              <button type="button" className="button button_bg_gray cover__button">Студент</button>
            </div>
          </div>
        </article>
      </main>

      <div className="popup popup_type_navigation popup_opened">
        <div className="popup__container">
          <button
            className="button animation popup__close"
            type="button"
            aria-label="Закрыть"
          />
          <nav className="navigation navigation_place_popup popup__content">
            <ul className="navigation-links navigation-links_type_popup">
              <li>
                <a
                  href="/"
                  className="navigation-link navigation-link_active"
                >
                  Главная
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="navigation-link"
                >
                  Фильмы
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="animation navigation-link"
                >
                  Сохранённые фильмы
                </a>
              </li>
            </ul>

            <ul className="navigation-links navigation-links_type_profile">
              <li>
                <button
                  className="button button_bg_light navigation-link navigation-link_type_account"
                  type="button"
                >
                  Аккаунт
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
