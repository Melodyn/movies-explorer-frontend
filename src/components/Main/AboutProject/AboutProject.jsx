import './AboutProject.css';

export const AboutProject = () => (
  <article className="article about-project">
    <h2 className="article__header" id="about-project">О проекте</h2>
    <section className="two-columns about-project__columns">
      <div className="two-columns__column about-project__column">
        <h2 className="about-project__subheader">Только смешные видосы</h2>
        <p className="about-project__text">Никакой политоты, распаковок и обучения. Только веселье и котики. Это вам не тупой тик-ток, это нормальная деградация.</p>
      </div>
      <div className="two-columns__column about-project__column">
        <h2 className="about-project__subheader">Меместо твоего сердечка</h2>
        <p className="about-project__text">Смотри и сохраняй в режиме инкогнито приколы, которые стыдно показать другим. Тебя никто не осудит</p>
      </div>
    </section>
    <div className="project-progress">
      <div className="project-progress__cell project-progress__cell_color_green">
        <span className="project-progress__text">1 шаг</span>
      </div>
      <div className="project-progress__cell project-progress__cell_color_gray">
        <span className="project-progress__text">4 шага</span>
      </div>
      <div className="project-progress__cell project-progress__cell_color_transparent">
        <span className="project-progress__text">Регистрация</span>
      </div>
      <div className="project-progress__cell project-progress__cell_color_transparent">
        <span className="project-progress__text">До угара</span>
      </div>
    </div>
  </article>
);
