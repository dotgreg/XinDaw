import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { BrowserRouter, Router, Route, hashHistory } from 'react-router-dom'

import App from '/imports/client/App.jsx';
// require('/imports/client/router/index.jsx');

const AppWrapper = () => (
  <BrowserRouter>
    <Route path="/" component={App}/>
  </BrowserRouter>
)

Meteor.startup(() => {
  render(<AppWrapper />, document.getElementById('render-target'));
});
