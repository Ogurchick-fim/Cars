// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CarsPage from './pages/CarsPage';
import CarDetailsPage from './pages/CarDetailsPage';
import ComparePage from './pages/ComparePage';
import RecommendPage from './pages/RecommendPage';

const App = () => (
  <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/cars/:id" element={<CarDetailsPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/recommend" element={<RecommendPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
