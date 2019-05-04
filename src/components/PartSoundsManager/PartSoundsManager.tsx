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
                let editedIndex = getEditedIndex(this.props.sounds)
                let editedSound = this.refs[`sound-${editedIndex}`] as Sound
                if (event.action === 'list.up') this.props.onTriggerSoundEdit(this.props.sounds[editedIndex - 1]) 
                if (event.action === 'list.down') this.props.onTriggerSoundEdit(this.props.sounds[editedIndex + 1]) 
                if (event.action === 'sound.delete' && this.props.sounds[editedIndex]) this.props.onRemoveSound(this.props.sounds[editedIndex]) 
                if (event.action === 'sound.play' && editedSound)  editedSound.play()
                if (event.action === 'sound.pause' && editedSound) editedSound.pause() 
            },
        })
    }
    componentDidUpdate = () => { this.propsListener.listen(this.props) }

    render() {
        return (
            <div className="sounds" >
                <BlockTitle>Current Part</BlockTitle>
                <div className="sounds" >
                    <ul>
                        {
                            this.props.sounds.map((sound,i) => (
                                <Li key={i} className={cx( sound.edited && s.text.active)}>
                                    <Sound
                                        ref={`sound-${i}`}
                                        sound={sound}   
                                        controls={getItemFromId(sound.id,this.props.controls).controls}
                                        playable={true}
                                        onEdit={this.props.onTriggerSoundEdit}
                                        onDelete={this.props.onRemoveSound}
                                    />
                                </Li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }   
}