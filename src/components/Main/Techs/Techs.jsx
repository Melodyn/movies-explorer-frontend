import './Techs.css';

export const Techs = () => (
  <article className="article techs">
    <h1 className="article__header" id="techs">Технологии</h1>
    <section className="techs__description">
      <h2 className="techs__header">7 технологий</h2>
      <p className="techs__text">
        Чтобы тупые шуточки оценили только умные друзья мы используем современные высокие технологии:
      </p>
    </section>
    <ul className="techs__items">
      <li className="techs__item">
        <span className="techs__item-text">блокчейн</span>
      </li>
      <li className="techs__item">
        <span className="techs__item-text">МЛ, БД</span>
      </li>
      <li className="techs__item">
        <span className="techs__item-text">вот где</span>
      </li>
      <li className="techs__item">
        <span className="techs__item-text">карту</span>
      </li>
      <li className="techs__item">
        <span className="techs__item-text">получали</span>
      </li>
      <li className="techs__item">
        <span className="techs__item-text">туда и</span>
      </li>
      <li className="techs__item">
        <span className="techs__item-text">идите</span>
      </li>
    </ul>
  </article>
);
