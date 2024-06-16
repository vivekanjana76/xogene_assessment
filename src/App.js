// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/SearchDrugs';
import DrugDetails from './components/DrugDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/drugs/:name" element={<DrugDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
