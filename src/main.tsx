import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import PlaygroundRulesView from './playground';
import GuestsView from './guests';
import './index.css';

const redirectPath = sessionStorage.redirect;
if (redirectPath) {
  sessionStorage.removeItem('redirect');
  window.history.replaceState(null, '', redirectPath);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/playground" element={<PlaygroundRulesView />} />
        <Route path="/guests" element={<GuestsView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
