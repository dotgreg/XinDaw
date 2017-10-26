import React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router-dom'

export default class Menu extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      code: "// Code",
      old: false,
    }
    // this.updateCode = this.updateCode.bind(this)
  }

  componentDidMount () {

  }

	render() {

		return (
      <div className="Menu">
        <h2>Menu</h2>
        <ul>
          <li><Link to="/editor">editor</Link></li>
          <li><Link to="/test1music">test1music</Link></li>
          <li><Link to="/test2music">test2music</Link></li>
          <li><Link to="/test3music">test3music</Link></li>
        </ul>
      </div>
    )
  }
}
