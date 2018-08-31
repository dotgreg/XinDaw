import * as React from 'react';
import Sound, { iSound } from '../Sound/Sound';
import { arrayWithoutItem, arrayWithItemToEdited, arrayWithItemsToNotEdited } from '../../helpers/arrayHelper';
import { iComponentEvent } from '../../App';
import { areSame } from '../../helpers/areSame';
import { ComponentPropsListener } from '../../Objects/ComponentPropsListener';

interface Props {
    sounds: iSound[]

    onUpdate: Function
    onAddCurrentPart: Function

    listenTo: iComponentEvent
}

interface State {
    activeSound: 0
}

export default class SoundsManager extends React.Component<Props,State> {

    propsListener: ComponentPropsListener

    constructor(props) {
        super(props)
        this.propsListener = new ComponentPropsListener()

        this.propsListener.onChange('sounds', () => {
            console.log('woooop sounds changed', this.props)
        })
    }

    componentDidUpdate = () => { this.propsListener.listen(this.props) }

    deleteSound = (soundToDelete:iSound) => this.props.onUpdate(arrayWithoutItem(soundToDelete, this.props.sounds))
    editSound = (sound:iSound) => this.props.onUpdate(arrayWithItemToEdited(sound.id, arrayWithItemsToNotEdited(this.props.sounds)))
    startNewSoundEdit = () => this.props.onUpdate(arrayWithItemsToNotEdited(this.props.sounds))

    render() {
        return (
            <div>
                <div>SoundsManager</div>

                {/* CRUD SOUND */}

                <button onClick={this.startNewSoundEdit}> + </button>
                 
                {/* LIST SOUNDS */}

                <div className="sounds" >
                    <h3>sounds</h3>
                    <ul>
                        {
                            this.props.sounds.map((sound,i) => (
                                <Sound 
                                    key={i} 
                                    sound={sound}
                                    onEdit={this.editSound}
                                    onDelete={this.deleteSound}
                                    onAddCurrentPart={this.props.onAddCurrentPart}
                                />
                            ))
                        }
                        
                    </ul>
                </div>

            </div>
        )
    }   
}
