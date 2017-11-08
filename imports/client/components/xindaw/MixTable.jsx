import Tone from 'tone';
import React from 'react';

import {each} from 'lodash';
import styled from 'styled-components';

import { Meteor } from 'meteor/meteor'

import Knob from './Knob';

export default class MixTable extends React.Component {
  constructor(props){
    super(props)
  }

  changeValue = (tone, i, value) => {
    tone.options.vars[i].persistedValue = value
    // console.log(tone, tone.options.vars[i].persistedValue, i, value)
    Meteor.call('tones.update', tone)
  }

	render() {
		return (
      <Table>
        {this.props.tones.map(tone => (
          <SoundMixer key={tone.id}>
            <p>{tone.name}</p>
            <div>
               {(tone.options && tone.options.vars) && tone.options.vars.map((v,i) =>
                  <Knob
                    key={`${tone.id}-${i}`}
                    name={v.name}
                    val={v.persistedValue}
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

const SoundMixer = styled.div`
  background: grey;
  margin: 5px;
  float: left
`;
