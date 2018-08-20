import * as React from 'react';
import {random} from 'lodash'
import config from '../../config';
import { iSound } from '../Sound/Sound';

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
        let newSound:iSound = {
            id: random(0,1000000).toString(),
            name: this.state.name,
            code: ''
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
