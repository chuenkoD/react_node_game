import './App.css';
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Yarik from './components/Yarik/yarik';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Yarik />} />
            <Route path="/yarik" element={<Yarik />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
