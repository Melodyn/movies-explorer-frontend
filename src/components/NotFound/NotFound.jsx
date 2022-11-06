import './NotFound.css';
import {
  useNavigate,
} from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <article className="not-found">
      <section className="not-found__content">
        <h1 className="not-found__header">404</h1>
        <p className="not-found__text">Страница не страница</p>
      </section>
      <button
        type="button"
        className="button button_bg_light not-found__button"
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
    </article>
  );
};