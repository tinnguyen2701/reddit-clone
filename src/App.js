import React from 'react';
import { BrowserRouter, Switch as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Theme from './Theme';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Header from './components/Header';
import './app.css';

export default () => {
  return (
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <Header />
        <Router>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Router>
      </BrowserRouter>
    </ThemeProvider>
  );
};
