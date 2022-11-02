import './Promo.css';

export const Promo = ({ onClickAuth }) => (
  <article className="promo">
    <div className="promo__container">
      <h1 className="promo__text">
        Дипломный проект студента факультета веб-разработки
        <br />
        <button
          type="button"
          className="button button_bg_gray promo__button"
          onClick={onClickAuth}
        >
          &#127770;
        </button>
      </h1>
      <div className="promo__buttons">
        <button
          type="button"
          className="button button_bg_gray promo__button"
        >
          О проекте
        </button>
        <button
          type="button"
          className="button button_bg_gray promo__button"
        >
          Технологии
        </button>
        <button
          type="button"
          className="button button_bg_gray promo__button"
        >
          Студент
        </button>
      </div>
    </div>
  </article>
);
