import { withTracker } from 'meteor/react-meteor-data';
import { Tones } from '/imports/api/tones.js';

import Tone from 'tone';
import React from 'react';

import {each} from 'lodash';
import styled from 'styled-components';

import MixTable from '../MixTable';


class MixerScreen extends React.Component {
  constructor(props){
    super(props)
  }

	render() {
		return (
      <MixTable tones={this.props.tones} />
    )
  }
}


//
// DATA CONTAINER (METEOR)
//

export default withTracker(props => {
  Meteor.subscribe('tones');
  return {
    tones: Tones.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
})(MixerScreen);
