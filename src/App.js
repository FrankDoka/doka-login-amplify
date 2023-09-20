import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import PremiumPage from './pages/PremiumPage';

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <NavLink className="content"  exact activeClassName="active" to="https://frankdoka.com/">Home</NavLink>
          <NavLink className="content" activeClassName="active" to="/premium">Premium Content</NavLink>
        </div>
        <Routes>
          <Route path="/" element={<PremiumPage />}></Route>
          <Route path="/premium" element={<PremiumPage />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
