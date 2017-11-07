import Tone from 'tone';
import React from 'react';

import {each} from 'lodash';
import styled from 'styled-components';
// import Nexus from 'nexusui';


export default class Mixer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      tones: []
    }
  }

  componentDidMount () {
  }



 componentWillReceiveProps(nextProps) {
   this.setState({tones: nextProps.tones})
  // console.log(window.nx)
  // console.log(Nexus)
 }

 changeValue = (v, i, j, e) => {
   let tones = [...this.state.tones]
   tones[i].options.vars[j].value = e.target.value
   this.setState({tones: tones})
 }

	render() {
		return (
      <div>
        <MixTable>
          {this.state.tones.map((tone,i) => (
            <SoundMixer key={tone.id}>
              <p>{tone.name}</p>
              <ul>
                 {tone.options.vars.map((v,j) => (
                    <p key={`${tone.id}-${j}`}>
                      <input
                        type="number"
                        min="-100"
                        max="100"
                        defaultValue={Math.round(v.value)}
                        onChange={this.changeValue.bind(this, v, i, j)} />
                    </p>
                 ))}
              </ul>
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
// Loops
//

const VarList = props =>
<ul>
   {props.vars.map((v,i) => (
      <li key={`${props.id}-${i}`}>{v.value}
        <input type="number" size="2" value={v.value} onChange={this.changeValue} />
      </li>
   ))}
</ul>

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
