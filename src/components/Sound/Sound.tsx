import * as React from 'react';
import config from 'src/config';
import { areSame } from 'src/helpers/areSame';
import { SoundTone } from 'src/Objects/SoundTone';
import { iSound } from 'src/managers/types/sound.type';
import { iControlVar } from 'src/managers/types/control.type';
import { Button, ButtonSmall } from 'src/styles/components';
import s from 'src/styles';
import styled, { cx, css } from 'react-emotion';
import { toneTypeSign } from 'src/helpers/toneTypeSign';
import { iProcessedMidiInfos } from 'src/managers/types/general.types';
import {debounce} from 'lodash'

interface Props {
    sound: iSound,
    onDelete: Function
    controls?:iControlVar[]
    onEdit:Function
    playable?:Boolean
    onAddCurrentPart?: Function
}

interface State {
    playStatus: string
    error: string|null
    toneType: string|null
}

export default class Sound extends React.Component<Props,State> {

    hist:{
        sound: iSound | undefined
        controls: iControlVar[]
    } = {
        sound: undefined,
        controls: []
    }
    soundTone:SoundTone
    inAnAttack: boolean = false

    constructor(props){
        super(props)
        this.state = {
            playStatus: 'paused',
            error: null,
            toneType: null
        }
    }

    componentDidMount () {
        config.debug.soundCompo && console.log(`[SOUND Comp] new sound ${this.props.sound.name} mounted`)
        this.hist.sound = Object.assign({}, this.props.sound)

        this.soundTone = new SoundTone(this.props.sound.code)
        this.setState({error: this.soundTone.error, toneType: toneTypeSign(this.soundTone.type)})
    }

    componentWillUnmount () {
        config.debug.soundCompo && console.log(`[SOUND Comp] ${this.props.sound.name} will unmount`)
        this.stop()
    }

    componentDidUpdate () {
        // if controls updated
        if (!areSame(this.props.controls, this.hist.controls)) {
            
            this.soundTone.updateControls(this.props.controls || [])

            this.hist.controls = Object.assign({}, this.props.controls)
        }


        if (!areSame(this.props.sound, this.hist.sound)) {
            config.debug.soundCompo && console.log(`[SOUND Comp] sound ${this.props.sound.name} updated`)
            
    
            // if code updated
            if (this.props.sound.code !== (this.hist.sound as iSound).code) {
                config.debug.soundCompo && console.log(`[SOUND Comp] sound CODE ${this.props.sound.name} updated`)
    
                this.soundTone.destroy()
                this.soundTone = new SoundTone(this.props.sound.code)
                this.setState({error: this.soundTone.error, toneType: toneTypeSign(this.soundTone.type)})

                // if playStatus was playing, start sound again
                if (this.state.playStatus === 'playing') this.play({})
                
            } 
    
            this.hist.sound = Object.assign({}, this.props.sound)
        }
        
    }

    //
    // TONE RELATED CODE
    //
    debouncedRelease = debounce((midiInfos:iProcessedMidiInfos) => {
        console.log('release debounced');
        this.inAnAttack = false
        // midiInfos.type = 'release'
        // this.processPlaying(midiInfos)
    },300)

    play = (midiInfos:iProcessedMidiInfos) => {
        if (this.soundTone.type === 'event') {
            // if play is a general one or a release one

            if (!midiInfos.type ) {
                this.processPlaying(midiInfos)
                setTimeout(() => {this.setState({playStatus: 'paused'})}, 200)

            } else if (midiInfos.type === 'attack') {

                this.processPlaying(midiInfos)
                this.inAnAttack = true
                this.debouncedRelease(midiInfos)
                

            } else if (midiInfos.type === 'release') {
                
                if (this.inAnAttack) {
                    setTimeout(() => {
                        if (!this.inAnAttack) {
                            this.processPlaying(midiInfos)
                            this.setState({playStatus: 'paused'})
                        }
                    }, 300)
                } else {
                    this.processPlaying(midiInfos)
                    setTimeout(() => {
                        this.setState({playStatus: 'paused'})
                    }, 200)
                }
            }

        } else {
            this.processPlaying(midiInfos)
        }
    }
    processPlaying(midiInfos:iProcessedMidiInfos) {
        try {
            this.soundTone.play(midiInfos)
        } catch (error) {
            alert(`[CODE ERROR] : ${error.message}`)
        }
        config.debug.soundCompo && console.log(`[SOUND Comp] trigger play sound ${this.soundTone.type}`);
        this.setState({playStatus: 'playing'})
    }

    pause = () => {
        config.debug.soundCompo && console.log('[SOUND Comp] trigger pause');
        this.soundTone.pause()
        this.setState({playStatus: 'paused'})
    }
    togglePlay = () => {
        console.log(`togglePlay to not ${this.state.playStatus}`);
        this.state.playStatus === 'paused' ? this.play({}) : this.pause()
    }
    stop = () => {
        config.debug.soundCompo && console.log('[SOUND Comp] trigger stop');
        this.soundTone.destroy()
        this.setState({playStatus: 'paused'})
    }
    

    render() {
        return (
            <Styled >
                <div className={`sound-wrapper ${this.state.error ? 'has-error':'no-error'}`}>

                    <div className="label" onClick={() => {this.props.onEdit(this.props.sound)}}> 
                        <span className={css`font-weight: bold;font-size: 16px;`}> {this.state.toneType} </span> 
                        {this.props.sound.name} 
                    </div>

                    {
                        this.props.onAddCurrentPart && (
                            <ButtonSmall onClick={() => {(this.props.onAddCurrentPart as Function)(this.props.sound)}}> P </ButtonSmall>
                        )
                    } 

                    {
                        this.props.playable && (
                            <ButtonSmall onClick={() => {this.togglePlay()}}>
                                {this.state.playStatus === 'playing' ? '||' : '>'}
                            </ButtonSmall>
                        )
                    } 
                    {
                        this.state.error && <div className="error">{this.state.error}</div>
                    }
                    <ButtonSmall onClick={() => {this.props.onDelete(this.props.sound)}}>X</ButtonSmall>
                </div>
            </Styled>
        )
    }   
}

const Styled = styled('div')`
    .sound-wrapper {
        position: relative;
        display: flex;
        cursor: pointer;
        &.has-error {
            color: red;
            border-color: red;
        }
        .label {
            flex: 1 1 auto;
        }
        .error {
            display: none;
            position: absolute;
            top: 25px;
            z-index: 2;
            padding: 10px;
            width: 200px;
            background: rgba(0,0,0,0.8);
            font-size: 10px;
            color: white
        }
        &:hover {
            .error {
                display: block
            }
        }
    }
`