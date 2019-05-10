import React from 'react';

import 'typeface-roboto';

import Header from './components/layout/header/index';
import './App.css';
import Routes from './routes';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes />
    </div>
  );
}

export default App;
