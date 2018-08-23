import * as React from 'react';
import { iSound } from '../Sound/Sound';
import config from '../../config';
import { analyzeCode } from '../../managers/code/analyzeCode';


export interface iControl {
    key: string,
    value: any
}

export interface iSoundControls {
    soundId: string
    vars: iControl[]
}

interface Props {
    sound: iSound
    onUpdate: Function
}

interface State {

}

export default class Controls extends React.Component<Props,State> {

    constructor(props){
        super(props)
        this.state = {
        }
        
    }

    componentDidMount () {
    }

    componentWillUnmount () {
    }

    componentDidUpdate () {
        config.debug.controls && console.log(`[CONTROLS] updated with sound ${this.props.sound.name}`)
        this.getVarsFromCode(this.props.sound.code)
    }

    getVarsFromCode = (code:string) => {
        console.log('getVarsFromCode')
        analyzeCode(code)
    }
    
    render() {
        return (
            <div>
                controls
            </div>
        )
    }   
}
