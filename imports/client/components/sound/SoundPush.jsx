import { Meteor } from 'meteor/meteor'
import Songs from '/imports/api/songs'

import React from 'react';
import styled from 'styled-components';

import Icon from '../utils/Icon'

import {filter} from 'lodash';
import * as css from '/imports/client/components/css/styles.js'

export default class SoundPush extends React.Component {

  constructor(props){
    super(props)
  }

  removeThatSound = () => Meteor.call('sounds.remove', this.props.sound._id);
  selectThatSound = () => Meteor.call('sounds.select', this.props.sound._id);
  toggleThatSound = () => Meteor.call('sounds.toggleMute', this.props.sound._id);
  cloneThatSound = () => Meteor.call('sounds.clone', this.props.sound._id);

  addToSong = () => Meteor.call('songs.addSound', this.props.sound._id);
  removeToSong = () => Meteor.call('songs.removeSound', this.props.sound._id);

  toggleAndSelectThatSound = () => { this.selectThatSound(); this.toggleThatSound() }

  render() {
    let buttons = null
    if (this.props.type === 'songSound') {
      buttons = ([
        <SoundPushButton key='1'>
          <Icon name={this.props.sound.muted ? 'volume-off' : 'volume-up'}/>
        </SoundPushButton>,
        <SoundPushButton key='2' onClick={this.removeToSong}>
          <Icon name="times"/>
        </SoundPushButton>
      ])
    }

		return (
      <OneSound muted={!this.props.sound.muted} onClick={this.toggleAndSelectThatSound}>
        <Name selected={this.props.sound.selected}> {this.props.sound.name} </Name>
        <Buttons>
          {buttons}
        </Buttons>
      </OneSound>
    )
  }
}

const OneSound = styled.li`
  position: relative;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  margin: 10px;
  padding: 10px;
  border: 2px black solid;
  min-height: 25px;
  list-style: none;
  background: ${props => props.muted && 'rgba(255, 233, 77, 0.5)'};
`;

const Name = styled.p`
display: block;
height: 0px;
margin: 0px;
color: ${props => props.selected && 'blue'};
`;

const Buttons = styled.p`
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  width: 100%;
  margin: 0px
`;

const SoundPushButton = css.Button.extend`
  flex-grow: 1;
  margin: 0px;
  border-right: 0px solid black;
  border-left: 0px solid black;
  border-bottom: 0px solid black;
`;
