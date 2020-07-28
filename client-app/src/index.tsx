import React from 'react';
import ReactDOM from 'react-dom';
import App from './layout/App';
import { BrowserRouter } from 'react-router-dom';
import ScrolltoTop from './layout/ScrolltoTop';

ReactDOM.render(
  <BrowserRouter>
    <ScrolltoTop>
      <App />
    </ScrolltoTop>
  </BrowserRouter>,

  document.getElementById('root')
);
