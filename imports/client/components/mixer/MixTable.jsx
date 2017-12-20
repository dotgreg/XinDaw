import Tone from 'tone';
import React from 'react';

import { each, isNumber, find} from 'lodash';
import styled from 'styled-components';

import { Meteor } from 'meteor/meteor'
import esprima from 'esprima'

import Knob from './knob/Knob';
import { updateParamsCode } from '../code/updateParamsCode';

export default class MixTable extends React.Component {
  constructor(props){
    super(props)
  }

  changeValue = (tone, i, value) => {

    let nameProp = tone.options.vars[i][0]
    if (isNumber(tone.options.vars[i][1].persistedValue)) tone.options.vars[i][1].persistedValue = value
    else tone.options.vars[i][1][nameProp] = value

    Meteor.call('tones.update', tone)
  }

  componentWillUpdate (nextProps, nextState) {
    console.log('MIXTABLE componentWillUpdate', nextProps, nextState)
    // nextState.variable = nextProps.variable
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   return false;
  // }

  saveParamsTone = tone => {
    updateParamsCode(tone.soundId, tone._id)
  }

	render() {
		return (
      <Table>
        {this.props.tones.map(tone => (
          <SoundMixer key={tone.soundId}>
            <SoundName>{tone.name}</SoundName>
            <div>
               {(tone.options && tone.options.vars) && tone.options.vars.map((v,i) =>
                  <Knob
                    key={`${tone.id}-${i}`}
                    name={v[0]}
                    val={v[1].persistedValue ? v[1].persistedValue : v[1][v[0]]}
                    min={v[2]}
                    max={v[3]}
                    step={v[4]}
                    initVal={v[5]}
                    onValueChange={this.changeValue.bind(this, tone, i)} />
               )}
            </div>
            <div onClick={this.saveParamsTone.bind(this, tone)}>save</div>
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
