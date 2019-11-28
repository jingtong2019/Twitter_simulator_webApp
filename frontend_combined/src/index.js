import React from 'react';
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = configureStore();

render(
    <ReduxProvider store={store}>
      <Router>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </ReduxProvider>,
    document.getElementById("root")
  );
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
