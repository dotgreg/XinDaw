import React from 'react';
import Tone from 'tone';
import {arrayWithoutThis, getThis} from './utils/currys';

import AddSound from './AddSound.jsx';
import SoundsList from './SoundsList.jsx';

import Editor from './Editor.jsx';


export default class Test3Music extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      sounds: [],
      selectedSound: null
    }
  }

  addSound = newSound => {
    this.setState({
      sounds: [...this.state.sounds, newSound]
    });
  }

  removeSound = soundId => {
    let arrayWithoutThisName = arrayWithoutThis('name')
    this.setState({
      sounds: arrayWithoutThisName(soundId, this.state.sounds)
    });
  }

  selectSound = soundId => {
    let getThisName = getThis('name')
    this.setState({selectedSound: getThisName(soundId, this.state.sounds)})
  }

  saveSoundCode = sound => {
    console.log(sound)
  }

	render() {
		return (
      <div className="test3Music">
        test3Music
        <Editor
          sound={this.state.selectedSound}
          onSaveCode={this.saveSoundCode.bind(this, this.state.selectedSound)}/>
        <SoundsList
          sounds={this.state.sounds}
          onSelectSound={this.selectSound}
          onRemoveSound={this.removeSound}/>
        <AddSound
          onNewSound={this.addSound} />
      </div>
    )
  }
}
