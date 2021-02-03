import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes';
import Menu from './components/menu'

function App() {
  return (
    <div className="App">
      <Router>
        <Menu />
        <Routes /> 
      </Router>
    </div>
  );
}

export default App;
