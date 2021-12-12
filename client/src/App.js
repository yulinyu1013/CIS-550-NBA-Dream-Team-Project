import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Game from './components/Game';
import Player from './components/Player';
import Team from './components/Team';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/game" element={<Game />} />
          <Route exact path="/team" element={<Team />} />
          <Route exact path="/player" element={<Player />} />
        </Routes>
    </Router>
  );
}

export default App;
