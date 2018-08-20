import * as React from 'react';
import config from '../../config';

export interface iSound {
    id: string
    name: string
    code: string
  }

interface Props {
    sound: iSound,
    onDelete: Function
}



export default class Sound extends React.Component<Props,{}> {

    constructor(props){
        super(props)
    }

    componentDidMount () {
        config.debug.sound && console.log(`[SOUND] new sound ${this.props.sound.name} mounted`)
    }

    componentWillUnmount () {
        config.debug.sound && console.log(`[SOUND] ${this.props.sound.name} will unmount`)
    }



    render() {
        return (
            <div>
                sound {this.props.sound.name} 
                <button onClick={() => {this.props.onDelete(this.props.sound)}}>X</button>
            </div>
        )
    }   
}
