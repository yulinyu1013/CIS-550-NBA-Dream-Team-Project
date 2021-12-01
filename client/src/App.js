import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Game from './components/Game';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/game" element={<Game />} />
        </Routes>
    </Router>
  );
}

export default App;
