import * as React from 'react';
import './App.css';
import TestSwitchTone from './components/TestSwitchTone';
import TestSyncLocalStorage from './components/TestSyncLocalStorage';
import LocalStorageWatcher from './components/LocalStorageWatcher';

interface State {
  data: any
}

class App extends React.Component<{}, State> {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
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
    localStorage.setItem('myCat', 'Tom');
    localStorage.setItem('myCat2', ` 
    hydrateStateWithLocalStorage() {
      // for all items in state
      for (let key in this.state) {
        // if the key exists in localStorage
        if (localStorage.hasOwnProperty(key)) {
          // get the key's value from localStorage
          let value = localStorage.getItem(key);
  
          // parse the localStorage string and setState
          try {
            value = JSON.parse(value);
            this.setState({ [key]: value });
          } catch (e) {
            // handle empty string
            this.setState({ [key]: value });
          }
        }
      }
    }
  
    saveStateToLocalStorage() {
      // for every item in React state
      for (let key in this.state) {`);
  }

  public render() {
    return (
      <div className="App">
        <TestSyncLocalStorage />
        <button onClick={this.increment}>increment</button>
        <div>{this.state.data.counter}</div>
        <LocalStorageWatcher onUpdate={this.onLocalStorageUpdate} />
      </div>
    );
  } 
}

export default App;
