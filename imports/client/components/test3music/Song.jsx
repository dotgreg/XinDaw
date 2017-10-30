import React from 'react';
import { Meteor } from 'meteor/meteor'

export default class Song extends React.Component {

  constructor(props){
    super(props)
  }

  removeThatSound = () => Meteor.call('sounds.remove', this.props.sound._id);
  selectThatSound = () => Meteor.call('sounds.select', this.props.sound._id);
  toggleThatSound = () => Meteor.call('sounds.toggleMute', this.props.sound._id);

  getStyles = () => {
    return {
      ul: {
        li: {
          p: {
            display: 'inline-block'
          },
          button: {

          }
        }
      }
    }
  }

	render() {
    const styles = this.getStyles()
		return (
      <li
        key={this.props.sound.name}>
        <p style={styles.ul.li.p}>
          {this.props.sound.name}
        </p>
        <button onClick={this.selectThatSound}> Modify </button>
        <button onClick={this.toggleThatSound}> {this.props.sound.muted ? 'unmute' : 'mute'} </button>
        <button onClick={this.removeThatSound}> X </button>
      </li>
    )
  }
}
