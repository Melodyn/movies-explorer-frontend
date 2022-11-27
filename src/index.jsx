import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/App/App';
import { configByEnv } from './utils/constants';

const { host } = window.location;
const env = host.includes('localhost') || host.includes('0.0.0.0')
  ? 'development'
  : 'production';
const config = configByEnv[env];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App config={config} />
    </BrowserRouter>
  </React.StrictMode>,
);
