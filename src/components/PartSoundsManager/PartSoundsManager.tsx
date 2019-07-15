import * as React from 'react';
import { getItemFromId, getEditedIndex } from 'src/helpers/arrayHelper';
import { cx } from 'emotion';
import s from 'src/styles';
import { iSound } from 'src/managers/types/sound.type';
import { iPart } from 'src/managers/types/part.type';
import { iSoundControls } from 'src/managers/types/control.type';
import { iComponentEvent } from 'src/managers/types/componentEvent.type';
import Sound from 'src/components/Sound/Sound';
import { BlockTitle, Li } from 'src/styles/components';
import { ComponentPropsListener } from 'src/Objects/ComponentPropsListener';
import ErrorBoundary from '../ErrorBoundary';
import { idKeyToNote } from 'src/managers/keyboard';

interface Props {
    part: iPart[]
    sounds: iSound[]
    controls: iSoundControls[]
    onUpdate: Function
    onTriggerSoundEdit: Function
    onRemoveSound: Function
    eventIn: iComponentEvent
}

interface State {

}

export default class PartSoundsManager extends React.Component<Props,State> {

    propsListener: ComponentPropsListener
    
    constructor(props) {
        super(props)
        this.propsListener = new ComponentPropsListener({
            'eventIn': () => {
                let event = this.props.eventIn
                if (!event || !event.signalType) return 
                let editedIndex = getEditedIndex(this.props.sounds)
                let editedSound = this.refs[`sound-${editedIndex}`] as Sound
                // editedSound.soundTone.type === ''

                console.log(333, event);
                

                if (event.signalType.device === 'button' && event.signalType.event === 'pushDown') {
                    if (event.action === 'list.up') this.props.onTriggerSoundEdit(this.props.sounds[editedIndex - 1]) 
                    if (event.action === 'list.down') this.props.onTriggerSoundEdit(this.props.sounds[editedIndex + 1]) 
                    if (event.action === 'sound.delete' && this.props.sounds[editedIndex]) this.props.onRemoveSound(this.props.sounds[editedIndex]) 
                    if (event.action === 'sound.play' && editedSound)  editedSound.play({})
                    if (event.action === 'sound.pause' && editedSound) editedSound.pause() 
                    if (event.action === 'sound.toggle' && editedSound) editedSound.togglePlay() 
                }

                // for events1-10 push buttons, working with patterns and events
                for (let i = 1; i <= 10; i++) {
                    if (event.action === `play.sound${i}`) {
                        // let sound = this.props.sounds[i-1]
                        let sound = this.refs[`sound-${i-1}`] as Sound
                        if (sound && event.signalType.device === 'button') {
                            
                            if (sound.soundTone.type === 'pattern' && event.signalType.event === 'pushDown') {
                                sound.togglePlay() 
                            }
                            
                            if (sound.soundTone.type === 'event' && event.signalType.event === 'pushDown') {
                                sound.play({type: 'attack'}) 
                            }
                            
                            if (sound.soundTone.type === 'event' && event.signalType.event === 'pushUp') {
                                sound.play({type: 'release'}) 
                            }

                        }
                    }                 
                }

                if (event.signalType.device === 'keyboard' && editedSound) {
                    let note = idKeyToNote(event.raw.id)
                    // console.log('keyboard event yay', event, idKeyToNote(event.raw.id));
                    if (event.signalType.event === 'pushDown') {
                        editedSound.play({type: 'attack', note: note, power: event.raw.value, rawNote: event.raw.id}) 
                    }
                    
                    if (event.signalType.event === 'pushUp') {
                        editedSound.play({type: 'release', note: note, power: event.raw.value, rawNote: event.raw.id }) 
                    }
                    
                }
                
            },
        })
    }
    componentDidUpdate = () => { 
        this.propsListener.listen(this.props); 
    }

    render() {
        return (
            <div className="sounds" >
                <BlockTitle>Current Part</BlockTitle>
                <div className="sounds" >
                    <ol>
                        {
                            this.props.sounds.map((sound,i) => (
                                <Li key={i} className={cx( sound.edited && s.text.active)}>
                                    <ErrorBoundary>
                                        <Sound
                                            ref={`sound-${i}`}
                                            sound={sound}   
                                            controls={getItemFromId(sound.id,this.props.controls).controls}
                                            playable={true}
                                            onEdit={this.props.onTriggerSoundEdit}
                                            onDelete={this.props.onRemoveSound}
                                        />
                                    </ErrorBoundary>
                                </Li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        )
    }   
}