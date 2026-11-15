import React from 'react';
import ReactDOM from 'react-dom/client';
import './lib/icons';
import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk';
import App from './App.jsx';
import './styles/main.scss';

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Pages are prerendered at build time, so hydrate when markup is present; fall back to a fresh render (dev).
if (root.hasChildNodes()) ReactDOM.hydrateRoot(root, app);
else ReactDOM.createRoot(root).render(app);
