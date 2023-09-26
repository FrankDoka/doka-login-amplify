import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import PremiumPage from './pages/PremiumPage';
import TextToSpeech from './pages/TextToSpeech';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <NavLink className="content"  exact activeClassName="active" to="https://frankdoka.com/">Home</NavLink>
          <NavLink className="content" activeClassName="active" to="/premium">Restricted</NavLink>
          <NavLink className="content" activeClassName="active" to="/textspeech">Text To Speech</NavLink>
        </div>
        <Routes>
          <Route path="/" element={<PremiumPage />}></Route>
          <Route path="/premium" element={<PremiumPage />}></Route>
          <Route path="/textspeech" element={<TextToSpeech />}></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
