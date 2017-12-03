import React from 'react';

import Hammer from 'react-hammerjs';
import { clamp } from 'lodash';

require('./knob.sass')

export default class Knob extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      startingVal: 0,
      val: props.val,
      currentPercentage: 0
    }
  }

  componentDidMount () {
    this.updateCurrentPercentage()
  }


  componentWillUpdate (nextProps, nextState) {
    nextState.variable = nextProps.variable
  }

  updateKnob

  //
  // UX : touch management
  //

  handlePan = e => {
    let variator = (this.props.max / 200) * e.deltaY
    this.state.val =  clamp(parseInt(Math.round(this.state.startingVal + variator)), this.props.min, this.props.max)

    this.refs.input.value = Math.round(this.state.val)

    this.changeValue()
  }

  handlePanStart = e => {
    this.setState({startingVal: this.state.val})
  }

  modifyValueByInput = e => {
    this.state.val = parseInt(e.target.value)

    this.changeValue()
  }

  // UI

  updateCurrentPercentage = () => {
    let aPercent = ( this.props.max - this.props.min ) / 100
    let currentRelativePosition = this.state.val - this.props.min
    let currentPercentage = currentRelativePosition / aPercent

    this.setState({currentPercentage: currentPercentage})

    console.log(this.state.val, aPercent, currentRelativePosition, currentPercentage)
  }

  //
  // DATA FLOW
  //

  changeValue = value => {
    this.updateCurrentPercentage()
    this.props.onValueChange(this.state.val)
  }

	render() {
		return (
      <div className="component-knob">
        <Hammer
          onPan={this.handlePan}
          onPanStart={this.handlePanStart}
          direction="DIRECTION_VERTICAL"
          options={this.state.hammerOptions}>
          <div>
            <div className="name"> {this.props.name} </div>
            <div className="knob" style={{transform: `rotate(${(this.state.currentPercentage * 3.60)}deg)`}}>
            </div>
            <input
              className="number"
              type="number"
              min={this.props.min}
              max={this.props.max}
              ref="input"
              defaultValue={Math.round(this.state.val)}
              onChange={this.modifyValueByInput} />
          </div>
        </Hammer>
      </div>
    )
  }
}
