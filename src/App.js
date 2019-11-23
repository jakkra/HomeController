import React, { Component } from 'react';
import './App.css';
import HomeController from './HomeController';
import Snowfall  from './components/Snowfall'
import 'moment/locale/sv';

if (new Date().getHours() > 20 || new Date().getHours() < 6) {
  document.body.style = 'background: #1e1e1e;';
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeController/>
        <Snowfall/>
      </div>
    );
  }
}
export default App;
