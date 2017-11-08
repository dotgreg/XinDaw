import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router-dom'
import React from 'react';

import MainScreen from '../components/xindaw/screens/Main';
import MixerScreen from '../components/xindaw/screens/Mixer';

export default class RouterWrapper extends React.Component {

  constructor(props){
    super(props)
  }

	render() {
		return (
      <div className="routes">
        <Route path="/main" component={MainScreen} />
        <Route path="/mixer" component={MixerScreen} />
      </div>
    )
  }
}
