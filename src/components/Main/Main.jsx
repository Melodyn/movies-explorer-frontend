import './Main.css';
import { Promo } from './Promo/Promo';
import { AboutProject } from './AboutProject/AboutProject';
import { Techs } from './Techs/Techs';

export const Main = ({ onClickAuth }) => (
  <main className="main">
    <Promo onClickAuth={onClickAuth} />
    <AboutProject />
    <Techs />
  </main>
);
