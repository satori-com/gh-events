import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css';

ReactDOM.render(
  <Router>
      <Route exact component={App} />
  </Router>,
  document.getElementById('root')
);
