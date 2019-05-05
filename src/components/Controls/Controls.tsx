import * as React from 'react';
import config from 'src/config';
import { analyzeCode } from 'src/managers/code/analyzeCode';
import { arrayWithUpdatedValue } from 'src/helpers/arrayHelper';
import { ComponentPropsListener } from 'src/Objects/ComponentPropsListener';
import { iControlVar, iSoundControls } from 'src/managers/types/control.type';
import { iComponentEvent } from 'src/managers/types/componentEvent.type';
import Knob from 'src/components/Knob/Knob';

interface Props {
    soundId: string
    code: string
    onUpdate: Function
    eventIn: iComponentEvent
}

interface State {
    controlVars: iControlVar[],
    initSoundControls: boolean
}

export default class Controls extends React.Component<Props,State> {
    
    propsListener: ComponentPropsListener

    constructor(props){
        super(props)
        this.state = {
            controlVars:[],
            initSoundControls: true
        }

        this.propsListener = new ComponentPropsListener()
        this.propsListener.add('eventIn', this.onEventInUpdate )
        this.propsListener.add('code', this.onCodeUpdate)
        this.propsListener.add('soundId', ()=>{this.setState({initSoundControls: true})})
    }

    componentDidUpdate = () => {
        this.propsListener.listen(this.props) 
    }

    onCodeUpdate = () => {
        let controls = analyzeCode(this.props.code).controls
        config.debug.controls && console.log(`[CONTROLS] updated with sound ${this.props.soundId}`)
        this.setState({controlVars: controls})
    }
    
    onEventInUpdate = () => {
        // only updating after initSoundsControls is false
        if (this.state.initSoundControls) return this.setState({initSoundControls: false})
        let controls = this.state.controlVars

        let knobIndex = 0
        let knob = this.refs[`knob-${knobIndex}`] as Knob

        if (controls && controls[knobIndex] && knob) {
            knob.modifyValue(this.props.eventIn.value)
        }
    }


    changeKnobValue = (id:string, value:number) => {
        this.setState({controlVars: arrayWithUpdatedValue(value, id, this.state.controlVars)})
        let res:iSoundControls = {id: this.props.soundId, controls: this.state.controlVars}
        this.props.onUpdate(res)
    }
    
    render() {
        return (
            <div>
                {
                    this.state.controlVars.map( (control,i) => (
                        <div key={i}>
                            <Knob
                                ref={`knob-${i}`}
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
            </div>
        )
    }   
}