import React from 'react';
import ReactDOM from 'react-dom';

// import RouterWrapper from './router/Router.jsx';
// import Menu from './components/Menu.jsx';

import { BrowserRouter, Router, Route, IndexRoute, Link, hashHistory } from 'react-router-dom'

import MainScreen from './components/xindaw/screens/Main';
import MixerScreen from './components/xindaw/screens/Mixer';
import IndexScreen from './components/xindaw/screens/Index';

// App component - represents the whole app
export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <IndexRoute component={IndexScreen} />
        <Route path="/main" component={MainScreen} />
        <Route path="/mixer" component={MixerScreen} />
      </div>
    );
  }
}
