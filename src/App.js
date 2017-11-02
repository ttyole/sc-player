import React, { Component } from 'react';
import './App.css';
import PlayerBox from './playerBox/PlayerBox.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <PlayerBox />
      </div>
    );
  }
}

export default App;
