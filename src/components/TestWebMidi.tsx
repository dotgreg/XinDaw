import * as React from 'react';

interface State {
    logList: string[]
}

declare var navigator:any

class TestWebMidi extends React.Component<{},State> {
    constructor(props) {
        super(props)
        this.state = {
            logList: []
        }
    }

    logText = (string:string) => {
        let newList = this.state.logList
        newList.push(string)
        this.setState({logList: newList})
    }

    onSuccess = ( access ) => { 
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
    }
    
    handleMIDIMessage = (event:any) => {
        if (event.data.length === 3) {
            this.logText('controller id: ' + event.data[1] +  ', value: ' + event.data[2]);
        }
    }

    onFailure = ( err ) => {
        this.logText("MIDI Init Error. Error code: " + err.code);
    }

    componentDidMount() {
		this.logText("Initializing MIDI...");
        this.setState
        navigator.requestMIDIAccess().then( this.onSuccess, this.onFailure ); //get midi access
    }

    public render() {
        let style = {
            width: 300,
            height: 300,
            overflow: 'scroll',
            border: '1px solid red'
        }
        return (
        <div>
            TestWebMidi
            <div className="logger" style={style}>
                {
                    this.state.logList.map((log,index) => (
                        <div key={index}>{log}</div>
                    ))
                }
            </div>
        </div>
        );
    }
}

export default TestWebMidi;
