import React from 'react';
import { Meteor } from 'meteor/meteor'

import styled from 'styled-components';

export default class Song extends React.Component {

  constructor(props){
    super(props)
  }

  removeThatSong = () => Meteor.call('songs.remove', this.props.song._id);
  selectThatSong = () => Meteor.call('songs.select', this.props.song._id);

	render() {
		return (
      <li
        key={this.props.song.name}>
        <Par selected={this.props.song.selected}> {this.props.song.name} ({this.props.song.sounds.length})</Par>
        <button onClick={this.selectThatSong}> Select </button>
        <button onClick={this.removeThatSong}> X </button>
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
