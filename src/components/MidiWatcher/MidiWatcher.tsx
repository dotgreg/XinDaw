import * as React from 'react';
import config from '../../config';
import styled from 'styled-components';

declare var navigator:any

interface Props {
    onUpdate: Function
}

interface State {
    logList: string[]
}

export default class MidiWatcher extends React.Component<Props,State> {
    constructor(props) {
        super(props)
        this.state = {
            logList: []
        }
    }

    componentDidMount() {
        config.debug.midiWatcher && console.log('[MIDI WATCHER] started')
        navigator.requestMIDIAccess().then((access:any) => {
            let midi = access;
            var inputs = midi.inputs;

            this.logText("Found " + inputs.size + " MIDI input(s)");

            //connect to first device found
            if(inputs.size > 0) {
                var iterator = inputs.values(); // returns an iterator that loops over all inputs
                var input = iterator.next().value; // get the first input
                this.logText("Connected first input: " + input.name);
                input.onmidimessage = this.handleMIDIMessage;
            }
        }, () => {

        } );
    }

    logText = (string:string) => {
        let newList = this.state.logList
        newList.unshift(string)
        this.setState({logList: newList})
    }

    handleMIDIMessage = (event:any) => {
        if (event.data.length === 3) {
            this.logText('controller id: ' + event.data[1] +  ', value: ' + event.data[2]);
        }
    }

    render() {
        return (
            <StyledMidiWatcher>
                <div className="logger">
                    {
                        this.state.logList.map((log,index) => (
                            <div key={index}>{log}</div>
                        ))
                    }
                </div>
            </StyledMidiWatcher>
        )
    }   
}

const StyledMidiWatcher = styled.div`
    position: fixed;
    right: 0px;
    top: 0px;
    width: 200px;
    height: 300px;
    background: rgba(0,0,0,0.3);
    color: white;
    overflow-y: scroll;
`