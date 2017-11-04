import {random} from 'lodash';
import React from 'react';
import dedent from 'dedent-js';

import { Meteor } from 'meteor/meteor'

export default class AddSong extends React.Component {

  constructor(props){
    super(props)
  }

  createSong = () => {
    Meteor.call('songs.insert');
  }

	render() {
		return (
      <button onClick={this.createSong}>
        addSong
      </button>
    )
  }
}
