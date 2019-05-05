import * as React from 'react';
import Hammer from 'react-hammerjs';
import { clamp, round, throttle } from 'lodash';
import styled from 'react-emotion'
import { Input } from 'src/styles/components';

interface Props {
  id:string
  name:string
  val:number
  min:number
  max:number
  step:number
  initVal:number
  onValueChange:Function
}

interface State {
  startingVal: number,
  val: number,
  currentPercentage: number,
  precision: number
  hammerOptions: any
}

export default class Knob extends React.Component<Props, State> {

  currentPercentage:number = 0

  constructor(props){
    super(props)

    let decimals = (this.props.step + "").split(".")[1]
    let precision = decimals ? decimals.length : 0
    let val = props.initVal ? props.initVal : props.val

    this.state = {
      startingVal: 0,
      val: val,
      currentPercentage: 0,
      precision: precision,
      hammerOptions: {}
    }
  }

  componentDidMount () {
    this.updateCurrentPercentage()
  }

  componentDidUpdate (prevProps) {
    // from hardware
    if (prevProps.val !== this.props.val) {
      this.setState({val: this.props.val})
      this.updateCurrentPercentage()
    }
  }

  //
  // UX : touch management
  //

  throttleHandlePan = throttle(e => { this.handlePan(e) }, 200)

  handlePan = e => {
    e.preventDefault()
    let variator = (this.props.max / 200) * e.deltaY

    let panValue = clamp(round(this.state.startingVal + variator, this.state.precision), this.props.min, this.props.max)
    this.setState({val: panValue}) 

    // @ts-ignore
    this.refs.input.value = round(panValue, this.state.precision)

    this.triggerUpdateOnValueChange()
  }

  handlePanStart = e => {
    e.preventDefault()
    this.setState({startingVal: this.state.val})
  }

  modifyValueByInput = e => {
    this.setState({val: parseFloat(e.target.value)}) 
    this.triggerUpdateOnValueChange()
  }
 
  modifyValue = (newKnobValue:number) => {
    this.setState({val: newKnobValue}) 
    this.triggerUpdateOnValueChange()
  }

  // UI

  updateCurrentPercentage = () => {
    let aPercent = ( this.props.max - this.props.min ) / 100
    let currentRelativePosition = this.state.val - this.props.min
    let currentPercentage = currentRelativePosition / aPercent

    this.currentPercentage = currentPercentage
  }

  //
  // DATA FLOW
  //

  triggerUpdateOnValueChange = () => {
    this.props.onValueChange(this.props.id, this.state.val)
    this.updateCurrentPercentage()
  }

	render() {
		return (
      <StyledKnob>
        <Hammer
          onPan={this.handlePan}
          onPanStart={this.handlePanStart}
          direction="DIRECTION_VERTICAL"
          options={this.state.hammerOptions}>
          <div>
            <div className="name"> {this.props.name} </div>
            <div className="knob" style={{transform: `rotate(${(this.currentPercentage * 3.60)}deg)`}}>
            </div>
            <Input
              className="number"
              type="number"
              min={this.props.min}
              max={this.props.max}
              step={this.props.step}
              ref="input"
              value={round(this.state.val, this.state.precision)}
              onChange={this.modifyValueByInput} />
          </div>
        </Hammer>
      </StyledKnob>
    )
  }
}

let StyledKnob = styled('div')`
    width: 50px;
    float: left;
    padding: 5px;
    font-size: 12px;

  .name {
    text-align: center;
    margin-bottom: 3px;
  }

  .knob {
    margin: 0 auto 3px auto;
    width: 30px;
    height: 30px;
    background-image: url(${require('./assets/knob.png')});
    background-size: contain;
    background-repeat: none;
  }

  input.number {
    border: none;
    background: none;
    text-align: center;
    width: 60px;
    font-size: 12px;
  }
`
