import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Navbar} from 'reactstrap';
import Menu from './components/MenuComponent';
import {DISHES} from "./shared/dishes";

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          dishes: DISHES
      };
  }
  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <Navbar href='/'>Ristorante Con Fusion</Navbar>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes}/>
      </div>
    );
  }
}

export default App;
