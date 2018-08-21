import * as React from 'react';
import config from '../../config';
import { areSame } from '../../helpers/areSame';
import { prepareCode } from '../../managers/code/prepareCode';
import { evalCode } from '../../managers/code/evalCode';
import { startSound } from '../../managers/tone/startSound';
import { stopSound } from '../../managers/tone/stopSound';

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
    tone: any
}



export default class Sound extends React.Component<Props,State> {

    soundHist:iSound

    constructor(props){
        super(props)
        this.state = {
            toneState: 'stopped',
            tone: {}
        }
    }

    componentDidMount () {
        config.debug.sound && console.log(`[SOUND] new sound ${this.props.sound.name} mounted`)
        this.soundHist = Object.assign({}, this.props.sound)
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
        } 

        this.soundHist = Object.assign({}, this.props.sound)
    }

    //
    // TONE RELATED CODE
    //

    play = () => {
        this.setState({toneState: 'playing'})
        console.log(111)
        
        let code2 = prepareCode(this.props.sound.code)
        let result = evalCode(code2)
        
        console.log(result)
        if (result.status === 'err') return result
        console.log(222)

        let result2 = {tone: result.body.c, elementsToDispose: result.body.e, options: result.body.o}

        this.setState({tone: result2.tone})
        console.log(333, result2.tone)
        startSound(result2.tone)

        return 
        // console.log(222, prepareCode(this.props.sound.code))
    }
    pause = () => {
        this.setState({toneState: 'paused'})
    }
    togglePlay = () => {
        this.state.toneState === 'paused' ? this.play() : this.pause()
    }
    stop = () => {
        if (this.state.toneState === 'stopped') return
        this.setState({toneState: 'stopped'})
        stopSound(this.state.tone)
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
