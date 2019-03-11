import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/auth/navbar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="">
            <BrowserRouter>
              <Navbar/>
            </BrowserRouter>
        </header>
      </div>
    );
  }
}

export default App;
