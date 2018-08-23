import * as React from 'react';
import config from '../../config';
import { areSame } from '../../helpers/areSame';
import { SoundTone } from '../../Objects/SoundTone';

interface Props {

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
    }
    
    render() {
        return (
            <div>
                controls
            </div>
        )
    }   
}
