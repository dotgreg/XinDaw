import { Meteor } from 'meteor/meteor'
import Songs from '/imports/api/songs'

import React from 'react';
import styled from 'styled-components';

import {filter} from 'lodash';

export default class Sound extends React.Component {

  constructor(props){
    super(props)
  }

  removeThatSound = () => Meteor.call('sounds.remove', this.props.sound._id);
  selectThatSound = () => Meteor.call('sounds.select', this.props.sound._id);
  toggleThatSound = () => Meteor.call('sounds.toggleMute', this.props.sound._id);
  cloneThatSound = () => Meteor.call('sounds.clone', this.props.sound._id);

  addToSong = () => Meteor.call('songs.addSound', this.props.sound._id);
  removeToSong = () => Meteor.call('songs.removeSound', this.props.sound._id);

  render() {
    let buttons = null
    if (this.props.type === 'songSound') {
      buttons = ([
        <button key='1' onClick={this.toggleThatSound}> {this.props.sound.muted ? 'unmute' : 'mute'} </button>,
        <button key='2' onClick={this.removeToSong}> sX </button>
      ])
    } else {
      buttons = ([
        <button key='3' onClick={this.addToSong}> Add To Song </button>,
        <button key='4' onClick={this.removeThatSound}> X </button>
      ])
    }

		return (
      <li onClick={this.selectThatSound}>
        <Par selected={this.props.sound.selected}> {this.props.sound.name} </Par>

        <button onClick={this.cloneThatSound}> Clone </button>
        {buttons}
      </li>
    )
  }
}

const Par = styled.p`
  display: inline-block;
  height: 0px;
  margin: 0px;
  color: ${props => props.selected && 'blue'};
`;
