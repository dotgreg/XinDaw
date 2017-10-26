import React from 'react';

export default class SoundsList extends React.Component {

  constructor(props){
    super(props)
  }

  removeThatSound = soundName => this.props.onRemoveSound(soundName)
  selectThatSound = soundName => this.props.onSelectSound(soundName)

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
      <ul>
      {this.props.sounds.map(s =>
          <li
            key={s.name}>
            <p
              style={styles.ul.li.p}
              onClick={this.selectThatSound.bind(this, s.name)}>
              {s.name}
            </p>
            <button onClick={this.removeThatSound.bind(this, s.name)}> X </button>
          </li>
        )}
      </ul>
    )
  }
}
