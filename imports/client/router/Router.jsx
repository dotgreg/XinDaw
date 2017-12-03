import {Route, Switch, IndexRoute } from 'react-router-dom'
import React from 'react';

import MainScreen from '/imports/client/components/screens/Main';
import MixerScreen from '/imports/client/components/screens/Mixer';
import MixerScreen2 from '/imports/client/components/screens/Mixer2';
import IndexScreen from '/imports/client/components/screens/Index';

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
