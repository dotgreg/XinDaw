import React from 'react';

import Hammer from 'react-hammerjs';

export default class Knob extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      startingValue: 0,
      variable: props.variable,
      hammerOptions: {},
    }
  }

  changeValue = e => {
    console.log(this.state.variable)
    this.state.variable.value = e.target.value
  }

  componentWillUpdate (nextProps, nextState) {
    nextState.variable = nextProps.variable
  }

  //
  // UX : touch management
  //

  handlePan = e => {
    this.state.variable.value =  Math.round(this.state.startingValue + e.deltaY)
    this.refs.input.value = Math.round(this.state.variable.value)
  }

  handlePanStart = e => {
    console.log(this.state.variable)
    this.setState({startingValue: this.state.variable.value})
  }

	render() {
		return (
      <Hammer
        onPan={this.handlePan}
        onPanStart={this.handlePanStart}
        direction="DIRECTION_VERTICAL"
        options={this.state.hammerOptions}>
        <div>
          {this.state.variable.name}
          <input
            type="number"
            min="-100"
            max="100"
            ref="input"
            defaultValue={Math.round(this.state.variable.value)}
            onChange={this.changeValue} />
        </div>
      </Hammer>
    )
  }
}
