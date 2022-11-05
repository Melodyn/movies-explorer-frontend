import './Portfolio.css';

export const Portfolio = () => (
  <section className="portfolio">
    <h2 className="portfolio__header">Портфолио</h2>
    <ul className="portfolio__items">
      <li>
        <a
          className="animation portfolio__item"
          href="https://melodyn.github.io/how-to-learn/"
          target="_blank"
          rel="noreferrer"
        >
          Статичный сайт
        </a>
      </li>
      <li>
        <a
          className="animation portfolio__item"
          href="https://melodyn.github.io/russian-travel/"
          target="_blank"
          rel="noreferrer"
        >
          Адаптивный сайт
        </a>
      </li>
      <li>
        <a
          className="animation portfolio__item"
          href="https://melodyn.github.io/react-mesto-auth/"
          target="_blank"
          rel="noreferrer"
        >
          Одностраничное приложение
        </a>
      </li>
    </ul>
  </section>
);
