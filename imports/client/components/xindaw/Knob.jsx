import React from 'react';

import Hammer from 'react-hammerjs';

export default class Knob extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      startingVal: 0,
      val: props.val
    }
  }

  componentWillUpdate (nextProps, nextState) {
    nextState.variable = nextProps.variable
  }

  //
  // UX : touch management
  //

  handlePan = e => {
    this.state.val =  parseInt(Math.round(this.state.startingVal + e.deltaY))
    this.refs.input.value = Math.round(this.state.val)
    this.props.onValueChange(this.state.val)
  }

  handlePanStart = e => {
    // console.log(this.state.val)
    this.setState({startingVal: this.state.val})
  }

  //
  // DATA FLOW
  //

  changeValue = e => {
    console.log(this.state.val)
    this.state.val = parseInt(e.target.value)
    this.props.onValueChange(this.state.val)
  }

	render() {
		return (
      <Hammer
        onPan={this.handlePan}
        onPanStart={this.handlePanStart}
        direction="DIRECTION_VERTICAL"
        options={this.state.hammerOptions}>
        <div>
          {this.props.name}
          <input
            type="number"
            min="-100"
            max="100"
            ref="input"
            defaultValue={Math.round(this.state.val)}
            onChange={this.changeValue} />
        </div>
      </Hammer>
    )
  }
}
