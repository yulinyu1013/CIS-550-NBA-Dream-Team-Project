import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';

function App() {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          {/* <Route path="/team" exact component={Homepage} />
          <Route path="/player" exact component={Homepage} />
          <Route path="/game" exact component={Homepage} /> */}
        </Routes>
    </Router>
  );
}

export default App;
