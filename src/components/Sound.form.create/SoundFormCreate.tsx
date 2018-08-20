import * as React from 'react';
import {random} from 'lodash'
import config from '../../config';

interface Props {
    onCreate:Function
}

interface State {
    name: string
}

export default class SoundFormCreate extends React.Component<Props,State> {

    constructor(props){
        super(props)
        this.state = {
            name: ''
        }
    }

    updateName = (ev:any) => this.setState({name: ev.target.value})

    createSound = () => {
        let newSound = {
            id: random(0,1000000),
            name: this.state.name
        }
        config.debug.soundsCrud && console.log('[SOUNDS CRUD] sound create ', newSound)
        this.props.onCreate(newSound)
    }

    render() {
        return (
            <div>
                <div>create sound</div>
                <input type="text" onChange={this.updateName}/>
                <input type="submit" value="create" onClick={this.createSound}/>
            </div>
        )
    }   
}
