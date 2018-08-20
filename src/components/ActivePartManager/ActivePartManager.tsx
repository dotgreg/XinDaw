import * as React from 'react';
import { iPart } from '../Part/Part';
import Sound, { iSound } from '../Sound/Sound';
import { filter } from 'lodash'

interface Props {
    parts: iPart[],
    sounds: iSound[]
    onUpdate: Function
    onSoundEdit: Function
}

interface State {
    soundsPart: iSound[]
}

export default class ActivePartManager extends React.Component<Props,State> {

    constructor(props) {
        super(props)
        this.state = {
            soundsPart: []
        }
    }

    componentDidUpdate() {
        
    }

    getActivePart = () => {
        let activePart = filter(this.props.parts, part => part.active === true)
        if (activePart[0]) return activePart[0]
        else return this.props.parts[0]
    }

    removeSound = () => {

    }

    render() {
        return (
            <div className="sounds" >
                <h3>Part Sounds Manager</h3>
                <div className="sounds" >
                    <h3> Sounds </h3>
                    <ul>
                    {
                            this.state.soundsPart.map((sound,i) => (
                                <Sound 
                                    key={i} 
                                    sound={sound}
                                    onEdit={this.props.onSoundEdit}
                                    onDelete={this.removeSound}
                                />
                            ))
                        }
                        
                    </ul>
                </div>
            </div>
        )
    }   
}