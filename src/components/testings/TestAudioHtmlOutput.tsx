import * as React from 'react';
import Tone from 'tone'
import * as _ from 'lodash'
import { getUserMedia } from '../../helpers/getUserMedia';

class TestAudioHtmlOutput extends React.Component {
    componentDidMount() {
        
       
  
    }

    public render() {
        return (
        <div className="App">
            <audio controls>
                <source src="horse.ogg" type="audio/ogg" />
            </audio>
        </div>
        );
    }
}

export default TestAudioHtmlOutput;
