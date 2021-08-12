import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./reducers/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";

//1st argument is the reducer, takes actions and does something with the action, such as changing the state.

//STORE is a Globalised State, that holds all the information.
//ACTION describes what you want to do. (Such as Increment).
//REDUCER describes what the action will do to the state.
//DISPATCH

const store = createStore(rootReducer, composeWithDevTools());
export const getState = store.getState;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
