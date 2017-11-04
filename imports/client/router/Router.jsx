import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router-dom'
import React from 'react';

import Editor from '../components/old/Editor.jsx';
import Test1Music from '../components/old/Test1music.jsx';
import Test2Music from '../components/old/Test2music.jsx';
import Xindaw from '../components/xindaw/Index.jsx';

export default class RouterWrapper extends React.Component {

  constructor(props){
    super(props)
  }

	render() {
		return (
      <div className="routes">
        <Route path="/" component={Xindaw} />
        <Route path="/xindaw" component={Xindaw} />
        <Route path="/test2music" component={Test2Music} />
        <Route path="/test1music" component={Test1Music} />
        <Route path="/editor" component={Editor} />
      </div>
    )
  }
}
