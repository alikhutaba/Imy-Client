import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";

import store from './Redux/store';
import { Provider } from 'react-redux';

// core components
import App from "./App";

import "assets/css/material-dashboard-react.css?v=1.9.0";

const hist = createBrowserHistory();

ReactDOM.render(


  <Router history={hist}>
    <Provider store={store}>
      <App></App>
    </Provider>
  </Router>,

  document.getElementById("root")
);
