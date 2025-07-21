import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import PlaygroundRulesView from './playground';
import GuestsView from './guests';
import './index.css';

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