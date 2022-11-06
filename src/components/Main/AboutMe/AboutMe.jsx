import './AboutMe.css';
import { Portfolio } from '../Portfolio/Portfolio';

export const AboutMe = () => (
  <article className="article about-me">
    <h1 className="article__header" id="about-me">Автор</h1>
    <section className="two-columns about-me__columns">
      <div className="two-columns__column about-me__column about-me__content">
        <div className="about-me__description">
          <h2 className="about-me__header">Пепега</h2>
          <h3 className="about-me__subheader">Интернет-мем, с 2008 года</h3>
          <p className="about-me__text">
            {/* eslint-disable-next-line max-len */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <ul className="about-me__links">
          <li>
            <a className="about-me__link" href="https://ru.wikipedia.org/wiki/%D0%9B%D1%8F%D0%B3%D1%83%D1%88%D0%BE%D0%BD%D0%BE%D0%BA_%D0%9F%D0%B5%D0%BF%D0%B5" target="_blank" rel="noreferrer">
              Wikipedia
            </a>
          </li>
          <li>
            <a className="about-me__link" href="https://memepedia.ru/grustnaya-lyagushka-mem/" target="_blank" rel="noreferrer">
              Memepedia
            </a>
          </li>
        </ul>
      </div>
      <figure className="two-columns__column about-me__column about-me__image-container">
        <img
          src="../../../images/pepe-photo.png"
          className="two-columns__column about-me__column about-me__image"
          alt="Аватар"
        />
      </figure>
    </section>

    <Portfolio />
  </article>
);
