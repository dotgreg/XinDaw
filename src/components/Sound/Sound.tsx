import * as React from 'react';
import config from 'src/config';
import { areSame } from 'src/helpers/areSame';
import { SoundTone } from 'src/objects/SoundTone';
import { iSound } from 'src/managers/types/sound.type';
import { iControlVar } from 'src/managers/types/control.type';
import { Button, ButtonSmall } from 'src/styles/components';
import s from 'src/styles';
import styled, { cx } from 'react-emotion';

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
    error: any
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

    constructor(props){
        super(props)
        this.state = {
            playStatus: 'paused',
            error: undefined
        }
    }

    componentDidMount () {
        config.debug.sound && console.log(`[SOUND] new sound ${this.props.sound.name} mounted`)
        this.hist.sound = Object.assign({}, this.props.sound)

        this.soundTone = new SoundTone(this.props.sound.code)
        this.setState({error: this.soundTone.error})
    }

    componentWillUnmount () {
        config.debug.sound && console.log(`[SOUND] ${this.props.sound.name} will unmount`)
        this.stop()
    }

    componentDidUpdate () {
        // if controls updated
        if (!areSame(this.props.controls, this.hist.controls)) {
            
            this.soundTone.updateControls(this.props.controls || [])

            this.hist.controls = Object.assign({}, this.props.controls)
        }


        if (!areSame(this.props.sound, this.hist.sound)) {
            config.debug.sound && console.log(`[SOUND] sound ${this.props.sound.name} updated`)
            
    
            // if code updated
            if (this.props.sound.code !== (this.hist.sound as iSound).code) {
                config.debug.sound && console.log(`[SOUND] sound CODE ${this.props.sound.name} updated`)
    
                this.soundTone.destroy()
                this.soundTone = new SoundTone(this.props.sound.code)
                this.setState({error: this.soundTone.error})
            } 
    
            this.hist.sound = Object.assign({}, this.props.sound)
        }
        
    }

    //
    // TONE RELATED CODE
    //
    play = () => {
        console.log('play');
        this.soundTone.play()
        this.setState({playStatus: 'playing'})
    }
    pause = () => {
        console.log('pause');
        
        this.soundTone.pause()
        this.setState({playStatus: 'paused'})
    }
    togglePlay = () => {
        this.state.playStatus === 'paused' ? this.play() : this.pause()
    }
    stop = () => {
        this.soundTone.destroy()
        this.setState({playStatus: 'paused'})
    }
    

    render() {
        return (
            <Styled >
                <div className={`sound-wrapper ${this.state.error ? 'has-error':'no-error'}`}>
                    <span onClick={() => {this.props.onEdit(this.props.sound)}}> {this.props.sound.name} </span>
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
        &.has-error {
            color: red;
            border-color: red;
        }
        .error {
            display: none;
            position: absolute;
            bottom: -45px;
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