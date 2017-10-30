import React from 'react';
import ReactDOM from 'react-dom';

import RouterWrapper from './router/Router.jsx';
import Menu from './components/Menu.jsx';

// App component - represents the whole app
export default class App extends React.Component {
  render() {
    return (
      <div className="container">
        <RouterWrapper />
        <Menu />
      </div>
    );
  }
}
