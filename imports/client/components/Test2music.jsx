import React from 'react';
import Tone from 'tone';

export default class Test2Music extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      code: "// Code",
      old: false,
    }
  }

  componentDidMount () {
  }

	render() {

		return (
      <div className="test2Music">test2Music </div>
    )
  }
}
