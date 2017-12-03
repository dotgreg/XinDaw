import React from 'react';
import { Meteor } from 'meteor/meteor'

import Icon from './utils/Icon'

import styled from 'styled-components';

export default class Song extends React.Component {

  constructor(props){
    super(props)
  }

  removeThatSong = () => Meteor.call('songs.remove', this.props.song._id);
  selectThatSong = () => Meteor.call('songs.select', this.props.song._id);

	render() {
		return (
      <OneSong
        key={this.props.song.name}>
        <Name selected={this.props.song.selected}> {this.props.song.name} ({this.props.song.sounds.length})</Name>
        <Buttons>
          <button onClick={this.selectThatSong}> <Icon name={this.props.song.selected ? 'pause' : 'play'}/> </button>
          <button onClick={this.removeThatSong}> <Icon name='trash-o'/> </button>
        </Buttons>
      </OneSong>
    )
  }
}

const OneSong = styled.li`
  position: relative;
  min-height: 25px;
`;

const Name = styled.p`
display: inline-block;
height: 0px;
margin: 0px;
color: ${props => props.selected && 'blue'};
`;

const Buttons = styled.p`
  position: absolute;
  top: 0px;
  margin: 0px;
  right: 0px;
`;
