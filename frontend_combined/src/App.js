import React from 'react';
import { Route, Switch } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import MainPage from './components/main-page';
import BookmarkComponent from './components/bookmark';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/home" component={MainPage} />
        <Route exact path="/bookmark" component={BookmarkComponent} />
      </Switch>
    </div>
  );
}

export default App;
