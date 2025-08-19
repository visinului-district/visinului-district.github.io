import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CommunityView, PlaygroundView, GuestsView, PinGeneratorView } from './views';
import { ROUTES } from './constants';
import './index.css';
import './i18n';


const redirectPath = sessionStorage.redirect;
if (redirectPath) {
  sessionStorage.removeItem('redirect');
  window.history.replaceState(null, '', redirectPath);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<CommunityView />} />
        <Route path={ROUTES.PLAYGROUND} element={<PlaygroundView />} />
        <Route path={ROUTES.GUESTS} element={<GuestsView />} />
        <Route path={ROUTES.PIN_GENERATOR} element={<PinGeneratorView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
