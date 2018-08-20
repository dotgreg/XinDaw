import * as React from 'react';
import './App.css';
import TestSwitchTone from './components/TestSwitchTone';
import TestSyncLocalStorage from './components/TestSyncLocalStorage';
import LocalStorageWatcher from './components/LocalStorageWatcher';
import TestToneOutput from './components/TestToneOutput';
import TestAudioHtmlOutput from './components/TestAudioHtmlOutput';
import TestSwitch from './components/testSwitch';
import TestWebMidi from './components/TestWebMidi';
import Editor from './components/Editor/Editor';
import { sounds } from './datas/sounds';

interface State {
  data: any,
  sound: {
    code: string
  }
}

class App extends React.Component<{}, State> {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      sound: sounds.sound2
    }
  }

  onLocalStorageUpdate = (data:any) => {
    console.log('onLocalStorageUpdate', data)
    this.setState({data: data})
  }

  increment(){
    if (!localStorage.getItem('counter')) return localStorage.setItem('counter', '0')
    
    let currentVal = parseInt(localStorage.getItem('counter') as string)
    let newVal = currentVal + 1
    localStorage.setItem('counter', `${newVal}`)

  }

  componentDidMount() {
   
  }

  public render() {
    return (
      <div className="App">
        <TestSyncLocalStorage />
        <button onClick={this.increment}>increment</button>
        <div>{this.state.data.counter}</div>
        <LocalStorageWatcher onUpdate={this.onLocalStorageUpdate} />
        {/* <TestToneOutput /> */}
        <TestWebMidi />
        <Editor sound={this.state.sound}/>
        {/* <TestAudioHtmlOutput /> */}
      </div>
    );
  } 
}

export default App;
