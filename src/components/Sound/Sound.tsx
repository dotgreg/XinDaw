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
    onEdit:Function
}



export default class Sound extends React.PureComponent<Props,{}> {

    soundHist:iSound

    constructor(props){
        super(props)
    }

    componentDidMount () {
        config.debug.sound && console.log(`[SOUND] new sound ${this.props.sound.name} mounted`)
        this.soundHist = Object.assign({}, this.props.sound)
    }

    componentWillUnmount () {
        config.debug.sound && console.log(`[SOUND] ${this.props.sound.name} will unmount`)
    }

    componentDidUpdate () {
        // if code updated
        if (this.props.sound.code !== this.soundHist.code) {
            this.soundHist = Object.assign({}, this.props.sound)
            config.debug.sound && console.log(`[SOUND] sound ${this.props.sound.name} updated`)
        }
    }
    

    render() {
        return (
            <div>
                <span onClick={() => {this.props.onEdit(this.props.sound)}}> {this.props.sound.name} </span>
                <button onClick={() => {this.props.onDelete(this.props.sound)}}>X</button>
            </div>
        )
    }   
}