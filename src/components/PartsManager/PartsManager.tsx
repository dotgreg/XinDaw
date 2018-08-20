import * as React from 'react';
import Sound, { iSound } from '../Sound/Sound';

interface Props {
    sounds: iSound[]
}

interface State {
}

export default class PartsManager extends React.Component<Props,State> {

    constructor(props){
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div className="sounds" >
                <h3>Parts Manager</h3>
            </div>
        )
    }   
}