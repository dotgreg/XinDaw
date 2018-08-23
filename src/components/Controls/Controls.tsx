import * as React from 'react';
import config from '../../config';
import { analyzeCode } from '../../managers/code/analyzeCode';
import { areSame } from '../../helpers/areSame';
import Knob from '../Knob/Knob';
import { getItemFromName, arrayWithUpdatedItemFromId, arrayWithUpdatedControlValue } from '../../helpers/arrayHelper';
import styled from 'styled-components';

export interface iControlVar {
    id: string
    name: string
    value: number
    min: number
    max: number
    step: number
}

export interface iSoundControls {
    soundId: string
    vars: iControlVar[]
}

interface Props {
    soundId: string
    code: string
    onUpdate: Function
}

interface State {
    controlVars: iControlVar[]
}

export default class Controls extends React.Component<Props,State> {

    constructor(props){
        super(props)
        this.state = {
            controlVars:[]
        }
    }

    componentDidMount () {
    }

    componentWillUnmount () {
    }

    componentDidUpdate = (prevProps:any) => {
        if (areSame(prevProps, this.props)) return

        config.debug.controls && console.log(`[CONTROLS] updated with sound ${this.props.soundId}`)
        this.setState({controlVars: analyzeCode(this.props.code).controls})
    }

    changeKnobValue = (id:string, value:number) => {
        this.setState({controlVars: arrayWithUpdatedControlValue(value, id, this.state.controlVars)})
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