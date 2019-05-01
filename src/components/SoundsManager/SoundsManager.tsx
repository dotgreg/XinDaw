import * as React from 'react';
import { arrayWithoutItem, arrayWithItemToEdited, arrayWithItemsToNotEdited, getEditedItem, getEditedIndex } from 'src/helpers/arrayHelper';
import { ComponentPropsListener } from 'src/Objects/ComponentPropsListener';
import { cx } from 'emotion';
import s from 'src/styles';
import config from 'src/config';
import { iSound } from 'src/managers/types/sound.type';
import { iComponentEvent } from 'src/managers/types/componentEvent.type';
import Sound from 'src/components/Sound/Sound';
import { BlockTitle, Li, Button } from 'src/styles/components';



interface Props {
    sounds: iSound[]

    onUpdate: Function
    onAddCurrentPart: Function

    eventIn: iComponentEvent
}

export default class SoundsManager extends React.Component<Props,{}> {

    propsListener: ComponentPropsListener
    constructor(props) {
        super(props)
        this.propsListener = new ComponentPropsListener({
            'eventIn': () => {
                let event = this.props.eventIn
                config.debug.soundsManager && console.log('[SOUNDSMANAGER] eventIn changed to', event)
                let editedIndex = getEditedIndex(this.props.sounds)
                if (event.action === 'list.up') this.editSound(this.props.sounds[editedIndex - 1]) 
                if (event.action === 'list.down') this.editSound(this.props.sounds[editedIndex + 1]) 
                if (event.action === 'list.addToPart') this.props.onAddCurrentPart(this.props.sounds[editedIndex]) 
            },
        })
    }
    componentDidUpdate = () => { this.propsListener.listen(this.props) }
    

    deleteSound = (soundToDelete:iSound) => this.props.onUpdate(arrayWithoutItem(soundToDelete, this.props.sounds))
    editSound = (sound:iSound) => sound && this.props.onUpdate(arrayWithItemToEdited(sound.id, arrayWithItemsToNotEdited(this.props.sounds)))
    startNewSoundEdit = () => this.props.onUpdate(arrayWithItemsToNotEdited(this.props.sounds))

    render() {
        return (
            <div>
                <BlockTitle>Sounds</BlockTitle>

                {/* CRUD SOUND */}
                
                <label>
                    Add new Sound 
                    <Button onClick={this.startNewSoundEdit}> + </Button>
                </label>

                {/* LIST SOUNDS */}

                <div className="sounds" >
                    <ul>
                        {
                            this.props.sounds.map((sound,i) => (
                                <Li key={i} className={cx( sound.edited && s.text.active)}>
                                    <Sound
                                        sound={sound}
                                        onEdit={this.editSound}
                                        onDelete={this.deleteSound}
                                        onAddCurrentPart={this.props.onAddCurrentPart}
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
