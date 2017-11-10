import React from 'react';
import styled from 'styled-components';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router-dom'

export default class IndexScreen extends React.Component {
  constructor(props){
    super(props)
  }

	render() {
		return (
      <div>
        <h1> Xindaw </h1>
        <ul>
          <li><Link to="/main">Main Screen</Link></li>
          <li><Link to="/mixer">Mixer Screen</Link></li>
        </ul>
      </div>
    )
  }
}
