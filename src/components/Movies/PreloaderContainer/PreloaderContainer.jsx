import './PreloaderContainer.css';
import { Preloader } from '../Preloader/Preloader';

export const PreloaderContainer = () => (
  <div className="preloader-container">
    <Preloader />
    <p className="preloader-container__load-info">Загрузка...</p>
  </div>
);
