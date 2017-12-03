import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import { BrowserRouter } from 'react-router-dom'

import RouterWrapper from '/imports/client/router/Router.jsx';

const AppWrapper = () => (
  <BrowserRouter>
    <RouterWrapper />
  </BrowserRouter>
)

Meteor.startup(() => {
  render(<AppWrapper />, document.getElementById('render-target'));
});
