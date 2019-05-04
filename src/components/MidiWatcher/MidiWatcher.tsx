import * as React from 'react';
import config from 'src/config';
import { cx } from 'emotion';
import s from 'src/styles';
import { Input, Button, BlockTitle } from 'src/styles/components';

declare var navigator:any

// const sound = new SoundTone(;dsadsadsa)


export interface iMidiEvent {
    id: number
    value: number
    device: number
}

interface Props {
    onUpdate: Function
    debugPanel: boolean
}

interface State {
    logList: string[]
    lastEvent: string
    simEvent: number
    simValue: number
}

export default class MidiWatcher extends React.Component<Props,State> {
    lastEvent: number
    scrollers: {
        up: boolean,
        down: boolean
    } = {
        up: false,
        down: false
    }

    constructor(props) {
        super(props)
        this.state = {
            logList: [],
            lastEvent: '',
            simEvent: 58,
            simValue: 1,
        }
    }

    changeSimulatorEvent = (e) => { this.setState({simEvent: parseInt(e.target.value)}) }
    changeSimulatorValue = (e) => { this.setState({simValue: parseInt(e.target.value)}) }
    simulateMidi = () => { 
        this.setState({simValue: this.state.simValue + 1})
        this.handleMIDIMessage(-1)({data:[0, this.state.simEvent, this.state.simValue]}) 
    }

    componentDidMount() {
        console.log('[MIDI WATCHER] started')
        navigator.requestMIDIAccess().then((midiAccess:any) => {
            console.log("[MIDI WATCHER] Found " + midiAccess.inputs.size + " MIDI input(s)");

            // connecting to all midi devices
            var iterator = midiAccess.inputs.values();
            for (let i = 0; i < midiAccess.inputs.size; i++) {
                let input = iterator.next().value;
                console.log(`[MIDI WATCHER] listening events from midi input ${input.name}`)
                input.onmidimessage = this.handleMIDIMessage(i);
            }
        }, () => {

        } );
    }

    handleMIDIMessage = (device:number) => (event:any) => {
        // console.log('handleMIDIMessage', event.data);
        
        if (event.data.length === 3) {
            // if we have a scroller, the message is the same, ie 63 for down and 65 for up, 
            // make that number varying to trigger react refresh
            // console.log(333, event);
            
            let val = event.data[2]
            // if (event.data[2] === 63) {
            //     this.scrollers.down = !this.scrollers.down
            //     val = this.scrollers.down ? 63 : 62
            // }
            // if (event.data[2] === 65) {
            //     this.scrollers.up = !this.scrollers.up
            //     val = this.scrollers.up ? 65 : 66
            // }
            // if (event.data[2] === 64) {
            //     this.scrollers.up = !this.scrollers.up
            //     val = this.scrollers.up ? 61 : 67
            // }
            
            this.lastEvent = val

            let res:iMidiEvent = {id: event.data[1], value: val, device: device}
            // config.debug.midiWatcher && console.log('[MIDI WATCHER] event: ', res)

            this.setState({lastEvent: `${event.data[0]} ${event.data[1]} ${event.data[2]} on device ${res.device}`})
            
            this.props.onUpdate(res)
        }
    }

    render() {
        return (
            <div>
                <div className={cx(s.states.show(this.props.debugPanel) ,s.debug.fixedPopup(100))}>
                    {/* <div>
                        <BlockTitle s={12}>midi simulator</BlockTitle>
                        <Input type="number" value={this.state.simEvent} onChange={this.changeSimulatorEvent} />
                        <Input type="number" value={this.state.simValue} onChange={this.changeSimulatorValue} />
                        <Button onClick={this.simulateMidi}>trigger</Button>
                    </div> */}
                    {
                        this.state.lastEvent && 
                        <div>
                            {/* <BlockTitle>logger</BlockTitle> */}
                            midi logger: {this.state.lastEvent}
                        </div>
                    }
                </div>
            </div>
        )
    }   
}
