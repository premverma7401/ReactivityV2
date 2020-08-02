import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'react-toastify/dist/ReactToastify.min.css';
import App from './layout/App';
import ScrolltoTop from './layout/ScrolltoTop';

export const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <ScrolltoTop>
      <App />
    </ScrolltoTop>
  </Router>,

  document.getElementById('root')
);
