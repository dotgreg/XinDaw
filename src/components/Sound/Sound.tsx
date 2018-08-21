import * as React from 'react';
import config from '../../config';
import { areSame } from '../../helpers/areSame';
import { prepareCode } from '../../managers/code/prepareCode';
import { evalCode } from '../../managers/code/evalCode';

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
    toneState: string
}



export default class Sound extends React.Component<Props,State> {

    soundHist:iSound

    constructor(props){
        super(props)
        this.state = {
            toneState: 'stopped'
        }
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
        // console.log(this.props.sound, this.soundHist, areSame(this.props.sound, this.soundHist))
        if (areSame(this.props.sound, this.soundHist)) return
        
        config.debug.sound && console.log(`[SOUND] sound ${this.props.sound.name} updated`)
        
        if (this.props.sound.code !== this.soundHist.code) {
            config.debug.sound && console.log(`[SOUND] sound CODE ${this.props.sound.name} updated`)
        } 

        this.soundHist = Object.assign({}, this.props.sound)
    }

    //
    // TONE RELATED CODE
    //

    play = () => {
        this.setState({toneState: 'playing'})

        let code2 = prepareCode(this.props.sound.code)
        console.log(code2)
        let code3 = evalCode(code2)
        console.log(code3)
        // console.log(222, prepareCode(this.props.sound.code))
    }
    pause = () => {
        this.setState({toneState: 'paused'})
    }
    togglePlay = () => {
        this.state.toneState === 'paused' ? this.play() : this.pause()
    }
    stop = () => {
        this.setState({toneState: 'stopped'})
    }
    

    render() {
        return (
            <div>
                <span onClick={() => {this.props.onEdit(this.props.sound)}}> {this.props.sound.name} </span>
                {this.props.onAddCurrentPart && (<button onClick={() => {(this.props.onAddCurrentPart as Function)(this.props.sound)}}>P</button>)} 
                {
                    this.props.playable && (
                        <button onClick={() => {this.togglePlay()}}>
                            {this.state.toneState === 'playing' ? '||' : '>'}
                        </button>
                    )
                } 
                <button onClick={() => {this.props.onDelete(this.props.sound)}}>X</button>
            </div>
        )
    }   
}
