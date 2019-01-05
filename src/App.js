import React, { Component } from 'react';
import './App.css';
import HomeController from './HomeController'
import 'moment/locale/sv';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeController/>
      </div>
    );
  }
}

export default App;
