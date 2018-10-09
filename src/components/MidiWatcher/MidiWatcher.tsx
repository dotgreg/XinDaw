import * as React from 'react';
import config from 'src/config';
import { cx, css } from 'emotion';
import s from 'src/styles';

declare var navigator:any

// const sound = new SoundTone(;dsadsadsa)


export interface iMidiEvent {
    id: number
    value: number
}

interface Props {
    onUpdate: Function
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
        this.handleMIDIMessage({data:[0, this.state.simEvent, this.state.simValue]}) 
    }

    componentDidMount() {
        console.log('[MIDI WATCHER] started')
        navigator.requestMIDIAccess().then((access:any) => {
            let midi = access;
            var inputs = midi.inputs;

            console.log("[MIDI WATCHER] Found " + inputs.size + " MIDI input(s)");

            //connect to first device found
            if(inputs.size > 0) {
                var iterator = inputs.values(); // returns an iterator that loops over all inputs
                var input = iterator.next().value; // get the first input
                console.log("[MIDI WATCHER] Connected first input: " + input.name);
                input.onmidimessage = this.handleMIDIMessage;
            }
        }, () => {

        } );
    }

    handleMIDIMessage = (event:any) => {
        if (event.data.length === 3) {
            // if we have a scroller, the message is the same, ie 63 for down and 65 for up, 
            // make that number varying to trigger react refresh
            let val = event.data[2]
            if (event.data[2] === 63) {
                this.scrollers.down = !this.scrollers.down
                val = this.scrollers.down ? 63 : 62
            }
            if (event.data[2] === 65) {
                this.scrollers.up = !this.scrollers.up
                val = this.scrollers.up ? 65 : 66
            }
            // if (event.data[2] === 64) {
            //     this.scrollers.up = !this.scrollers.up
            //     val = this.scrollers.up ? 61 : 67
            // }
            
            this.lastEvent = val

            let res:iMidiEvent = {id: event.data[1], value: val}
            config.debug.midiWatcher && console.log('[MIDI WATCHER] event: ', res)

            this.setState({lastEvent: `${res.id}: ${res.value}`})
            
            this.props.onUpdate(res)
        }
    }

    render() {
        return (
            <div>
                <div className={cx(s.debug.fixedPopup(100))}>
                    <div>
                        <p>midi simulator</p>
                        <input type="number" value={this.state.simEvent} onChange={this.changeSimulatorEvent} />
                        <input type="number" value={this.state.simValue} onChange={this.changeSimulatorValue} />
                        <button onClick={this.simulateMidi}>trigger</button>
                    </div>
                    {
                        this.state.lastEvent && 
                        <div>
                            <p>logger</p>
                            {this.state.lastEvent}
                        </div>
                    }
                </div>
            </div>
        )
    }   
}
