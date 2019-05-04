import * as React from 'react';
import { updateArrayItem, mergeArraysByProp } from 'src/helpers/arrayHelper';
import { ComponentPropsListener } from 'src/Objects/ComponentPropsListener';
import { iSettingsItem } from 'src/managers/types/settings.type';
import { Input } from 'src/styles/components';
import styled from 'react-emotion';


interface Props {
    onUpdate: Function
    settings: iSettingsItem[]
}

interface State {
    settings: iSettingsItem[],
}

export default class KeysBindingManager extends React.Component<Props,State> {

    propsListener: ComponentPropsListener

    constructor(props) {
        super(props)
        this.state = {
            settings: [
                {type: 'event', value:48, key: 'controls.knob1'},
                {type: 'event', value:49, key: 'controls.knob2'},
                {type: 'event', value:50, key: 'controls.knob3'},
                {type: 'event', value:51, key: 'controls.knob4'},
                {type: 'event', value:52, key: 'controls.knob5'},
                {type: 'event', value:53, key: 'controls.knob6'},
                {type: 'event', value:54, key: 'controls.knob7'},
                {type: 'event', value:55, key: 'controls.knob8'},
                {type: 'event', value:56, key: 'controls.knob9'},
                {type: 'event', value:57, key: 'controls.knob10'},

                {type: 'event', value:64, key: 'soundsLibrary.list.up'},
                {type: 'event', value:65, key: 'soundsLibrary.list.down'},
                {type: 'event', value:66, key: 'soundsLibrary.list.addToPart'},

                {type: 'event', value:0, key: 'PartSoundsManager.list.up'},
                {type: 'event', value:0, key: 'PartSoundsManager.list.down'},
                {type: 'event', value:0, key: 'PartSoundsManager.sound.pause'},
                {type: 'event', value:0, key: 'PartSoundsManager.sound.delete'},
                {type: 'event', value:0, key: 'PartSoundsManager.sound.play'},
                {type: 'event', value:0, key: 'PartSoundsManager.sound.toggle'},
            ],
        }

        this.propsListener = new ComponentPropsListener({
            'settings': () => {
                // let settings = this.state.settings // to reinit settings
                let settings = mergeArraysByProp('eventName', this.state.settings, this.props.settings)
                this.setState({settings: settings})
            },
        })
    }

    initializeIfNothing = () => {
        if (typeof this.props.settings === 'undefined') {
            console.log('[SETTING] no settings found, init with the default ones', this.state.settings);
            this.props.onUpdate(this.state.settings)
        } 
    }
    
    componentDidUpdate = () => { this.propsListener.listen(this.props) }

    changeItem = (e:any, item:iSettingsItem) => {
        item.value = parseInt(e.target.value)
        this.props.onUpdate(updateArrayItem('key')(item)(this.state.settings))
    }

    render() {
        this.initializeIfNothing()
        
        return (
           <Styled>
               {
                    this.state.settings.map((item, index) => (
                        <div className="config-option" key={index}>
                            <label>{item.key} - {item.type}</label> 
                            <Input type="number" value={item.value} onChange={e =>{this.changeItem(e, item)}} />
                        </div>
                    ))
                }
           </Styled>
        )
    }   
}

const Styled = styled('div')`
`