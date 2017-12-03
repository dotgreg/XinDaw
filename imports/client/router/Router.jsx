import {Route, Switch, IndexRoute } from 'react-router-dom'
import React from 'react';

import MainScreen from '../components/xindaw/screens/Main';
import MixerScreen from '../components/xindaw/screens/Mixer';
import MixerScreen2 from '../components/xindaw/screens/Mixer2';
import IndexScreen from '../components/xindaw/screens/Index';

export default class RouterWrapper extends React.Component {

  constructor(props){
    super(props)
  }

	render() {
		return (
      <Switch>
        <Route exact path='/' component={IndexScreen}/>
        <Route path="/main" component={MainScreen} />
        <Route path="/mixer" component={MixerScreen} />
        <Route path="/mixer2" component={MixerScreen2} />
      </Switch>
    )
  }
}
