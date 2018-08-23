import * as React from 'react';
import config from '../../config';
import { areSame } from '../../helpers/areSame';
import { prepareCode } from '../../managers/code/prepareCode';
import { evalCode } from '../../managers/code/evalCode';
import { startSound } from '../../managers/tone/startSound';
import { stopSound } from '../../managers/tone/stopSound';
import { SoundTone } from '../../Objects/SoundTone';

export interface iSound {
    id: string
    name: string
    code: string
    edited: boolean
  }

interface Props {
    sound: iSound,
    onDelete: Function
    onEdit:Function
    playable?:Boolean
    onAddCurrentPart?: Function
}

interface State {
    playStatus: string
}



export default class Sound extends React.Component<Props,State> {

    soundHist:iSound
    soundTone:SoundTone

    constructor(props){
        super(props)
        this.state = {
            playStatus: 'stopped',
        }
    }

    componentDidMount () {
        config.debug.sound && console.log(`[SOUND] new sound ${this.props.sound.name} mounted`)
        this.soundHist = Object.assign({}, this.props.sound)

        this.soundTone = new SoundTone(this.props.sound.code)
    }

    componentWillUnmount () {
        config.debug.sound && console.log(`[SOUND] ${this.props.sound.name} will unmount`)
        this.stop()
    }

    componentDidUpdate () {
        // if code updated
        // console.log(this.props.sound, this.soundHist, areSame(this.props.sound, this.soundHist))
        if (areSame(this.props.sound, this.soundHist)) return
        
        config.debug.sound && console.log(`[SOUND] sound ${this.props.sound.name} updated`)
        
        if (this.props.sound.code !== this.soundHist.code) {
            config.debug.sound && console.log(`[SOUND] sound CODE ${this.props.sound.name} updated`)

            this.soundTone.destroy()
            this.soundTone = new SoundTone(this.props.sound.code)
        } 

        this.soundHist = Object.assign({}, this.props.sound)
    }

    //
    // TONE RELATED CODE
    //
    play = () => {
        this.soundTone.play()
        this.setState({playStatus: 'playing'})
    }
    pause = () => {
        this.soundTone.pause()
        this.setState({playStatus: 'paused'})
    }
    togglePlay = () => {
        this.state.playStatus === 'paused' ? this.play() : this.pause()
    }
    stop = () => {
        this.soundTone.destroy()
        this.setState({playStatus: 'stopped'})
    }
    

    render() {
        return (
            <div>
                <span onClick={() => {this.props.onEdit(this.props.sound)}}> {this.props.sound.name} </span>
                {this.props.onAddCurrentPart && (<button onClick={() => {(this.props.onAddCurrentPart as Function)(this.props.sound)}}>P</button>)} 
                {
                    this.props.playable && (
                        <button onClick={() => {this.togglePlay()}}>
                            {this.state.playStatus === 'playing' ? '||' : '>'}
                        </button>
                    )
                } 
                <button onClick={() => {this.props.onDelete(this.props.sound)}}>X</button>
            </div>
        )
    }   
}
