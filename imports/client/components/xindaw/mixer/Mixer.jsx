import Tone from 'tone';
import React from 'react';

import {each} from 'lodash';
import styled from 'styled-components';

import Knob from './Knob';


export default class Mixer extends React.Component {
  constructor(props){
    super(props)
  }

	render() {
		return (
      <div>
        <MixTable>
          {this.props.tones.map(tone => (
            <SoundMixer key={tone.id}>
              <p>{tone.name}</p>
              <div>
                 {(tone.options && tone.options.vars) && tone.options.vars.map((v,i) =>
                    <Knob key={`${tone.id}-${i}`} variable={v} />
                 )}
              </div>
            </SoundMixer>
            )
          )}
        </MixTable>
        <Clear></Clear>
      </div>
    )
  }
}

//
// CSS
//

const MixTable = styled.div`
  clear: both;
`;

const Clear = styled.div`
  clear: both;
`;

const SoundMixer = styled.div`
  background: grey;
  margin: 5px;
  float: left
`;
