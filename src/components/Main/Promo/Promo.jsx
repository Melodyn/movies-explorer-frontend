import './Promo.css';

export const Promo = ({ onClickAuth }) => (
  <article className="article promo" aria-label="Промо-блок">
    <section className="promo__container">
      <h1 className="promo__text">
        Присаживайся у лампы и да настанет время мемных историй!
      </h1>
      <button
        type="button"
        className="button button_bg_gray promo__button promo__button_type_button"
        onClick={onClickAuth}
      >
        <span className="promo__button-text">Логин</span>
      </button>
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
    </section>
  </article>
);
