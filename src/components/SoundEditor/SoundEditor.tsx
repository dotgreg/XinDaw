import * as React from 'react';
import {random} from 'lodash'
import config from '../../config';
import { iSound } from '../Sound/Sound';
import CodeEditor from '../CodeEditor/CodeEditor';

interface Props {
    sound:iSound | undefined
    onCreate: Function
    onUpdate: Function
}

interface State {
    sound: iSound
    mode: string
}

export default class SoundEditor extends React.Component<Props,State> {

    constructor(props){
        super(props)
        this.state = {
            sound: this.generateNewSound(),
            mode: 'create'
        }
    }

    /////////////////////////////////
    // EVENTS
    /////////////////////////////////

    componentDidUpdate(prevProps) {
        if (!this.props.sound && this.state.mode !== 'create') {
            this.setState({
                sound: this.generateNewSound(),
                mode: 'create'
            })
        }

        if (
            this.props.sound && 
            this.props.sound !== prevProps.sound
        ) {
            this.setState({
                sound: this.props.sound,
                mode: 'update'
            })
        }

    }

    saveForm = (newCode) => {
        let sound = this.state.sound
        sound.code = newCode

        if (this.state.mode === 'create') this.props.onCreate(sound)
        if (this.state.mode === 'update') this.props.onUpdate(sound)

        this.setState({mode: 'update'})
    }

    // /////////////////////////////////
    // // ACTIONS
    // /////////////////////////////////

    // createSound = (sound:iSound) => {
    //     let sounds = this.state.sounds
    //     sounds.push(sound)
    //     this.props.onUpdate(sounds)
    // }

    // updateSound = (sound:iSound) => {
    //     let i = this.getSoundIndexFromId(sound.id)
    //     let sounds = this.state.sounds
    //     if (!isNumber(i)) return console.warn(`[SOUNDS CRUD] updating sound id ${sound.id} does not exists`, sounds)
    //     sounds[i] = sound
    //     config.debug.soundsCrud && console.log(`[SOUNDS CRUD] updating sound ${sounds[i].name} :`, sounds)
    //     this.props.onUpdate(sounds)
    // }


    /////////////////////////////////
    // ACTIONS
    /////////////////////////////////

    // UPDATERS
    
    updateName = (ev:any) => {
        let sound = this.state.sound
        sound.name = ev.target.value
        this.setState({sound:sound})
    }

    // CREATOR
    generateNewSound = () => ({
        id: random(0,1000000).toString(),
        name: '',
        code: `// new code here`,
        edited: true
    })

    render() {
        return (
            <div>
                <div>sound form</div>

                <input type="text" value={this.state.sound.name} onChange={this.updateName}/>

                <CodeEditor
                    onSave={this.saveForm}
                    code={this.state.sound.code}
                />

            </div>
        )
    }   
}