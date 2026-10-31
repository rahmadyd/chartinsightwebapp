import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CasePage from './pages/CasePage';
import GlossaryPage from './pages/GlossaryPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/case/:id" element={<CasePage />} />
        <Route path="/glossary" element={<GlossaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}
