import * as React from 'react';
import { updateArrayItem, mergeArraysByProp } from '../../helpers/arrayHelper';
import { areSame } from '../../helpers/areSame';
import {each} from 'lodash'

export interface iSettingsItem {
    type: string
    value: number
    eventName: string
}

interface Props {
    onUpdate: Function
    settings: iSettingsItem[]
}

interface State {
    settings: iSettingsItem[]
}

export default class SettingsManager extends React.Component<Props,State> {

    hist:iSettingsItem[]

    constructor(props) {
        super(props)
        this.state = {
            settings: [
                {type: 'event', value:48, eventName: 'controls.knob1'},
                {type: 'event', value:49, eventName: 'controls.knob2'},
                {type: 'event', value:50, eventName: 'controls.knob3'},
                {type: 'event', value:51, eventName: 'controls.knob4'},
                {type: 'event', value:52, eventName: 'controls.knob5'},
                {type: 'event', value:53, eventName: 'controls.knob6'},
                {type: 'event', value:54, eventName: 'controls.knob7'},
                {type: 'event', value:55, eventName: 'controls.knob8'},
                {type: 'event', value:56, eventName: 'controls.knob9'},
                {type: 'event', value:57, eventName: 'controls.knob10'},

                {type: 'event', value:58, eventName: 'soundsManager.list.up'},
                {type: 'event', value:58, eventName: 'soundsManager.list.down'},
                {type: 'event', value:60, eventName: 'soundsManager.list.addToPart'},

                {type: 'event', value:61, eventName: 'PartSoundsManager.list.up'},
                {type: 'event', value:62, eventName: 'PartSoundsManager.list.down'},
                {type: 'event', value:63, eventName: 'PartSoundsManager.sound.pause'},
                {type: 'event', value:64, eventName: 'PartSoundsManager.sound.delete'},
                {type: 'event', value:65, eventName: 'PartSoundsManager.sound.play'},
            ]
        }
    }

    // this.props.onUpdate(settings)
    
    componentDidMount() {
        // during bootstraping only, get settings val from storage
    }
    
    componentDidUpdate() {
        if (!areSame(this.hist, this.props.settings)) {
            let settings = mergeArraysByProp('eventName', this.state.settings, this.props.settings)
            this.setState({settings: settings})
            this.hist = this.props.settings
        }
    }

    changeItem = (e:React.ChangeEvent, item:iSettingsItem) => {
        // @ts-ignore
        // console.log(e.target.value,item)
        // @ts-ignore
        item.value = parseInt(e.target.value)
        this.props.onUpdate(updateArrayItem('eventName')(item)(this.state.settings))
    }

    // onSave = () => {
    // }

    render() {
        return (
           <div>
               <h3>settings</h3>
               <div>
                   {
                       this.state.settings.map((item, index) => (
                           <div key={index}>
                                <label>{item.eventName} - {item.type}</label> 
                                <input type="number" value={item.value} onChange={e =>{this.changeItem(e, item)}} />
                           </div>
                       ))
                   }
               </div>
           </div>
        )
    }   
}
