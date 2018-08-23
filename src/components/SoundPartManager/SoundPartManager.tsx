import * as React from 'react';
import { iPart } from '../Part/Part';
import Sound, { iSound } from '../Sound/Sound';
import { filter } from 'lodash'
import { iSoundControls } from '../Controls/Controls';

interface Props {
    part: iPart[]
    sounds: iSound[]
    controls: iSoundControls[]
    onUpdate: Function
    onTriggerSoundEdit: Function
    onRemoveSound: Function
}

interface State {
    sounds: iSound[]
}

export default class SoundPartManager extends React.Component<Props,State> {
    render() {
        return (
            <div className="sounds" >
                <h3>Part Sounds Manager</h3>
                <div className="sounds" >
                    <h3> Sounds </h3>
                    <ul>
                        {
                            this.props.sounds.map((sound,i) => (
                                <Sound 
                                    key={i} 
                                    sound={sound}
                                    playable={true}
                                    onEdit={this.props.onTriggerSoundEdit}
                                    onDelete={this.props.onRemoveSound}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }   
}