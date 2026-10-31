import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import CasePage from './pages/CasePage';
import GlossaryPage from './pages/GlossaryPage';
import InputMode from './pages/InputMode';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case/:id" element={<CasePage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/input" element={<InputMode />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
