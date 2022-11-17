import './Main.css';
import { Promo } from './Promo/Promo';
import { AboutProject } from './AboutProject/AboutProject';
import { Techs } from './Techs/Techs';
import { AboutMe } from './AboutMe/AboutMe';

export const Main = ({ onClickAuth }) => (
  <main className="main">
    <Promo onClickAuth={onClickAuth} />
    <AboutProject />
    <Techs />
    <AboutMe />
  </main>
);
