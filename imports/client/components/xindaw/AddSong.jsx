import {random} from 'lodash';
import React from 'react';
import dedent from 'dedent-js';

import { Meteor } from 'meteor/meteor'

import * as css from '/imports/client/components/xindaw/css/styles.js'

export default class AddSong extends React.Component {

  constructor(props){
    super(props)
  }

  createSong = () => {
    Meteor.call('songs.insert');
  }

	render() {
		return (
      <css.Button onClick={this.createSong}>
        addSong
      </css.Button>
    )
  }
}
