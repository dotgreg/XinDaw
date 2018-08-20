import * as React from 'react';
import { iPart } from '../Part/Part';
import Sound, { iSound } from '../Sound/Sound';
import { filter } from 'lodash'

interface Props {
    part: iPart[],
    sounds: iSound[]
    onUpdate: Function
    onSoundEdit: Function
    onRemoveCurrentPart: Function
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
                                    onEdit={this.props.onSoundEdit}
                                    onDelete={this.props.onRemoveCurrentPart}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }   
}