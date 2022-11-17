import './Footer.css';

export const Footer = () => (
  <footer className="article footer">
    <section className="footer__container">
      <h2 className="footer__about">
        Никакие права не&nbsp;защищены, все&nbsp;обязанности&nbsp;даны
      </h2>
      <div className="footer__info">
        <span className="footer__year">
          &copy; 2022
        </span>
        <ul className="footer__links">
          <li>
            <a
              href="https://melodyn.ru"
              className="animation footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Сергей Мелодин
            </a>
          </li>
          <li>
            <a
              href="https://github.com/melodyn"
              className="animation footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </section>
  </footer>
);
