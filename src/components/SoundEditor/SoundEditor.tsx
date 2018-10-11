import * as React from 'react';
import {random} from 'lodash'
import { iSound } from 'src/managers/types/sound.type';
import CodeEditor from 'src/components/CodeEditor/CodeEditor';
import { Input } from 'src/styles/components';
import styled from 'react-emotion';

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
            <Styled>
                <div className="title-input">
                    <label>
                        title:
                        <Input type="text" value={this.state.sound.name} onChange={this.updateName}/>
                    </label>
                </div>

                <CodeEditor
                    onSave={this.saveForm}
                    code={this.state.sound.code}
                />

            </Styled>
        )
    }   
}

const Styled = styled('div')`
    .title-input {
        margin-bottom: 20px;
    }
`