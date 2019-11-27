import React from "react";
import ReactDOM from "react-dom";
import { render } from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import { App } from "./App";
import * as serviceWorker from "./serviceWorker";
// import { store } from "./_helper";

// ReactDOM.render(<App />, document.getElementById("root"));
import { createStore } from "redux";
const initialState = {
  count: 0
};
function reducer(state = initialState, action) {
  console.log("reducer", state, action);
  return state;
}
const store = createStore(reducer);
store.dispatch({ type: "APP" });

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
