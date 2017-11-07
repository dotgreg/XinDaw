import Tone from 'tone';
import React from 'react';

import {each} from 'lodash';
import Nexus from 'nexusui';


export default class Mixer extends React.Component {
  constructor(props){
    super(props)
  }

  componentDidMount () {
  }



 componentWillReceiveProps(nextProps) {
  //  var dial = Nexus.Add.Dial('#instrument',{
  //     'size': [100,100]
  //   });
  // console.log(nx)
  console.log(window.nx)
  console.log(Nexus)
 }

	render() {
		return (
      <div>
        MIXER
        <div id="instruments"></div>
        <ul>
          {this.props.tones.map(tone => {
              if (!tone.options || !tone.options.vars) return
              let r = []
              tone.options.vars.map(v => {
                r.push(<div> {tone.id} {v.value} </div>)
              })
              return r
            }
          )}
        </ul>
      </div>
    )
  }
}
