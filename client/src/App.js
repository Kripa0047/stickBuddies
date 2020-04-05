import React from 'react';
import './App.css';
// importing main page
import MainPage from './Containers/MainPage/MainPage';
// importing files
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <MainPage />
      </HashRouter>
    </div>
  );
}

export default App;
