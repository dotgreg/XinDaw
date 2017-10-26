import React from 'react';
import Tone from 'tone';
import {arrayWithoutObjFrom, objInArrayFrom, arrayWithUpdatedObjFrom} from './utils/currys';

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
    let arrayWithoutObjFromName = arrayWithoutObjFrom('name')
    this.setState({
      sounds: arrayWithoutObjFromName(soundId, this.state.sounds)
    });
  }

  selectSound = soundId => {
    let objInArrayFromName = objInArrayFrom('name')
    this.setState({selectedSound: objInArrayFromName(soundId, this.state.sounds)})
  }

  saveSoundCode = code => {
    let arrayWithUpdatedObjFromName = arrayWithUpdatedObjFrom('name')

    let updatedSound = this.state.selectedSound
    updatedSound.code = code

    this.setState({
      sounds: arrayWithUpdatedObjFromName(updatedSound.name, updatedSound, this.state.sounds)
    })
  }

	render() {
		return (
      <div className="test3Music">
        test3Music
        <Editor
          sound={this.state.selectedSound}
          onSaveCode={this.saveSoundCode}/>
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
