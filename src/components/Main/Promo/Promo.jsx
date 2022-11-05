import './Promo.css';

export const Promo = ({ onClickAuth }) => (
  <article className="article promo">
    <div className="promo__container">
      <h1 className="promo__text">
        Присаживайся у лампы и да настанет время мемных историй!
        <br />
        <button
          type="button"
          className="button button_bg_gray promo__button promo__button_type_button"
          onClick={onClickAuth}
        >
          &#127770;
        </button>
      </h1>
      <div className="promo__buttons">
        <a
          href="#about-project"
          className="button button_bg_gray promo__button"
        >
          <span className="promo__button-text">О проекте</span>
        </a>
        <a
          href="#techs"
          className="button button_bg_gray promo__button"
        >
          <span className="promo__button-text">Технологии</span>
        </a>
        <a
          href="#about-me"
          className="button button_bg_gray promo__button"
        >
          <span className="promo__button-text">Автор</span>
        </a>
      </div>
    </div>
  </article>
);
