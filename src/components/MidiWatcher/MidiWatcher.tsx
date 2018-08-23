import * as React from 'react';
import config from '../../config';
import styled from 'styled-components';

declare var navigator:any

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
            lastEvent: ''
        }
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
            <StyledMidiWatcher>
                <div className="logger">
                    {this.state.lastEvent}
                </div>
            </StyledMidiWatcher>
        )
    }   
}

const StyledMidiWatcher = styled.div`
    /* position: fixed;
    right: 0px;
    top: 0px;
    width: 200px;
    height: 300px;
    background: rgba(0,0,0,0.3);
    color: white;
    overflow-y: scroll; */
`