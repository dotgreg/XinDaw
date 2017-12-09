import React from 'react';

import Hammer from 'react-hammerjs';
import { clamp, round, throttle, debounce } from 'lodash';

require('./knob.sass')

export default class Knob extends React.Component {

  constructor(props){
    super(props)

    let decimals = (this.props.step + "").split(".")[1]
    let precision = decimals ? decimals.length : 0

    let val = props.initVal ? props.initVal : props.val

    this.state = {
      startingVal: 0,
      val: val,
      currentPercentage: 0,
      precision: precision
    }
  }

  componentDidMount () {
    this.updateCurrentPercentage()
  }


  componentWillUpdate (nextProps, nextState) {
    // console.log('componentWillUpdate', nextProps, nextState)
    nextState.variable = nextProps.variable
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   // return false;
  // }

  //
  // UX : touch management
  //

  throttleHandlePan = throttle(e => { this.handlePan(e) }, 100)

  handlePan = e => {
    console.log('handlePan')
    e.preventDefault()
    let variator = (this.props.max / 200) * e.deltaY

    this.state.val =  clamp(parseFloat(round(this.state.startingVal + variator, this.state.precision)), this.props.min, this.props.max)

    this.refs.input.value = round(this.state.val, this.state.precision)

    this.changeValue()
  }

  handlePanStart = e => {
    console.log('handlePanStart')
    e.preventDefault()
    this.setState({startingVal: this.state.val})
  }

  modifyValueByInput = e => {
    this.state.val = parseFloat(e.target.value)

    this.changeValue()
  }

  // UI

  updateCurrentPercentage = () => {
    let aPercent = ( this.props.max - this.props.min ) / 100
    let currentRelativePosition = this.state.val - this.props.min
    let currentPercentage = currentRelativePosition / aPercent

    this.setState({currentPercentage: currentPercentage})
  }

  //
  // DATA FLOW
  //

  changeValue = () => {
    this.updateCurrentPercentage()
    this.props.onValueChange(this.state.val)
  }

  // throttleChangeValue = throttle(() => {
  //   this.updateCurrentPercentage()
  //   this.props.onValueChange(this.state.val)
  // }, 50)

	render() {
		return (
      <div className="component-knob">
        <Hammer
          onPan={this.throttleHandlePan}
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
              step={this.props.step}
              ref="input"
              defaultValue={round(this.state.val, this.state.precision)}
              onChange={this.modifyValueByInput} />
          </div>
        </Hammer>
      </div>
    )
  }
}
