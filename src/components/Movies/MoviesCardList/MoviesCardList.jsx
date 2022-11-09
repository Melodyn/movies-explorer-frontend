import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import pepe from '../../../images/pepe-photo.png';
import save from '../../../images/save.svg';

const inc = (() => {
  let i = 0;
  return () => {
    i += 1;
    return i;
  };
})();

const defcards = [
  {
    id: inc(),
    name: 'Лучшие мемы 2022',
    duration: '20ч 22м',
    cover: pepe,
    saved: true,
  },
  {
    id: inc(),
    name: 'Супермегагиперпупернанодуперсверхкилотерра',
    duration: '20ч 22м',
    cover: save,
    saved: true,
  },
  {
    id: inc(),
    name: 'Лучшие мемы 2022',
    duration: '20ч 22м',
    cover: pepe,
    saved: false,
  },
  {
    id: inc(),
    name: 'Супермегагиперпупернанодуперсверхкилотерра',
    duration: '20ч 22м',
    cover: save,
    saved: true,
  },
  {
    id: inc(),
    name: 'Лучшие мемы 2022',
    duration: '20ч 22м',
    cover: pepe,
    saved: false,
  },
  {
    id: inc(),
    name: 'Супермегагиперпупернанодуперсверхкилотерра',
    duration: '20ч 22м',
    cover: save,
    saved: true,
  },
];

export const MoviesCardList = ({ cards = defcards }) => (
  <article className="article" aria-label="Все роллы">
    <ul className="cards">
      {cards.map((card) => <MoviesCard key={card.id} card={card} />)}
    </ul>
  </article>
);
