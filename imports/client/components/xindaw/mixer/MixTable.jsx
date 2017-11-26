import Tone from 'tone';
import React from 'react';

import {each} from 'lodash';
import styled from 'styled-components';

import { Meteor } from 'meteor/meteor'

import Knob from './knob/Knob';

export default class MixTable extends React.Component {
  constructor(props){
    super(props)
  }

  changeValue = (tone, i, value) => {
    tone.options.vars[i][1].persistedValue = value
    // console.log(tone, tone.options.vars[i].persistedValue, i, value)
    Meteor.call('tones.update', tone)
  }

	render() {
		return (
      <Table>
        {this.props.tones.map(tone => (
          <SoundMixer key={tone.id}>
            <SoundName>{tone.name}</SoundName>
            <div>
               {(tone.options && tone.options.vars) && tone.options.vars.map((v,i) =>
                  <Knob
                    key={`${tone.id}-${i}`}
                    name={v[0]}
                    val={v[1].persistedValue}
                    min={v[2]}
                    max={v[3]}
                    onValueChange={this.changeValue.bind(this, tone, i)} />
               )}
            </div>
          </SoundMixer>
          )
        )}
        <Clear></Clear>
      </Table>
    )
  }
}

//
// CSS
//

const Table = styled.div`

`;

const Clear = styled.div`
  clear: both;
`;

const SoundName = styled.div`
  padding: 10px;
  background: #dfdfdf;
  text-align: center;
`;

const SoundMixer = styled.div`
  background: #f3f3f3;
  max-width: 50%;
  margin: 5px;
  float: left;
`;
