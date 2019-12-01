import React from 'react';
import { Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import MainPage from './components/main-page';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/home" component={MainPage} />
      </Switch>
    </div>
  );
}

export default App;
