import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router-dom'
import React from 'react';

import Editor from '../components/Editor.jsx';
import Test1Music from '../components/Test1music.jsx';
import Test2Music from '../components/Test2music.jsx';
import Test3Music from '../components/test3music/Index.jsx';

export default class RouterWrapper extends React.Component {

  constructor(props){
    super(props)
  }

	render() {
		return (
      <div className="routes">
        <Route path="/test3music" component={Test3Music} />
        <Route path="/test2music" component={Test2Music} />
        <Route path="/test1music" component={Test1Music} />
        <Route path="/editor" component={Editor} />
      </div>
    )
  }
}
