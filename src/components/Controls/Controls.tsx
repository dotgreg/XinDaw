import * as React from 'react';
import config from '../../config';
import { analyzeCode } from '../../managers/code/analyzeCode';
import { areSame } from '../../helpers/areSame';
import Knob from '../Knob/Knob';
import { arrayWithUpdatedValue } from '../../helpers/arrayHelper';
import styled from 'styled-components';
import { iComponentEvent } from '../../App';
import { ComponentPropsListener } from '../../Objects/ComponentPropsListener';

export interface iSoundControls {
    id: string
    controls: iControlVar[]
}

export interface iControlVar {
    id: string
    name: string
    target: any
    value: number
    min: number
    max: number
    step: number
}

interface Props {
    soundId: string
    code: string
    onUpdate: Function
    eventIn: iComponentEvent
}

interface State {
    controlVars: iControlVar[]
}

export default class Controls extends React.Component<Props,State> {
    
    propsListener: ComponentPropsListener

    constructor(props){
        super(props)
        this.state = {
            controlVars:[]
        }

        this.propsListener = new ComponentPropsListener()
        this.propsListener.add('eventIn', this.onEventInChange)
        this.propsListener.add('code', this.onCodeChange)
    }

    componentDidUpdate = () => { this.propsListener.listen(this.props) }

    onEventInChange = () => {
        let newVars = this.state.controlVars
        if (newVars && newVars[0]) newVars[0].value = this.props.eventIn.value
        this.setState({controlVars: newVars})
    }
    onCodeChange = () => {
        config.debug.controls && console.log(`[CONTROLS] updated with sound ${this.props.soundId}`)
        this.setState({controlVars: analyzeCode(this.props.code).controls})
    }


    changeKnobValue = (id:string, value:number) => {
        this.setState({controlVars: arrayWithUpdatedValue(value, id, this.state.controlVars)})
        let res:iSoundControls = {id: this.props.soundId, controls: this.state.controlVars}
        this.props.onUpdate(res)
    }
    
    render() {
        return (
            <StyledControls>
                {
                    this.state.controlVars.map( (control,index) => (
                        <div key={index}>
                            <Knob
                                id={control.id}
                                name={control.name}
                                val={control.value}
                                min={control.min}
                                max={control.max}
                                step={control.step}
                                initVal={control.value}
                                onValueChange={this.changeKnobValue} />
                        </div>
                    ))
                }
                <div style={{clear: 'both'}}></div>
            </StyledControls>
        )
    }   
}

const StyledControls = styled.div`
`