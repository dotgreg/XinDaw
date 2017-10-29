import React from 'react';
import Tone from 'tone';
import Nb from './classes/Nb'
import {random} from 'lodash'
import {intervalWithIntVariation, arrayWithoutObjFrom, objInArrayFrom, arrayWithUpdatedObjFrom} from './utils/currys';

import AddSound from './AddSound.jsx';
import SoundsList from './SoundsList.jsx';

import Editor from './Editor.jsx';


export default class Test3Music extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      sounds: [],
      effects: [],
      selectedSound: null
    }
  }

  componentDidMount () {
    Tone.Transport.start('+0.1')
    Tone.Transport.loopEnd = '2m'
    Tone.Transport.loop = true
    window.Tone = Tone


  }

  componentWillUnmount () {
    console.log('componentWillUnmount')
    Tone.Transport.stop()
  }



  //
  // SOUND CRUD
  //

  addSound = newSound => {
    this.setState({
      sounds: [...this.state.sounds, newSound]
    });
  }

  removeSound = soundId => {
    let arrayWithoutObjFromName = arrayWithoutObjFrom('name')

    let objInArrayFromName = objInArrayFrom('name')
    Tone.Transport.clear(objInArrayFromName(soundId, this.state.sounds).transportId)

    this.setState({
      sounds: arrayWithoutObjFromName(soundId, this.state.sounds)
    });
  }

  selectSound = soundId => {
    let objInArrayFromName = objInArrayFrom('name')
    this.setState({selectedSound: objInArrayFromName(soundId, this.state.sounds)})
  }

  saveSoundCode = code => {
    let updatedSound = this.state.selectedSound
    updatedSound.code = code

    this.updateSound(updatedSound)

    this.applyNewSound(updatedSound)
  }

  applyNewSound = sound => {
    Tone.Transport.clear(sound.transportId)

    sound.transportId = eval(sound.code)

    this.updateSound(sound)
  }

  updateSound = sound => {
    let arrayWithUpdatedObjFromName = arrayWithUpdatedObjFrom('name')
    this.setState({
      sounds: arrayWithUpdatedObjFromName(sound.name, sound, this.state.sounds)
    })
  }

  addSlider = varName => {
    console.log(varName)
    console.log(eval(varName))
    this.setState({
      effects: [...this.state.effects, {varName: varName, type: 'slider', key: random(0, 1000)}]
    });
    // let val = eval(varName)
    let val
    setInterval(() => {
      // eval(`${varName} = ${varName} + 100`)
      // console.log(eval(varName))
    }, 100)
  }

  modifEffect = e => {
    // console.log(e)
    // console.log(e.nativeEvent)
    // console.log(e.nativeEvent.target.valueAsNumber)
    // console.log(e.nativeEvent.target.attributes.varname.value)
    let varname = e.nativeEvent.target.attributes.varname.value
    eval(`${varname} = ${e.nativeEvent.target.valueAsNumber}`)
  }

	render() {
		return (
      <div className="test3Music">
        test3Music
        {this.state.effects.map(e =>
         <li key={e.key}> {e.key} - {e.type} - {e.varName}
          <input onInput={this.modifEffect} onChange={this.modifEffect} varname={e.varName} type="range" min="0" max="10000"/>
         </li>
        )}
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
