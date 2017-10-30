import React from 'react';
import CodeMirror from 'react-codemirror';

import { Meteor } from 'meteor/meteor'

require('codemirror/lib/codemirror.css');

export default class Editor extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.sound) return false

    const codeMirror = this.refs['editor'].getCodeMirrorInstance();

    this.refs.editor.getCodeMirror().setValue(this.props.sound.code);

    let options = {
      hint: codeMirror.hint.javascript,
      disableKeywords: true,
      completeSingle: false,
      completeOnSingleClick: false
    }
  }

	saveCode = () => Meteor.call('sounds.updateCode', this.props.sound._id, this.refs.editor.getCodeMirror().getValue())

	render() {
    if (!this.props.sound) return false

		var options = {
			lineNumbers: true,
		};

		return (
      <div className="editorWrapper">
        <h3>{this.props.sound.name}</h3>
        <CodeMirror
          ref="editor"
          value={this.props.sound.code}
          options={options} />
        <button onClick={this.saveCode}> Save </button>
      </div>
    )
  }
}

// React.render(<App />, document.getElementById('app'));
